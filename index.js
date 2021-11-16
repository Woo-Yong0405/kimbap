const {Client, MessageEmbed} = require("discord.js");
const client = new Client();
const jsoning = require("jsoning");
const database = new jsoning("money.json");
let LworkTime = 0;
let lOTTime = 0;

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
    const args = message.content.slice("-".length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let data = await database.get(message.author.id);
    if (!data) {
        database.set(message.author.id, {
            wallet: 100,
            bank: 0
        });
    }
    if (command == "balance" || command == "bal") {
        message.channel.send(new MessageEmbed()
        .setTitle(message.author.username+"'s Balance")
        .setColor("BLUE")
        .setDescription(`
        Wallet: ${data.wallet}
        Bank: ${data.bank}
        `)
        .setTimestamp()
        )
    }
    if(command == "deposit" || command == "dep") {
        if(parseInt(args[0]) > data.wallet) {
            message.channel.send("You don't have that much money in your wallet");
        } else if (parseInt(args[0]) < 0) {
            message.channel.send("The number has to be greater than 0");
        } else if (args[0] == "all") {
            message.channel.send(`${message.author.username} deposited ${data.wallet}`);
            database.set(message.author.id, {
                wallet: data.wallet - data.wallet,
                bank: data.bank + data.wallet
            });
        } else if(parseInt(args[0]) > 0) {
            message.channel.send(`${message.author.username} deposited ${args[0]}`);
            database.set(message.author.id, {
                wallet: data.wallet - parseInt(args[0]),
                bank: data.bank + parseInt(args[0])
            })
        }
    }
    if(command == "withdraw" || command == "with") {
        if(parseInt(args[0]) > data.bank) {
            message.channel.send("You don't have that much money in your bank");
        } else if (parseInt(args[0]) < 0) {
            message.channel.send("The number has to be greater than 0");
        } else if (args[0] == "all") {
            message.channel.send(`${message.author.username} withdrew ${data.bank}`);
            database.set(message.author.id, {
                wallet: data.wallet + data.bank
            })
        } else if (parseInt(args[0]) > 0) {
            database.set(message.author.id, {
                wallet: data.wallet + parseInt(args[0]),
                bank: data.bank - parseInt(args[0])
            })
            message.channel.send(`${message.author.username} withdrew ${args[0]}`);
        }
    }
    if(command == "help") {
        message.channel.send(new MessageEmbed()
        .setTitle("Help")
        .setDescription(`
            **Commands:**
            **-bal** or **-balance** shows your balance 
            **-with <quantity>** or **-withdraw <quantity>** will withdraw the chosen amount
            **-dep <quantity>** or **-deposit <quantity>** will deposit the chosen amount
            **-rock <quantity>** or **-scissor <quantity>** or **-paper <quantity>** to gamble on rock scissor paper
        `)
        .setColor("BLUE"))
    }
    if(command == "rock" || command == "scissor" || command == "paper") {
        if (!parseInt(args[0])) {
            message.channel.send("Please write down your bet");
        } else {
            if (parseInt(args[0]) <= 0) {
                message.channel.send("The bet has to be at least 1")
            } else if (parseInt(args[0]) > data.wallet) {
                message.channel.send("You don't have that much money in your wallet");
            } else {
                const rsp = ["rock", "paper", "scissor"];
                const chosen = rsp[Math.floor(Math.random() * 3)]
                if (command === chosen) {
                    message.channel.send(new MessageEmbed().setColor("YELLOW").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                    You did: ${command}
                    I did: ${chosen}

                    Tie!

                    You got your ${parseInt(args[0])} back
                    `));
                } else {
                    if (command == "rock") {
                        if (chosen == "paper") {
                            message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Lost!
    
                        You lost your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet - parseInt(args[0]),
                            bank: data.bank
                        });
                        } else {
                            message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Won!
    
                        You doubled your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet + parseInt(args[0]),
                            bank: data.bank
                        });
                        }
                    }
                    if (command == "paper") {
                        if (chosen == "scissor") {
                            message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Lost!
    
                        You lost your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet - parseInt(args[0]),
                            bank: data.bank
                        });
                        } else {
                            message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Won!
    
                        You doubled your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet + parseInt(args[0]),
                            bank: data.bank
                        });
                        }
                    }
                    if (command == "scissor") {
                        if (chosen == "rock") {
                            message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Lost!
    
                        You lost your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet - parseInt(args[0]),
                            bank: data.bank
                        });
                        } else {
                            message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        You Won!
    
                        You doubled your ${parseInt(args[0])}
                        `));
                        database.set(message.author.id, {
                            wallet: data.wallet + parseInt(args[0]),
                            bank: data.bank
                        });
                        }
                    }
                }
            }
        }
    }
    if (command == "work") {
        const today = new Date();
        const hourMinute = `${today.getFullYear().toString().replace(20, "").padStart(2, 0)}${parseInt(today.getMonth().toString().padStart(2, 0)) + 1}${today.getDate().toString().padStart(2, 0)}${today.getHours().toString().padStart(2, 0)}${today.getMinutes().toString().padStart(2, 0)}${today.getSeconds().toString().padStart(2, 0)}`;
        let cWorkTime = parseInt(hourMinute);
        if (LworkTime+100 > cWorkTime) {
            message.channel.send("Your cooldown hasn't ended yet");
        } else {
            const salary = Math.floor(Math.random() * 2000);
            message.channel.send(new MessageEmbed()
            .setTitle(`${message.author.username}'s work result`)
            .setDescription(`
            You worked and got ${salary}
            `)
            .setColor("GREEN")
            .setTimestamp());
            database.set(message.author.id, {
                wallet: data.wallet + salary,
                bank: data.bank
            });
            LworkTime = cWorkTime;
        }
    }
    if (command == "ot" || command =="overtime") {
        const today = new Date();
        const hourMinute = `${today.getFullYear().toString().replace(20, "").padStart(2, 0)}${parseInt(today.getMonth().toString().padStart(2, 0)) + 1}${today.getDate().toString().padStart(2, 0)}${today.getHours().toString().padStart(2, 0)}${today.getMinutes().toString().padStart(2, 0)}${today.getSeconds().toString().padStart(2, 0)}`;
        let cOTTime = parseInt(hourMinute);
        if (lOTTime+300 > cOTTime) {
            message.channel.send("Your cooldown hasn't ended yet");
        } else {
            const salary = Math.floor(Math.random() * 1000);
            message.channel.send(new MessageEmbed()
            .setTitle(`${message.author.username}'s overtime work result`)
            .setDescription(`
            You worked overtime and got ${salary}
            `)
            .setColor("GREEN")
            .setTimestamp());
            database.set(message.author.id, {
                wallet: data.wallet + salary,
                bank: data.bank
            });
            lOTTime = cOTTime;
        }
    }
    if (command == "odd" || command == "even") {
        if (!parseInt(args[0])) {
            
        }
        const randomInt = Math.ceil(Math.random()*10);
    }
});

client.login("OTA0MTY4MDY0OTM1OTQ4MzI5.YX3mIQ.npr4wHGnS5kX9MUPowukqsIHTfI");