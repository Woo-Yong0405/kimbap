const { Client, MessageEmbed, Intents } = require("discord.js");
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const token = require("./token.json");
const fb = require("./fb");
const Jsoning = require("jsoning");

const work = new Set();
const tips = new Set();
const ban = new Set();
const jin = new Set();

const dbService = fb;

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (ia) => {
    let meme = await dbService.doc(`User Data/${ia.user.id}`).get();
    if (ia.isButton) {
        if (ia.customId == "rr_1_yes") {
            if (jin.has(ia.user.id) && !ban.has(ia.user.id)) {
                const random = Math.floor(Math.random() * 6) + 1;
                if (random === 3) {
                    ban.add(ia.user.id);
                    setTimeout(() => {
                        ban.delete(ia.user.id);
                    }, 864000)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 24 hour ban AND losing all your money", "components": []});
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 100,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": "You got 100. Now you have a 2 out of 6 chance of dying, do you still wish to continue?",
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "Yes",
                                        "style": "SUCCESS",
                                        "custom_id": "rr_2_yes"
                                    },
                                    {
                                        "type": 2,
                                        "label": "No",
                                        "style": "DANGER",
                                        "custom_id": "rr_2_no"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        } else if (ia.customId == "rr_2_yes") {
            const random = Math.floor(Math.random() * 6) + 1;
            if (jin.has(ia.user.id) && !ban.has(ia.user.id)) {
                if (random == 1 || random == 5) {
                    ban.add(ia.user.id);
                    setTimeout(() => {
                        ban.delete(ia.user.id);
                    }, 864000)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 24 hour ban AND losing all your money", "components": []});
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 900,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": "You got 1000. Now you have a 3 out of 6 chance of dying, do you still wish to continue?",
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "Yes",
                                        "style": "SUCCESS",
                                        "custom_id": "rr_3_yes"
                                    },
                                    {
                                        "type": 2,
                                        "label": "No",
                                        "style": "DANGER",
                                        "custom_id": "rr_3_no"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        } else if (ia.customId == "rr_3_yes") {
            const random = Math.floor(Math.random() * 6) + 1;
            if (jin.has(ia.user.id) && !ban.has(ia.user.id)) {
                if (random == 1 || random == 5 || random == 4) {
                    ban.add(ia.user.id);
                    setTimeout(() => {
                        ban.delete(ia.user.id);
                    }, 864000)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 24 hour ban AND losing all your money", "components": []});
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 9000,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": "You got 10000. Now you have a 4 out of 6 chance of dying, do you still wish to continue?",
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "Yes",
                                        "style": "SUCCESS",
                                        "custom_id": "rr_4_yes"
                                    },
                                    {
                                        "type": 2,
                                        "label": "No",
                                        "style": "DANGER",
                                        "custom_id": "rr_4_no"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        } else if (ia.customId == "rr_4_yes") {
            const random = Math.floor(Math.random() * 6) + 1;
            if (jin.has(ia.user.id) && !ban.has(ia.user.id)) {
                if (random == 1 || random == 5 || random == 2 || random == 4) {
                    ban.add(ia.user.id);
                    setTimeout(() => {
                        ban.delete(ia.user.id);
                    }, 864000)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 24 hour ban AND losing all your money", "components": []});
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 90000,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": "You got 100000. Now you have a 5 out of 6 chance of dying, do you still wish to continue?",
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "Yes",
                                        "style": "SUCCESS",
                                        "custom_id": "rr_5_yes"
                                    },
                                    {
                                        "type": 2,
                                        "label": "No",
                                        "style": "DANGER",
                                        "custom_id": "rr_5_no"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        } else if (ia.customId == "rr_5_yes") {
            const random = Math.floor(Math.random() * 6) + 1;
            if (jin.has(ia.user.id) && !ban.has(ia.user.id)) {
                if (random == 1 || random == 5 || random == 2 || random == 3 || random == 6) {
                    ban.add(ia.user.id);
                    setTimeout(() => {
                        ban.delete(ia.user.id);
                    }, 864000)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 24 hour ban AND losing all your money", "components": []});
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 900000,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": `Congratulations, ${ia.user.username} walked away with 1000000`,
                        "components": []
                    });
                    jin.clear();
                }
            }
        } else if (ia.customId == "rr_1_no") {
            ia.update({"content": "Wait what did you even do the command for", "components": []});
            jin.clear();
        } else if (ia.customId == "rr_2_no") {
            ia.update({"content": `${ia.user.username} walked away with only 100. COWARD`, "components": []});
            jin.clear();
        } else if (ia.customId == "rr_3_no") {
            ia.update({"content": `${ia.user.username} walked away with only 1000. COWARD`, "components": []});
            jin.clear();
        } else if (ia.customId == "rr_4_no") {
            ia.update({"content": `${ia.user.username} walked away with only 10000. COWARD`, "components": []});
            jin.clear();
        } else if (ia.customId == "rr_5_no") {
            ia.update({"content": `${ia.user.username} walked away with only 100000. COWARD`, "components": []});
            jin.clear();
        }
    }
})

client.on("messageCreate", async (message) => {
    if ((dbService.doc(`User Data/${message.author.id}`).get()).exists == false) {
        dbService.doc(`User Data/${message.author.id}`).set({
            wallet: 100,
            bank: 0
        })
    }
    let meme = await dbService.doc(`User Data/${message.author.id}`).get();
    let asdf = await dbService.doc(`Channel Data/${message.channel.id}`).get();
    let prefixes = asdf.data().prefix;
    if (!prefixes) {
        database1.set(message.channel.id, "-");
    }
    if (message.author.id != client.user.id && message.content.startsWith(prefixes) == true && !ban.has(message.author.id)) {
        const args = message.content.trim().split(/ +/g);
        const command = args[0].substring(1).toLowerCase();
        if (message.mentions.users.size == 0) {
        if (command == "ping") {
            message.channel.send(`Current ping is ${client.ws.ping}ms`)
        } else if (command == "prefix" || command == "p") {
            if (args[1]) {
                if (args[1].length == 1) {
                    database1.set(message.channel.id, `${args[1]}`)
                    message.channel.send("@everyone, The prefix has been changed to: " + args[1])
                } else {
                    message.reply("Your new prefix has to contain only 1 character");
                }
            } else {
                message.reply("Please specify the new prefix");
            }
        } else if (command == "work" || command == "w") {
            if (work.has(message.author.id)) {
                message.reply("Your cooldown hasn't ended yet")
            } else {
                const salary = Math.floor(Math.random() * 2000);
                const ddd = new MessageEmbed()
                .setTitle(`${message.author.username}'s work result`)
                .setDescription(`
                    You worked and got ${salary}
                    `)
                    .setColor("GREEN")
                    .setTimestamp();
                message.channel.send({embeds:[ddd]})
                        dbService.doc(`User Data/${message.author.id}`).set({
                            wallet: meme.data().wallet + salary,
                            bank: meme.data().bank
                        });
                    work.add(message.author.id);
                    setTimeout(() => {
                        work.delete(message.author.id);
                    }, 60000);
            }
        } else if (command == "tips" || command == "t") {
            if (tips.has(message.author.id)) {
                    message.reply(`Your cooldown hasn't ended yet`)
                    } else {
                        const salary = Math.floor(Math.random() * 1000);
                        const ddd = new MessageEmbed()
                        .setTitle(`${message.author.username}'s tips`)
                        .setDescription(`
                    You collected your tips and got ${salary}
                    `)
                    .setColor("GREEN")
                    .setTimestamp();
                        message.channel.send({embeds:[ddd]});
                        dbService.doc(`User Data/${message.author.id}`).set({
                            wallet: meme.data().wallet + salary,
                            bank: meme.data().bank
                        });
                    tips.add(message.author.id);
                    setTimeout(() => {
                        tips.delete(message.author.id);
                    }, 60000);
            }
        } else if (command == "balance" || command == "bal") {
            if (message.mentions.users.size == 0) {
                const ddd = new MessageEmbed()
                .setTitle(message.author.username+"'s Balance")
                .setColor("BLUE")
                                .setDescription(`
                                Wallet: ${meme.data().wallet}
                                Bank: ${meme.data().bank}
                                `)
                .setTimestamp();
                    message.channel.send({embeds:[ddd]})
            } else if (message.mentions.users.size == 1) {
                const asdf = (dbService.doc(`User Data/${message.mentions.users.first().id}`).get()).data();
                const ddd = new MessageEmbed()
                .setTitle(message.mentions.users.first().username+"'s Balance")
                .setColor("BLUE")
                                .setDescription(`
                                Wallet: ${asdf.wallet}
                                Bank: ${asdf.bank}
                                `)
                .setTimestamp();    
                message.channel.send({embeds:[ddd]})
            } else {
                message.channel.send("That person does not use this bot");
            }
        } else if (command == "deposit" || command == "dep") {
            if(parseInt(args[1]) > meme.data().wallet) {
                message.channel.send("You don't have that much money in your wallet");
            } else if (parseInt(args[1]) < 0) {
                message.channel.send("The number has to be greater than 0");
            } else if (args[1] == "all") {
                message.channel.send(`${message.author.username} deposited ${meme.data().wallet}`);
                dbService.doc(`User Data/${message.author.id}`).set({
                    wallet: 0,
                    bank: meme.data().wallet + meme.data().bank
                });
            } else if(parseInt(args[1]) > 0) {
                message.channel.send(`${message.author.username} deposited ${args[1]}`);
                dbService.doc(`User Data/${message.author.id}`).set({
                    wallet: meme.data().wallet - parseInt(args[1]),
                    bank: meme.data().bank + parseInt(args[1])
                })
            }
        } else if(command == "withdraw" || command == "with") {
            if(parseInt(args[1]) > meme.data().bank) {
                message.channel.send("You don't have that much money in your bank");
            } else if (parseInt(args[1]) <= 0) {
                message.channel.send("The number has to be greater than 0");
            } else if (args[1] == "all") {
                message.channel.send(`${message.author.username} withdrew ${meme.data().bank}`);
                dbService.doc(`User Data/${message.author.id}`).set({
                    wallet: meme.data().wallet + meme.data().bank,
                    bank: 0
                })
            } else if (parseInt(args[1]) > 0) {
                dbService.doc(`User Data/${message.author.id}`).set({
                    wallet: meme.data().wallet + parseInt(args[1]),
                    bank: meme.data().bank - parseInt(args[1])
                })
                message.channel.send(`${message.author.username} withdrew ${args[1]}`);
            }
        } else if(command == "help") {
            const ddd = new MessageEmbed()
            .setTitle("Help")
                            .setDescription(`
                            **Commands:**
                            **-bal** or **-balance** shows your balance
                            **-with <quantity>** or **-withdraw <quantity>** will withdraw the chosen amount
                                **-dep <quantity>** or **-deposit <quantity>** will deposit the chosen amount
                                    **-rock <quantity>** or **-scissor <quantity>** or **-paper <quantity>** to gamble on rock scissor paper
                                        **-odd <quantity>** or **-even <quantity>** to gamble on odd/even
                                            `)
            .setColor("BLUE")
            message.channel.send({embeds:[ddd]})
        } else if(command == "rock" || command == "scissor" || command == "paper") {
            if (meme.data().wallet == 0) {
                message.channel.send("You can't gamble if you don't have money");
            } else {
                if (!parseInt(args[1]) && args[1] != "all") {
                    message.channel.send("Please write down your bet");
                } else {
                    if (parseInt(args[1])) {
                        if (parseInt(args[1]) <= 0) {
                            message.channel.send("The bet has to be at least 1")
                        } else if (parseInt(args[1]) > meme.data().wallet) {
                            message.channel.send("You don't have that much money in your wallet");
                        } else {
                            const rsp = ["rock", "paper", "scissor"];
                            const chosen = rsp[Math.floor(Math.random() * 3)]
                            if (command === chosen) {
                                const ddd = new MessageEmbed().setColor("YELLOW").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                You did: ${command}
                                I did: ${chosen}
                                
                                Tie!
                                
                                You got your ${parseInt(args[1])} back
                                `);
                                            message.channel.send({embeds:[ddd]});
                            } else {
                                if (command == "rock") {
                                    if (chosen == "paper") {
                                        const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Lost!
                                        
                                        You lost your ${parseInt(args[1])}
                                        `)
                                            message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet - parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    } else {
                                        const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Won!
                                        
                                        You doubled your ${parseInt(args[1])}
                                        `)
                                            message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet + parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    }
                                }
                                if (command == "paper") {
                                    if (chosen == "scissor") {
                                        const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Lost!d
                                        
                                        You lost your ${parseInt(args[1])}
                                        `)
                                        message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet - parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    } else {
                                        const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Won!
                                        
                                        You doubled your ${parseInt(args[1])}
                                        `)
                                        message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet + parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    }
                                }
                                if (command == "scissor") {
                                    if (chosen == "rock") {
                                        const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Lost!
                                        
                                        You lost your ${parseInt(args[1])}
                                        `)
                                            message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet - parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    } else {
                                        const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                        You did: ${command}
                                        I did: ${chosen}
                                        
                                        You Won!
                                        
                                        You doubled your ${parseInt(args[1])}
                                        `)
                                            message.channel.send({embeds:[ddd]});
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet + parseInt(args[1]),
                                        bank: meme.data().bank
                                    });
                                    }
                                }
                            }
                        }
                    } else if (args[1] == "all") {
                        const rsp = ["rock", "paper", "scissor"];
                        const chosen = rsp[Math.floor(Math.random() * 3)]
                        if (command === chosen) {
                            const ddd = new MessageEmbed().setColor("YELLOW").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
                            
                            Tie!
                            
                            Nothing changes
                            `)
                                            message.channel.send({embeds:[ddd]});
                        } else {
                            if (command == "rock") {
                                if (chosen == "paper") {
                                    const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Lost!
                                    
                                    You lost all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: 0,
                                    bank: meme.data().bank
                                });
                                } else {
                                    const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Won!
                                    
                                    You doubled all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet * 2,
                                    bank: meme.data().bank
                                });
                                }
                            }
                            if (command == "paper") {
                                if (chosen == "scissor") {
                                    const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Lost!
                                    
                                    You lost all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: 0,
                                    bank: meme.data().bank
                                });
                                } else {
                                    const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Won!
                                    
                                    You doubled all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet * 2,
                                    bank: meme.data().bank
                                });
                                }
                            }
                            if (command == "scissor") {
                                if (chosen == "rock") {
                                    const ddd = new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Lost!
                                    
                                    You lost all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: 0,
                                    bank: meme.data().bank
                                });
                                } else {
                                    const ddd = new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                    You did: ${command}
                                    I did: ${chosen}
                                    
                                    You Won!
                                    
                                    You doubled all your money!
                                    `)
                                            message.channel.send({embeds:[ddd]});
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet * 2,
                                    bank: meme.data().bank
                                });
                                }
                            }
                        }
                    }
                }
            }
        } else if (command == "odd" || command == "even") {
            if (meme.data().wallet == 0) {
                message.channel.send("You can't gamble without any money");
            } else {
                const randomInt = Math.ceil(Math.random()*10);
            if (args[1]) {
                if (args[1] == "all" || parseInt(args[1])) {
                    if (command == "even") {
                        if (randomInt % 2 == 0) {
                            if (parseInt(args[1])) {
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet + parseInt(args[1]),
                                    bank: meme.data().bank
                                })
                                const ddd = new MessageEmbed()
                                .setTitle(`${message.author.username}'s odd/even game result:`)
                                    .setDescription(`

                **${randomInt}**

                The number was even!
                You doubled your ${args[1]}
                `)
                                message.channel.send({embeds:[ddd]})
                            } else if (args[1] == "all") {
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet * 2,
                                    bank: meme.data().bank
                                })
                                const ddd = new MessageEmbed()
                                .setTitle(`${message.author.username}'s odd/even game result:`)
                                    .setDescription(`

            **${randomInt}**

            The number was even!
            You doubled your money!
            `)
                                message.channel.send({embeds:[ddd]})
                            }
                        } else {
                            if (parseInt(args[1])) {
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: meme.data().wallet - parseInt(args[1]),
                                    bank: meme.data().bank
                                })
                                const ddd = new MessageEmbed()
                                .setTitle(`${message.author.username}'s odd/even game result:`)
                                    .setDescription(`

        **${randomInt}**

        The number was odd!
        You lost your ${args[1]}
        `)
                                message.channel.send({embeds:[ddd]})
                            } else if (args[1] == "all") {
                                dbService.doc(`User Data/${message.author.id}`).set({
                                    wallet: 0,
                                    bank: meme.data().bank
                                })
                                const ddd = new MessageEmbed()
                                .setTitle(`${message.author.username}'s odd/even game result:`)
                                    .setDescription(`

    **${randomInt}**

    The number was odd!
    You lost all your money!
    `)
                                message.channel.send({embeds:[ddd]})
                            }
                        }
                    } else {
                        if (command == "odd") {
                            if (randomInt % 2 != 0) {
                                if (parseInt(args[1])) {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet + parseInt(args[1]),
                                        bank: meme.data().bank
                                    })
                                    const ddd = new MessageEmbed()
                                    .setTitle(`${message.author.username}'s odd/even game result:`)
                                        .setDescription(`

        **${randomInt}**

        The number was odd!
        You doubled your ${args[1]}
        `)
                                    message.channel.send({embeds:[ddd]})
                                } else if (args[1] == "all") {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet*2,
                                        bank: meme.data().bank
                                    })
                                    const ddd = new MessageEmbed()
                                    .setTitle(`${message.author.username}'s odd/even game result:`)
                                        .setDescription(`

    **${randomInt}**

    The number was odd!
    You doubled all your money
    `)
                                    message.channel.send({embeds:[ddd]})
                                }
                            } else {
                                if (parseInt(args[1])) {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet - parseInt(args[1]),
                                        bank: meme.data().bank
                                    })
                                    const ddd = new MessageEmbed()
                                    .setTitle(`${message.author.username}'s odd/even game result:`)
                                        .setDescription(`

**${randomInt}**

The number was even!
You lost your ${args[1]}
`)
                                    message.channel.send({embeds:[ddd]})
                                } else if (args[1] == "all") {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: 0,
                                        bank: meme.data().bank
                                    })
                                    const ddd = new MessageEmbed()
                                    .setTitle(`${message.author.username}'s odd/even game result:`)
                                        .setDescription(`

**${randomInt}**

The number was even!
You lost all your money
`)
                                    message.channel.send({embeds:[ddd]})
                                }
                            }
                        }
                    }
                } else {
                    message.channel.send("Your bet has to be a number");
                }
            } else {
                message.channel.send("Please send a bet after your command");
            }
            }
        } else if (command == "rr") {
            jin.add(message.author.id);
            message.channel.send({
                "content": "You have a 1 out of 6 chance of dying, do you still wish to continue?",
                "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "label": "Yes",
                                "style": "SUCCESS",
                                "custom_id": "rr_1_yes"
                            },
                            {
                                "type": 2,
                                "label": "No",
                                "style": "DANGER",
                                "custom_id": "rr_1_no"
                            }
                        ]
                    }
                ]
            });
        } else {
            message.channel.send("That is not a command")
        }
    } else {
        const asdf = message.mentions.users.first().id;
        if ((dbService.doc("User Data/" + asdf).get()).exists == true) {
            dbService.doc("User Data/" + asdf).get().then((doc) => {
                if (command == "bal" || command == "balance") {
                    const ddd = new MessageEmbed()
                    .setTitle(`${message.mentions.users.first().username}'s Balance`)
                        .setDescription(`
Wallet: ${doc.data().wallet}
Bank: ${doc.data().bank}
`)
.setTimestamp()
.setColor("BLUE")
                    message.channel.send({embeds:[ddd]})
                } else if (command == "give") {
                    if (args[2]) {
                        if (parseInt(args[2])) {
                            if (parseInt(args[2]) < parseInt(meme.data().wallet)) {
                                if (parseInt(args[2]) >= 0) {
                                    if (asdf != client.user.id) {
                                        if (asdf != message.author.id) {
                                            dbService.doc(`User Data/${message.author.id}`).set({
                                                wallet: meme.data().wallet - parseInt(args[2]),
                                                bank: meme.data().bank
                                            });
                                            dbService.doc(`User Data/${message.mentions.users.first().id}`).set({
                                                wallet: doc.data().wallet + parseInt(args[2]),
                                                bank: doc.data().bank
                                            });
                                            message.channel.send(`@${message.author.username} gave ${args[2]} to @${message.mentions.users.first().username}`)
                                        } else {
                                            message.reply("You can't give money to yourself")
                                        }
                                    } else {
                                        message.reply("I don't need your dirty money");
                                    }
                                } else {
                                    message.reply("The number has to be more than 0");
                                }
                            } else {
                                message.reply("You don't have that much money");
                            }
                        } else {
                            if (asdf != client.user.id) {
                                if (asdf != message.author.id) {
                                    message.channel.send(`@${message.author.username} gave all of his money to @${message.mentions.users.first().username}`)
                                        dbService.doc(`User Data/${message.mentions.users.first().id}`).set({
                                            wallet: doc.data().wallet + meme.data().wallet,
                                            bank: doc.data().bank
                                        });
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: 0,
                                            bank: meme.data().bank
                                        });
                                } else {
                                    message.reply("You can't give money to yourself")
                                }
                            } else {
                                message.reply("I don't need your dirty money");
                            }
                            }
                    } else {
                        message.reply("Say how much money by a number or all")
                    }
                }})

        } else {
            message.reply("Cannot find a user with id: " + message.author.id)
        }
        }
    }
	});

client.login(process.env.TOKEN);