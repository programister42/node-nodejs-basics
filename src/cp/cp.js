import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const spawnChildProcess = async (args) => {
	const childURL = new URL('./files/script.js', import.meta.url);
	spawn('node', [fileURLToPath(childURL), ...args], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
