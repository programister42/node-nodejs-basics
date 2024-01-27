import { stat, writeFile } from 'node:fs/promises';

import { isExists } from '../utils/is-exists.js';
import { FSError } from '../utils/fs-errors.js';

const create = async () => {
	const filePath = './src/fs/files/fresh.txt';
	const fileContent = 'I am fresh and young';

	if (await isExists(filePath)) {
		throw new FSError();
	}

	await writeFile(filePath, fileContent);
};

await create();
