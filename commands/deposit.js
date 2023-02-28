const { SlashCommandBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("deposit").setDescription("Move money from your wallet to your bank!").addIntegerOption(option => option.setName("amount").setDescription("Amount of money to deposit (all if not specified)")),
    async execute(message, meme) {
        const amount = message.options.getInteger("amount") ?? "all"
        if(parseInt(amount) > meme.data().wallet) {
            message.reply("You don't have that much money in your wallet");
        } else if (parseInt(amount) < 0) {
            message.reply("The number has to be greater than 0");
        } else if (amount == "all") {
            message.reply(`${message.user.username} deposited ${meme.data().wallet}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: 0,
                bank: meme.data().wallet + meme.data().bank
            });
        } else if(parseInt(amount) > 0) {
            message.reply(`${message.user.username} deposited ${amount}`);
            dbService.doc(`User Data/${message.user.id}`).update({
                wallet: meme.data().wallet - parseInt(amount),
                bank: meme.data().bank + parseInt(amount)
            })
        }
    }
}