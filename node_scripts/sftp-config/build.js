/**
 * Run a configuration for building the sftp.json needed for the SFTP Vscode plugin.
 * This will trigger a series of questions to complete your sftp.json for this project.
 * 
 * @author	Emiel Zuurbier
 * @package	build.js
 * @example 
 * npm run sftp
 */

const fs = require('fs').promises;
const prompts = require('prompts');
const config = require('./config.js');

/**
 * Logs a error message to the console.
 * 
 * @function	logError
 * @param 		{string} error Error messsage.
 * @returns		{void}
 */
const logError = (error) => {
	if (error) {
		console.error(error);
	}
}

/**
 * Prompts questions for the user to fill in.
 * These answers will be used for the config file.
 * 
 * @function	askInformation
 * @returns		{Promise<Object>}
 */
const askInformation = async () => {

	try {
		// Get the responses from the prompts.
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
 * Combine the responses with the default config setup.
 * Adds file ignores and watchers for common files.
 * 
 * @function	createContentForFile
 * @param 		{Object} responses 
 * @returns		{string}
 */
const createContentForFile = (responses) => {
	const content = Object.assign(responses, config);
	return JSON.stringify(content, null, 2);
};

/**
 * Creates a directory in the theme folder named .vscode.
 * The content given will be put into a file called sftp.json and placed into the .vscode folder.
 * 
 * @function	createSFTPConfigFile
 * @param 		{string} content 
 * @returns		{Promise}
 */
const createSFTPConfigFile = async (content) => {

	try {
		// Create a new directory named .vscode.
		await fs.mkdir('.vscode', { recursive: true });
		console.log('.vscode folder created');
	} catch (error) {
		logError(error)
	}

	try {
		// Write a file to the .vscode directory with the content.
		await fs.writeFile('.vscode/sftp.json', content);
		console.log('sftp.json file has been generated');
	} catch (error) {
		logError(error)
	}

};

/**
 * Ask for the queries and use their responses to create a new
 * sftp.json file that will be placed into the .vscode folder.
 * 
 * @function		build
 * @returns			{void}
 */
const build = async () => {
	const responses = await askInformation();
	const content = createContentForFile(responses);
	console.log('SFTP content generated: ', content);
	createSFTPConfigFile(content);
}

// Start building.
build();