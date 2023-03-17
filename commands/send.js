const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("송금").setDescription("다른 유저한테 송금하기").addIntegerOption(option => option.setName("금액").setDescription("송금 금액").setRequired(true)).addUserOption(option => option.setName("유저").setDescription("송금할 유저").setRequired(true)),
    async execute(interaction, userDB) {
        await dbService.doc(`User Data/${interaction.user.id}`).get().then(async (doc) => {
            if (doc.exists) {
                if (interaction.options.getInteger("금액") > userDB.data().wallet) {
                    interaction.reply("You don't have enough money.")
                } else {
                    if (!message.options.getUser("상대").bot && message.options.getUser("상대").id !== message.user.id) {
                        await dbService.doc(`User Data/${interaction.options.getUser("유저")}`).get().then(async doc => {
                            if (doc.exists) {
                                await dbService.doc(`send/${interaction.user.id}`).set({
                                    to: interaction.options.getUser("유저").id,
                                    amount: interaction.options.getInteger("금액")
                                });
                                const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Confirm").setCustomId("sendconfirm").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setLabel("Cancel").setCustomId("sendcancel").setStyle(ButtonStyle.Danger));
                                await interaction.reply({content: `${interaction.user}, are you sure you want to send ${interaction.options.getInteger("금액")} to ${interaction.options.getUser("유저")}?`, components: [row]});
                                setTimeout(() => {
                                    dbService.doc(`send/${interaction.user.id}`).delete();
                                    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Confirm").setCustomId("sendconfirm").setStyle(ButtonStyle.Secondary).setDisabled(true), new ButtonBuilder().setLabel("Cancel").setCustomId("sendcancel").setStyle(ButtonStyle.Danger).setDisabled(true));
                                    interaction.reply({content: `${interaction.user}, are you sure you want to send ${interaction.options.getInteger("금액")} to ${interaction.options.getUser("유저")}?`, components: [row]});
                                }, 60000);
                            } else {
                                interaction.reply("That user didn't initialize his account yet.")
                            }
                        })
                    } else {
                        message.reply("You can't play against a bot nor yourself. Are you seriously that lonely?")
                    }
                }
            } else {
                interaction.reply("Please initialize using /셋업 first!")
            }
        })
    }
}