const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const schedule = require('node-schedule');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
let commandsInfo = {};

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
	const info = command.info;
	if (!(info === undefined)) {
		commandsInfo[command.data.name] = info;
	}
}


client.once('ready', () => {
	console.log('Ready!');
	//const job = schedule.scheduleJob('*/10 * * * * *', function () {
	//	// 10 mins = */10 * * * *
	//	const servur = client.guilds.cache.get('831193807734571029');
	//	const channel = servur.channels.cache.get('984410934145613854');
	//	channel.send('testing');
	//}
	//);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		const info = commandsInfo[command.data.name];
		if (info === undefined) return;
		if (info.ownerOnly && interaction.user.id !== '355667078553927681') return interaction.reply({ content: 'You are not allowed to use this command.', ephemeral: true });
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(token);