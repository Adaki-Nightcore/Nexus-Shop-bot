const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Supprime tous les messages du salon de discussion actuel'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de supprimer les messages.', ephemeral: true });
        }

        const channel = interaction.channel;

        async function deleteMessages(channel, limit) {
            const messages = await channel.messages.fetch({ limit });
            const deletableMessages = messages.filter(message => Date.now() - message.createdTimestamp < 14 * 24 * 60 * 60 * 1000);
            await channel.bulkDelete(deletableMessages, true);
            return messages.size - deletableMessages.length;
        }

        async function deleteAllMessages(channel) {
            let remainingMessages = 100;
            while (remainingMessages > 0) {
                remainingMessages = await deleteMessages(channel, remainingMessages);
            }
        }

        await deleteAllMessages(channel);
        await interaction.reply({ content: 'Tous les messages ont été supprimés.', ephemeral: true });
        await interaction.channel.send(`${interaction.user.toString()}, le salon a bien été recréé.`);
    },
};