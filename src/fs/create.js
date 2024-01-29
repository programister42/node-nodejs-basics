import { URL } from 'node:url';
import { writeFile } from 'node:fs/promises';

import { isExists } from '../utils/is-exists.js';
import { FSError } from '../utils/fs-errors.js';

const create = async () => {
	const fileURL = new URL('./files/fresh.txt', import.meta.url);
	const fileContent = 'I am fresh and young';

	if (await isExists(fileURL)) {
		throw new FSError();
	}

	await writeFile(fileURL, fileContent);
};

await create();
