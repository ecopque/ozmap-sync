/**
* Cliente simulado para o ozmap-sdk.
* Em um cenário real usaríamos `import ozmap from 'ozmap@ozmap-sdk'` e
* chamaríamos os métodos do SDK.
* Aqui simulamos envio com possiblidade de falha para testar retry e rate-limiting.
*/


import { logger } from '../utils/logger';


export async function sendToOzmap(resourceType: string, payload: any) {
// Simula latência e resposta
await new Promise((r) => setTimeout(r, Math.random() * 300));


// Simula falha em 10% dos casos
const fail = Math.random() < 0.1;
if (fail) {
const err = new Error('Simulated OZmap error');
logger.warn('ozmapClient simulated failure', { resourceType });
throw err;
}


logger.info('Sent to OZmap (simulated)', { resourceType, id: payload.id ?? payload._id });
return { success: true };
}