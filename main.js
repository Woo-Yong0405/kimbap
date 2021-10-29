const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = process.env.PREFIX;

client.once("ready", () => {
    console.log("I am ready");
});

client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).slice(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.channel.send("pong");
    }
})

client.login("OTAzNDU4NDYzNTM4MTAyMjcz.YXtRQw.UZMjSmn7KJvcTXmpZPqmDJu975I");