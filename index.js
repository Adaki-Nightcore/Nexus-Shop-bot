const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { TOKEN } = require('dotenv').config().parsed;

const handleCommand = require('./helpers/command');
const handleSelectMenu = require('./helpers/select-menu');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Je suis prêt !');
    client.user.setPresence({ activities: [{ name: "Nexus | Protect", type: 'STREAMING', url: "https://www.twitch.tv/dev" }] })
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) handleCommand(client, interaction);
    if (interaction.isSelectMenu()) handleSelectMenu(interaction);
});

client.login(TOKEN);