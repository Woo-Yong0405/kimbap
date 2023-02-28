const { SlashCommandBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("withdraw").setDescription("Move money from your bank to your wallet!").addIntegerOption(option => option.setName("amount").setDescription("Amount of money to withdraw (all if not specified)")),
    async execute(message, meme) {
        const amount = message.options.getInteger("amount") ?? "all"
        if(parseInt(amount) > meme.data().bank) {
            message.reply("You don't have that much money in your bank");
        } else if (parseInt(amount) < 0) {
            message.reply("The number has to be greater than 0");
        } else if (amount == "all") {
            message.reply(`${message.user.username} withdrew ${meme.data().bank}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: meme.data().wallet + meme.data().bank,
                bank: 0
            });
        } else if(parseInt(amount) > 0) {
            message.reply(`${message.user.username} withdrew ${amount}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: meme.data().wallet + parseInt(amount),
                bank: meme.data().bank - parseInt(amount)
            })
        }
    }
}