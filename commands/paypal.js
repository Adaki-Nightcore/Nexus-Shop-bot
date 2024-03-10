const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('paypal')
        .setDescription('Renvoie les instructions pour payer via PayPal'),
    async execute(interaction) {
        const paypalEmbed = new MessageEmbed()
            .setColor('#253B80')
            .setTitle('PayPal payment instructions')
            .setDescription('__Here are the instructions for paying by PayPal :__')
            .addFields(
                { name: '🇫🇷 FRANÇAIS:', value: '・N\'écris rien dans le paiement ! \n・**Envoie en ami et proche\n**・Envoie un screen du paiement ! \n・Mentionne moi quand tout ça est fait !', inline: false },
                { name: '🇬🇧 ENGLISH:', value: '・Do not write anything in the payment ! \n・**Send to friend & family\n**・Send a screenshot of the payment ! \n・Mention me when all this is done !', inline: false },
                { name: 'Paypal:', value: '**https://www.paypal.com/paypalme/ayanagalvez**', inline: false },
            )
            .setImage('https://cdn.discordapp.com/attachments/1203809223130087434/1209556620405899394/1154008613375967273.png?ex=65e75a62&is=65d4e562&hm=1248ded3968ef54092e26db1d49062a1aaf45f73d2bea8fd57c77b2d7fafd4ab&')
            .setTimestamp()
            .setFooter('Thank you for your support!', interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [paypalEmbed] });
    }
}