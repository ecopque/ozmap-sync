// src/testLogger.ts
import { logger } from './utils/logger';

logger.info('Teste de log informativo');
logger.warn('Teste de log de aviso');
logger.error('Teste de log de erro', { detalhe: 'Exemplo de erro' });
