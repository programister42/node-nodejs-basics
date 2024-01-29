import { URL } from 'node:url';
import { readdir } from 'node:fs/promises';

import { FSError } from '../utils/fs-errors.js';

const list = async () => {
	const dirURL = new URL('./files/', import.meta.url);
	let dirents = [];

	try {
		dirents = await readdir(dirURL, { withFileTypes: true });
	} catch (err) {
		throw new FSError();
	}

	const printArr = dirents.map((dirent) =>
		dirent.isDirectory() ? `📁 ${dirent.name}` : `📄 ${dirent.name}`
	);
	console.log(`Content of "${dirURL.pathname}":`);
	console.table(printArr);
};

await list();
