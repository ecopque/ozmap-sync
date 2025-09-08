import dotenv from 'dotenv';
import { connectDB } from './database/mongodb';
import { startScheduler } from './jobs/scheduler';
import { logger } from './utils/logger';


dotenv.config();


async function main() {
try {
await connectDB();
startScheduler();
logger.info('ozmap-sync started.');
} catch (err) {
logger.error('Failed to start app', { error: err });
process.exit(1);
}
}


main();