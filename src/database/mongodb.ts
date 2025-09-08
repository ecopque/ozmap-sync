import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';
import { logger } from '../utils/logger';


const SyncRecordSchema = new mongoose.Schema({
resourceType: String,
resourceId: String,
status: String,
payload: mongoose.Schema.Types.Mixed,
createdAt: { type: Date, default: Date.now }
});


export const SyncRecord = mongoose.model('SyncRecord', SyncRecordSchema);


export async function connectDB() {
await mongoose.connect(MONGODB_URI);
logger.info('Connected to MongoDB');
}