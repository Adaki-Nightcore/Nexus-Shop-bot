const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crypto')
        .setDescription('Renvoie les instructions pour payer via Crypto'),
    async execute(interaction) {
        const paypalEmbed = new MessageEmbed()
            .setColor('#4d4d4d')
            .setTitle('Crypto payment instructions')
            .setDescription('__Here are the instructions for paying by Crypto :__\n\nMake sure to check the **first 4** and **last 4 values** of the address:\n**__Example__** **__BTC__**: bc1q **(4th 1st)** 5prj **(4th last)**')
            .addFields(
                { name: '🇫🇷 FRANÇAIS:', value: '・N\'écris rien dans le paiement ! \n・Envoie un screen du paiement ! \n・Mentionne moi quand tout ça est fait !', inline: true },
                { name: '🇬🇧 ENGLISH:', value: '・Do not write anything in the payment ! \n・Send a screenshot of the payment ! \n・Mention me when all this is done !', inline: true },
                { name: '<:Bitcoin:1210012612390031461> BTC :', value: '**Address:** bc1qel3s6m4w6qhwcw8ul63dhupzazjg90vxeh5prj', inline: false },
                { name: '<:7868usdt:1210012590973915156> USDT Ethereum network :', value: '**Address:** 0xbBB90E99b2267dbf1a0c96CB5ae02E7a3Fa0C1f7', inline: false },
                { name: '<:4887ltc:1210012601371598858> LTC :', value: '**Address:** LgaZPch9Am2bVW3eprVTTpacMaVLB4H3JX', inline: false },
                { name: '<:5819eth:1210012579951284285> ETH :', value: '**Address:** 0xbBB90E99b2267dbf1a0c96CB5ae02E7a3Fa0C1f7', inline: false },
            )
            .setTimestamp()
            .setFooter('Thank you for your support!', interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [paypalEmbed] });
    }
}