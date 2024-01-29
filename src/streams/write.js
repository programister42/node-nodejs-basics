import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const write = async () => {
	const fileURL = new URL('./files/fileToWrite.txt', import.meta.url);
	const writeStream = createWriteStream(fileURL);
	await pipeline(process.stdin, writeStream);
};

await write();
