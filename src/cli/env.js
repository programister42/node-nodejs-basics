const parseEnv = () => {
	const rssArgs = [];
	for (const key in process.env) {
		if (key.startsWith('RSS_')) {
			rssArgs.push(`${key}=${process.env[key]}`);
		}
	}
	console.log(rssArgs.join('; '));
};

parseEnv();
