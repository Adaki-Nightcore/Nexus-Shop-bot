const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks the current channel for everyone except the owner.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return;
        }

        const channel = interaction.channel;
        const guild = interaction.guild;
        const ownerId = guild.ownerId;

        async function lockChannel() {
            await channel.permissionOverwrites.create(guild.roles.everyone, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
            });
            await channel.permissionOverwrites.create(guild.members.cache.get(ownerId), {
                SEND_MESSAGES: null,
                ADD_REACTIONS: null,
            });
            await interaction.reply({ content: 'Le salon a été verrouillé pour tout le monde excepté le propriétaire.', ephemeral: true });
            const lockMessage = `<@${interaction.user.id}>, le salon a bien été verrouillé pour tout le monde excepté le propriétaire.`;
            await channel.send(lockMessage);
        }

        lockChannel();
    },
};