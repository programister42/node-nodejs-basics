import { stat, writeFile } from 'node:fs/promises';

const create = async () => {
	const filePath = './src/fs/files/fresh.txt';
	const fileContent = 'I am fresh and young';

	try {
		await stat(filePath);
		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code === 'ENOENT') {
			await writeFile(filePath, fileContent);
		} else {
			throw error;
		}
	}
};

await create();
