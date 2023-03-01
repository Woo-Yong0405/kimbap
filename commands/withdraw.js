const { SlashCommandBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("출금").setDescription("은행에서 돈빼기").addIntegerOption(option => option.setName("금액").setRequired(true)),
    async execute(message, meme) {
        const amount = message.options.getInteger("amount")
        if(parseInt(amount) > meme.data().bank) {
            message.reply("You don't have that much money in your bank");
        } else if (parseInt(amount) < 0) {
            message.reply("The number has to be greater than 0");
        } else if(parseInt(amount) >= 0) {
            message.reply(`${message.user.username} withdrew ${amount}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: meme.data().wallet + parseInt(amount),
                bank: meme.data().bank - parseInt(amount)
            })
        }
    }
}