import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const read = async () => {
	const fileURL = new URL('./files/fileToRead.txt', import.meta.url);
	const readStream = createReadStream(fileURL);

	readStream.on('end', () => {
		process.stdout.write('\n');
	});

	await pipeline(readStream, process.stdout);
};

await read();
