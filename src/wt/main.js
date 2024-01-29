import { Worker } from 'node:worker_threads';
import os from 'node:os';

const createWorker = (n) =>
	new Promise((resolve, reject) => {
		const worker = new Worker(new URL('./worker.js', import.meta.url));
		worker.on('message', (result) => {
			resolve(result);
			worker.terminate();
		});
		worker.on('error', reject);
		worker.postMessage(n);
	});

const performCalculations = async () => {
	const numCPUs = os.cpus().length;
	const promises = Array.from({ length: numCPUs }, (_, i) =>
		createWorker(i + 10)
	);
	const results = await Promise.allSettled(promises);
	console.log(
		results.map(({ status, value }) => ({
			status,
			data: status === 'fulfilled' ? value : null,
		}))
	);
};

await performCalculations();
