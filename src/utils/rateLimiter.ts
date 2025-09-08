/**
* Rate limiter simples por minuto.
* Mantém contador em memória. Em produção usar Redis ou service dedicado.
*/


import { RATE_LIMIT_PER_MIN } from '../config';
import { logger } from './logger';


let count = 0;
let windowStart = Date.now();


export function canMakeRequest() {
const now = Date.now();
if (now - windowStart >= 60_000) {
windowStart = now;
count = 0;
}
if (count >= RATE_LIMIT_PER_MIN) {
logger.warn('Rate limit reached', { count, limit: RATE_LIMIT_PER_MIN });
return false;
}
count += 1;
return true;
}