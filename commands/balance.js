const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("잔고").setDescription("잔고 확인").addUserOption(option => option.setName("유저").setDescription("잔고확인을 할 유저")),
    async execute(interaction) {
        await dbService.doc(`User Data/${message.user.id}`).then(async (doc) => {
            if (doc.exists) {
                const user = interaction.options.getUser("user") ?? interaction.user;
                let meme = await dbService.collection("User Data").doc(user.id).get()
                const ddd = new EmbedBuilder().setTitle(user.username +"'s Balance").setColor("BLUE").setDescription(`
                    Wallet: ${meme.data().wallet}
                    Bank: ${meme.data().bank}
                `).setTimestamp();
                await interaction.reply({embeds:[ddd]})
            } else {
                interaction.reply("Please initialize using /셋업 first!")
            }
        })
    }
}