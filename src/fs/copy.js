import { URL } from 'node:url';
import { readdir, mkdir, copyFile, constants } from 'node:fs/promises';

import { isExists } from '../utils/is-exists.js';
import { FSError } from '../utils/fs-errors.js';

const recursiveCopy = async (sourceURL, destinationURL) => {
	if (await isExists(destinationURL)) {
		throw new FSError();
	}
	await mkdir(destinationURL);

	const dirents = await readdir(sourceURL, { withFileTypes: true });
	for (const dirent of dirents) {
		if (dirent.isDirectory()) {
			await recursiveCopy(
				new URL(`${dirent.name}/`, sourceURL),
				new URL(`${dirent.name}/`, destinationURL)
			);
		} else if (dirent.isFile()) {
			await copyFile(
				new URL(dirent.name, sourceURL),
				new URL(dirent.name, destinationURL),
				constants.COPYFILE_EXCL
			);
		}
	}
};

const copy = async () => {
	const sourceURL = new URL('./files/', import.meta.url);
	const destinationURL = new URL('./files_copy/', import.meta.url);

	try {
		await recursiveCopy(sourceURL, destinationURL);
	} catch (error) {
		throw new FSError();
	}
};

await copy();
