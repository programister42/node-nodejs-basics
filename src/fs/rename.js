import { URL } from 'node:url';
import { rename as fsRename } from 'node:fs/promises';

import { FSError } from '../utils/fs-errors.js';
import { isExists } from '../utils/is-exists.js';

const rename = async () => {
	const fileURL = new URL('./files/wrongFilename.txt', import.meta.url);
	const newFileURL = new URL('./files/properFilename.md', import.meta.url);

	if (!(await isExists(fileURL)) || (await isExists(newFileURL))) {
		throw new FSError();
	}

	try {
		await fsRename(fileURL, newFileURL);
	} catch (error) {
		throw new FSError();
	}
};

await rename();
