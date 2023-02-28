const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("balance").setDescription("Check how much money you have!").addUserOption(option => option.setName("user").setDescription("View user's balance")),
    async execute(interaction) {
        const user = interaction.options.getUser("user") ?? interaction.user;
        let meme = await dbService.collection("User Data").doc(user.id).get()
        const ddd = new EmbedBuilder().setTitle(user.username +"'s Balance").setColor("BLUE").setDescription(`
            Wallet: ${meme.data().wallet}
            Bank: ${meme.data().bank}
        `).setTimestamp();
        await interaction.reply({embeds:[ddd]})
    }
}