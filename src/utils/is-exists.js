import { stat } from 'node:fs/promises';

/**
 * Check if file or directory exists
 * @param {string} path - path to file or directory
 * @returns {Promise<boolean>} - true if file exists, false if not
 */
export const isExists = async (path) => {
	try {
		await stat(path);
		return true;
	} catch (error) {
		return false;
	}
};
