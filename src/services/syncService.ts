import { fetchISPData } from '../integrations/ispClient';
import { sendToOzmap } from '../integrations/ozmapClient';
import {
  transformCable,
  transformBox,
  transformDrop,
  transformCustomer
} from './transformService';
import { canMakeRequest } from '../utils/rateLimiter';
import { SyncRecord } from '../database/mongodb';
import { logger } from '../utils/logger';

async function safeSend(resourceType: string, payload: any, retries = 3) {
  let attempt = 0;
  const baseDelay = 500; // ms
  while (attempt <= retries) {
    try {
      if (!canMakeRequest()) throw new Error('Rate limit');
      await sendToOzmap(resourceType, payload);
      await SyncRecord.create({
        resourceType,
        resourceId: payload.id ?? payload._id,
        status: 'synced',
        payload
      });
      return;
    } catch (err: any) {
      attempt += 1;
      logger.warn('send failed, will retry', {
        resourceType,
        attempt,
        message: err.message
      });
      if (attempt > retries) {
        await SyncRecord.create({
          resourceType,
          resourceId: payload.id ?? payload._id,
          status: 'failed',
          payload
        });
        throw err;
      }
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

export async function runSyncCycle() {
  logger.info('Starting sync cycle');

  // Busca todos os dados do ISP
  const [cables, boxes, drops, customers] = await Promise.all([
    fetchISPData<any>('cables'),
    fetchISPData<any>('boxes'),
    fetchISPData<any>('drop_cables'),
    fetchISPData<any>('customers')
  ]);

  // Transforma e envia — cabos
  for (const c of cables) {
    const payload = transformCable(c);
    await safeSend('cable', payload);
  }

  // Transforma e envia — caixas
  for (const b of boxes) {
    const payload = transformBox(b);
    await safeSend('box', payload);
  }

  // Transforma e envia — cabos drop
  for (const d of drops) {
    const payload = transformDrop(d);
    await safeSend('drop_cable', payload);
  }

  // Transforma e envia — clientes
  for (const cu of customers) {
    const payload = transformCustomer(cu);
    await safeSend('customer', payload);
  }

  logger.info('Sync cycle finished');
}

