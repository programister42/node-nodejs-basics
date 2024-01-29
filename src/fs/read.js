import { URL } from 'node:url';
import { readFile } from 'node:fs/promises';

import { FSError } from '../utils/fs-errors.js';

const read = async () => {
	const fileURL = new URL('./files/fileToRead.txt', import.meta.url);

	try {
		const fileContent = await readFile(fileURL, { encoding: 'utf-8' });
		console.log(fileContent);
	} catch (error) {
		throw new FSError();
	}
};

await read();
