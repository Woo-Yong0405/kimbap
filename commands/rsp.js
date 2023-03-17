const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("가위바위보").setDescription("다른 유저와 돈걸고 가위바위보를 하기").addIntegerOption(option => option.setName("금액").setDescription("베팅 금액").setRequired(true)).addUserOption(option => option.setName("상대").setDescription("게임을 같이 할 상대").setRequired(true)),
    async execute(message, meme) {
        await dbService.doc(`User Data/${message.user.id}`).get().then(async (doc) => {
            if (doc.exists) {
                if (message.options.getInteger("금액") > meme.data().wallet) {
                    await message.reply("You don't have enough money in your wallet.");
                } else {
                    if (interaction.options.getInteger("금액") > 0) {
                        if (!message.options.getUser("상대").bot && message.options.getUser("상대").id !== message.user.id) {
                            await dbService.doc(`User Data/${message.options.getUser("상대").id}`).get().then(async doc => {
                                if (doc.exists) {
                                    if (message.options.getInteger("amount") < doc.data().wallet) {
                                        dbService.doc(`${message.user.id}${message.options.getUser("상대").id}/bet`).set({
                                            bet: message.options.getInteger("금액")
                                        })
                                        const rsp = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Rock").setCustomId("rock").setStyle(ButtonStyle.Primary), new ButtonBuilder().setLabel("Scissors").setCustomId("scissors").setStyle(ButtonStyle.Primary), new ButtonBuilder().setLabel("Paper").setCustomId("paper").setStyle(ButtonStyle.Primary))
                                        await message.reply({contents: `${message.user} and ${message.options.getUser("상대")}, please choose. This game is on ${message.options.getInteger("금액")}.`, embeds: [rsp]})
                                    } else {
                                        await message.reply("That user doesn't have enough money in his/her wallet")
                                    }
                                } else {
                                    await message.reply("That user didn't initialize his account yet.")
                                }
                            })
                        } else {
                            message.reply("You can't play against a bot nor yourself. Are you seriously that lonely?")
                        }
                    } else {
                        interaction.reply({content: "You can't have a bet of less than or equal to 0.", ephemeral: true})
                    }
                }
            } else {
                interaction.reply("Please initialize using /셋업 first!")
            }
        })
    }
}