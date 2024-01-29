import { URL } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
	const sourceURL = new URL('./files/fileToCompress.txt', import.meta.url);
	const destinationURL = new URL('./files/archive.gz', import.meta.url);
	const readStream = createReadStream(sourceURL);
	const writeStream = createWriteStream(destinationURL);
	const gzip = createGzip();

	await pipeline(readStream, gzip, writeStream);
};

await compress();
