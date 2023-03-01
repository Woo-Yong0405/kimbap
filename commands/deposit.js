const { SlashCommandBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("저금").setDescription("은행으로 돈넣기").addIntegerOption(option => option.setName("금액")),
    async execute(message, meme) {
        const amount = message.options.getInteger("amount") ?? "all"
        if(parseInt(amount) > meme.data().wallet) {
            message.reply("You don't have that much money in your wallet");
        } else if (parseInt(amount) < 0) {
            message.reply("The number has to be greater than 0");
        } else if(parseInt(amount) >= 0) {
            message.reply(`${message.user.username} deposited ${amount}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: meme.data().wallet - parseInt(amount),
                bank: meme.data().bank + parseInt(amount)
            })
        }
    }
}