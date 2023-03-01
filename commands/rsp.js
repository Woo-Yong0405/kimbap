const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("가위바위보").setDescription("다른 유저와 돈걸고 가위바위보를 하기").addIntegerOption(option => option.setName("금액").setRequired(true)).addUserOption(option => option.setName("opponent").setDescription("Who you're playing against").setRequired(true)),
    async execute(message, meme) {
        if (message.options.getInteger("amount") > meme.data().wallet) {
            await message.reply("You don't have enough money in your wallet.");
        } else {
            if (!message.options.getUser("opponent").bot && message.options.getUser("opponent").id !== message.user.id) {
                await dbService.doc(`User Data/${message.options.getUser("opponent").id}`).get().then(async doc => {
                    if (doc.exists) {
                        if (message.options.getInteger("amount") < doc.data().wallet) {
                            const actionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("rspAccept").setLabel("Accept").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId("rspDecline").setLabel("Decline").setStyle(ButtonStyle.Danger))
                            dbService.doc(`${message.options.getUser("opponent").id}${message.user.id}/bet`).set({
                                bet: message.options.getInteger("amount")
                            })
                            await message.reply({content: `${message.options.getUser("opponent")}, ${message.user} challenged you to a game of rock scissors paper, with a bet of ${message.options.getInteger("amount")}. Please choose whether you want to accept it or not.`, components: [actionRow]})
                            const actionRow1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("rspAccept").setLabel("Accept").setStyle(ButtonStyle.Primary).setDisabled(true), new ButtonBuilder().setCustomId("rspDecline").setLabel("Decline").setStyle(ButtonStyle.Danger).setDisabled(true))
                            setTimeout(async () => {
                                dbService.doc(`${message.options.getUser("opponent".id)}${message.user.id}/bet`).delete();
                                await message.editReply({content: `${message.options.getUser("opponent")}, ${message.user} challenged you to a game of rock scissors paper, with a bet of ${message.options.getInteger("amount")}. Please choose whether you want to accept it or not.`, components: [actionRow1]})
                            }, 60000)
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
        }
    }
}