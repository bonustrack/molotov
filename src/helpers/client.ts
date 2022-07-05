import kbyte from 'kbyte';
import { promisifyAll } from 'bluebird';

promisifyAll(kbyte.Client.prototype);

export const client = new kbyte.Client(import.meta.env.VITE_API_URL);
