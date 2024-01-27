import { join } from 'node:path';
import { readdir, mkdir, copyFile, constants } from 'node:fs/promises';

import { isExists } from '../utils/is-exists.js';
import { FSError } from '../utils/fs-errors.js';

const recursiveCopy = async (sourcePath, destinationPath) => {
	if (await isExists(destinationPath)) {
		throw new FSError();
	}
	await mkdir(destinationPath);

	const dirents = await readdir(sourcePath, { withFileTypes: true });
	for (const dirent of dirents) {
		if (dirent.isDirectory()) {
			await recursiveCopy(
				join(sourcePath, dirent.name),
				join(destinationPath, dirent.name)
			);
		} else if (dirent.isFile()) {
			copyFile(
				join(sourcePath, dirent.name),
				join(destinationPath, dirent.name),
				constants.COPYFILE_EXCL
			);
		}
	}
};

const copy = async () => {
	const sourcePath = './src/fs/files';
	const destinationPath = './src/fs/files_copy';

	try {
		await recursiveCopy(sourcePath, destinationPath);
	} catch (error) {
		throw new FSError();
	}
};

await copy();
