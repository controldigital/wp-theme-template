/**
 * Default config setup.
 */
const defaultConfig = {
	"fileNameEncoding": "utf8",
	"autoUpload": true,
	"uploadOnSave": true,
	"autoDelete": false,
	"autoDownload": false,
	"watcher": {
		"files": "dist/**/*.{js,css,php}",
		"autoUpload": true,
		"autoDelete": true
	},
	"ignore": [
		"ftp-rk.json",
		".git",
		".gitignore",
		".code-workspace",
		".vscode",
		"node_modules",
		"package.json",
		".DS_Store",
		".browserlistrc"
	]
}

module.exports = defaultConfig;