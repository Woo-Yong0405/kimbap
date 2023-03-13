const { SlashCommandBuilder } = require("discord.js");
const dbService = require("../fb");

module.exports = {
    data: new SlashCommandBuilder().setName("셋업").setDescription("신규유저용"),
    async execute(interaction) {
        await dbService.doc(`User Data/${interaction.user.id}`).get().then(async doc => {
            if (doc.exists) {
                await interaction.reply(`${interaction.user.username}'s account already exists.`);
            } else {
                dbService.doc(`User Data/${interaction.user.id}`).set({
                    bank: 0,
                    wallet: 100
                })
                await interaction.reply(`${interaction.user.username}'s account has been initialized. Congratulations!`)
            }
        })
    }
}