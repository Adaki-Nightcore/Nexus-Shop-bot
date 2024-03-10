const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delock')
        .setDescription('Unlocks the current channel for everyone.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return;
        }

        const channel = interaction.channel;

        async function delockChannel() {
            await channel.permissionOverwrites.delete(channel.guild.roles.everyone);
            await interaction.reply({ content: 'Le salon a été déverrouillé pour tout le monde.', ephemeral: true });
            const delockMessage = `<@${interaction.user.id}>, le salon a bien été déverrouillé pour tout le monde.`;
            await channel.send(delockMessage);
        }

        delockChannel();
    },
};