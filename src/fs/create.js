import { stat, writeFile } from 'node:fs/promises';

import { isExists } from '../utils/is-exists.js';

const create = async () => {
	const filePath = './src/fs/files/fresh.txt';
	const fileContent = 'I am fresh and young';

	if (await isExists(filePath)) {
		throw new Error('FS operation failed');
	}

	await writeFile(filePath, fileContent);
};

await create();
