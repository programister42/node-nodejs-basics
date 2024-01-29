import { URL } from 'node:url';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const calculateHash = async () => {
	const fileURL = new URL(
		'./files/fileToCalculateHashFor.txt',
		import.meta.url
	);

	const hash = createHash('sha256');
	const input = createReadStream(fileURL);

	await pipeline(input, hash);

	console.log(hash.digest('hex'));
};

await calculateHash();
