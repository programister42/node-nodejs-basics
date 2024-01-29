import { URL } from 'node:url';
import { rm } from 'node:fs/promises';

import { FSError } from '../utils/fs-errors.js';

const remove = async () => {
	const fileURL = new URL('./files/fileToRemove.txt', import.meta.url);

	try {
		await rm(fileURL);
	} catch (error) {
		throw new FSError();
	}
};

await remove();
