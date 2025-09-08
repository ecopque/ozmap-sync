import dotenv from 'dotenv';


dotenv.config();


export const ISP_BASE_URL = process.env.ISP_BASE_URL || 'http://localhost:4000';
export const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN || 50);
export const SYNC_CRON = process.env.SYNC_CRON || '*/1 * * * *';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ozmap_sync';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';