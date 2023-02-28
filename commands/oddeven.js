const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("oddeven").setDescription("Bet money on whether the number will be odd or even!").addIntegerOption(option => option.setName("bet").setDescription("Amount of money to bet").setRequired(true)),
    async execute(interaction, userDB) {
        if (interaction.options.getInteger("bet") > userDB.data().wallet) {
            interaction.reply("You don't have enough money.")
        } else {
            await dbService.doc(`oddeven/${interaction.user.id}`).set({
                bet: interaction.options.getInteger("bet")
            });
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Odd").setCustomId("odd").setStyle(ButtonStyle.Primary), new ButtonBuilder().setLabel("Even").setCustomId("even").setStyle(ButtonStyle.Primary));
            await interaction.reply({content: `${interaction.user}, please choose between odd or even.`, components: [row]});
            setTimeout(() => {
                const row1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Odd").setCustomId("odd").setStyle(ButtonStyle.Primary).setDisabled(true), new ButtonBuilder().setLabel("Even").setCustomId("even").setStyle(ButtonStyle.Primary).setDisabled(true));
                dbService.doc(`oddeven/${interaction.user.id}`).delete();
                interaction.editReply({content: `${interaction.user}, please choose between odd or even.`, component: [row1]});
            }, 60000);
        }
    }
}