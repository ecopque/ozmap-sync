import axios from 'axios';
import { ISP_BASE_URL } from '../config';
import { logger } from '../utils/logger';


export async function fetchISPData<T>(resource: string): Promise<T[]> {
const url = `${ISP_BASE_URL}/${resource}`;
try {
const res = await axios.get<T[]>(url, { timeout: 10_000 });
logger.debug('Fetched ISP resource', { resource, count: res.data.length });
return res.data;
} catch (err: any) {
logger.error('Error fetching ISP resource', { resource, message: err.message });
throw err;
}
}