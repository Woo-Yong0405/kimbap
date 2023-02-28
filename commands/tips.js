const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dbService = require("../fb");

const tips = new Set();

module.exports = {
    data: new SlashCommandBuilder().setName("tips").setDescription("Collect tips to earn money!"),
    async execute(message, meme) {
        if (tips.has(message.user.id)) {
            message.reply("Your cooldown hasn't ended yet.")
        } else {
            const salary = Math.floor(Math.random() * 2000);
            const ddd = new EmbedBuilder()
            .setTitle(`${message.user.username}'s tips`)
            .setDescription(`
                You collected tips and got ${salary}
                `)
                .setColor("66ff33")
                .setTimestamp();
            message.reply({embeds:[ddd]})
                    dbService.doc(`User Data/${message.user.id}`).update({
                        wallet: meme.data().wallet + salary,
                        bank: meme.data().bank
                    });
                tips.add(message.user.id);
                setTimeout(() => {
                    tips.delete(message.user.id);
                }, 60000);
        }
    }
}