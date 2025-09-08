import cron from 'node-cron';
import { SYNC_CRON } from '../config';
import { runSyncCycle } from '../services/syncService';
import { logger } from '../utils/logger';

let running = false;

export function startScheduler() {
  logger.info('Starting scheduler', { cron: SYNC_CRON });
  cron.schedule(SYNC_CRON, async () => {
    if (running) {
      logger.warn('Previous job still running — skipping this tick');
      return;
    }
    running = true;
    try {
      await runSyncCycle();
    } catch (err: any) {
      logger.error('Sync cycle error', { error: err.message });
    } finally {
      running = false;
    }
  });
}

