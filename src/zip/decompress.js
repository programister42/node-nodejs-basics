import { URL } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
	const sourceURL = new URL('./files/archive.gz', import.meta.url);
	const destinationURL = new URL(
		'./files/fileToCompress.txt',
		import.meta.url
	);
	const readStream = createReadStream(sourceURL);
	const writeStream = createWriteStream(destinationURL);
	const gunzip = createGunzip();

	await pipeline(readStream, gunzip, writeStream);
};

await decompress();
