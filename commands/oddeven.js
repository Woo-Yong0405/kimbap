const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("홀짝").setDescription("홀짝게임을 이용한 도박").addIntegerOption(option => option.setName("금액").setDescription("베팅 금액").setRequired(true)),
    async execute(interaction, userDB) {
        await dbService.doc(`User Data/${message.user.id}`).then(async (doc) => {
            if (doc.exists) {
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
            } else {
                interaction.reply("Please initialize using /셋업 first!")
            }
        })
    }
}