import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const reverse = new Transform({
	transform(chunk, encoding, callback) {
		callback(null, chunk.toString().split('').reverse().join('') + '\n\n');
	},
});

const transform = async () => {
	await pipeline(process.stdin, reverse, process.stdout);
};

await transform();
