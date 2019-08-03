const fs = require('fs').promises;
const prompts = require('prompts');
const config = require('./config.js');

/**
 * Prompts questions for the user to fill in.
 * These answers will be used for the config file.
 * 
 * @function	askInformation
 * @returns		{Promise<Object>}
 */
const askInformation = async () => {
	try {
		const responses = await prompts([
			{
				type: 'text',
				name: 'name',
				message: 'Name of the project'
			},
			{
				type: 'text',
				name: 'protocol',
				message: 'Protocol'
			},
			{
				type: 'text',
				name: 'host',
				message: 'The host url or ip address'
			},
			{
				type: 'number',
				name: 'port',
				message: 'Port'
			},
			{
				type: 'text',
				name: 'username',
				message: 'Username'
			},
			{
				type: 'text',
				name: 'password',
				message: 'Password'
			},
			{
				type: 'text',
				name: 'remotePath',
				message: 'Remote path of theme'
			}
		]);
		return responses;
	} catch(error) {
		console.log(error);
	}
}

/**
 * @function	createContentForFile
 * @param 		{Object} responses 
 * @returns		{string}
 */
const createContentForFile = (responses) => {
	const content = Object.assign(responses, config);
	return JSON.stringify(content, null, 2);
};

/**
 * @function	createSFTPConfigFile
 * @param 		{string} content 
 * @returns		{Promise}
 */
const createSFTPConfigFile = async (content) => {

	const onError = (error) => {
		if (error) {
			throw error;
		}
	}

	try {
		await fs.mkdir('.vscode', { recursive: true });
		console.log('.vscode folder created');
	} catch (error) {
		onError(error)
	}

	try {
		await fs.writeFile('.vscode/sftp.json', content);
		console.log('sftp.json file has been generated');
	} catch (error) {
		onError(error)
	}

};

/**
 * @function		build
 * @returns			{void}
 */
const build = async () => {
	const responses = await askInformation();
	const content = createContentForFile(responses);
	console.log(content);
	createSFTPConfigFile(content);
}

build();