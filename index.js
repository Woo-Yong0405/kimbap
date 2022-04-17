const { Client, MessageEmbed, Intents, BaseClient } = require("discord.js");
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const fb = require("./fb");

const work = new Set();
const ban = new Set();
const rr = new Set();
const tipsA = new Set();
const rob = new Set();

const dbService = fb;

function death(id) {
    ban.add(id);
    setTimeout(() => {
        ban.delete(ia.user.id);
    }, 60000)
}

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (ia) => {
    let meme = await dbService.doc(`User Data/${ia.user.id}`).get();
    if (ia.isButton) {
        if (rr.has(ia.user.id)) {
            if (ia.customId == "rr_1_yes") {
                const random = Math.floor(Math.random() * 6) + 1;
                    if (random === 3) {
                        death(ia.user.id)
                        dbService.doc(`User Data/${ia.user.id}`).set({
                            wallet: 0,
                            bank: 0
                        })
                        ia.update({"content": "Well.... You died, meaning a 1 minute ban AND losing all your money", "components": []});
                        rr.delete(ia.user.id)
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
            } else if (ia.customId == "rr_2_yes") {
                const random = Math.floor(Math.random() * 6) + 1;
                if (random == 1 || random == 5) {
                    death(ia.user.id)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 1 minute ban AND losing all your money", "components": []});
                    rr.delete(ia.user.id)
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
            } else if (ia.customId == "rr_3_yes") {
                const random = Math.floor(Math.random() * 6) + 1;
                if (random == 1 || random == 5 || random == 4) {
                    death(ia.user.id)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 1 minute ban AND losing all your money", "components": []});
                    rr.delete(ia.user.id)
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
            } else if (ia.customId == "rr_4_yes") {
                const random = Math.floor(Math.random() * 6) + 1;
                if (random == 1 || random == 5 || random == 2 || random == 4) {
                    death(ia.user.id)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 1 minute ban AND losing all your money", "components": []});
                    rr.delete(ia.user.id)
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
            } else if (ia.customId == "rr_5_yes") {
                const random = Math.floor(Math.random() * 6) + 1;
                if (random == 1 || random == 5 || random == 2 || random == 3 || random == 6) {
                    death(ia.user.id)
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: 0,
                        bank: 0
                    })
                    ia.update({"content": "Well.... You died, meaning a 1 minute ban AND losing all your money", "components": []});
                    rr.delete(ia.user.id)
                } else {
                    dbService.doc(`User Data/${ia.user.id}`).set({
                        wallet: meme.data().wallet + 900000,
                        bank: meme.data().bank
                    })
                    ia.update({
                        "content": `Congratulations, ${ia.user.username} walked away with 1000000`,
                        "components": []
                    });
                }
            } else if (ia.customId == "rr_1_no") {
                ia.update({"content": "Wait what did you even do the command for", "components": []});
                rr.delete(ia.user.id)
                ;
            } else if (ia.customId == "rr_2_no") {
                ia.update({"content": `${ia.user.username} walked away with only 100. COWARD`, "components": []});
                rr.delete(ia.user.id)
                ;
            } else if (ia.customId == "rr_3_no") {
                ia.update({"content": `${ia.user.username} walked away with only 1000. COWARD`, "components": []});
                rr.delete(ia.user.id)
                ;
            } else if (ia.customId == "rr_4_no") {
                ia.update({"content": `${ia.user.username} walked away with only 10000. COWARD`, "components": []});
                rr.delete(ia.user.id)
                ;
            } else if (ia.customId == "rr_5_no") {
                ia.update({"content": `${ia.user.username} walked away with only 100000. COWARD`, "components": []});
                rr.delete(ia.user.id)
            }
        }
        if (tipsA.has(ia.user.id)) {
            switch (ia.customId) {
                case "tips__get":
                    dbService.doc(`Tips/${ia.user.id}`).get().then((doc) => {
                        ia.update({"content": `${ia.user.username} got ${doc.data().tips} out of the tipbox.`, "components": []})
                        dbService.doc(`User Data/${ia.user.id}`).get().then((adoc) => {
                            dbService.doc(`User Data/${ia.user.id}`).set({
                                wallet: adoc.data().wallet + doc.data().tips,
                                bank: adoc.data().bank
                            })
                            dbService.doc(`Tips/${ia.user.id}`).set({
                                tips: 0
                            })
                        })
                    })
                    break;
                case "tips__wait":
                    const boolTip = Math.round(Math.random()) == 1
                    ia.update({"content": `Waiting for a person kind enough to give tips.....`, "components": []})
                    setTimeout(() => {
                        if (boolTip) {
                            ia.channel.send({"content": `Nobody wants to give you tips...`, "components": []})
                        } else {
                            const salary = Math.round(Math.random() * 2000);
                            dbService.doc(`Tips/${ia.user.id}`).get().then((doc) => {
                                dbService.doc(`Tips/${ia.user.id}`).set({
                                    tips: doc.data().tips + salary
                                })
                            })
                            ia.channel.send({"content": "Wow! A kind person just put " + salary + " into your tipbox!", "components": []})
                        }
                    }, 20000)
                    break;
                case "tips__cancel":
                    ia.update({"content": "Wait what did you even do the command for", "components": []});
                    break;
            }
            tipsA.delete(ia.user.id)
        }
        if (rob.has(ia.user.id)) {
            switch (ia.customId) {
                case "rob__yes":
                    const chance = Math.round(Math.random()*20);
                    const msg = await client.channels.cache.get(ia.message.reference.channelId).messages.fetch(ia.message.reference.messageId);
                    const victim = msg.mentions.users.first().id;
                    const robber = msg.author.id;
                    if (chance <= 10) {
                        ia.update({"content": "You died, meaning a 1 minute ban AND losing all your money. That's what you get for being so greedy lol", "components": []});
                        death(robber)
                    } else if (chance <= 16) {
                        dbService.doc(`User Data/${victim}`).get().then((doc) => {
                            const netWorth = doc.data().wallet + doc.data().bank
                            if (netWorth/10 > doc.data().wallet) {
                                dbService.doc(`User Data/${victim}`).set({
                                    wallet: 0,
                                    bank: doc.data().bank - (netWorth/10 - doc.data().wallet)
                                })
                                dbService.doc(`User Data/${robber}`).get().then((docs) => {
                                    dbService.doc(`User Data/${robber}`).set({
                                        wallet: docs.data().wallet + netWorth/10,
                                        bank: docs.data().bank
                                    })
                                })
                            } else {
                                dbService.doc(`User Data/${victim}`).set({
                                    wallet: doc.data().wallet-netWorth/10,
                                    bank: doc.data().bank
                                })
                                dbService.doc(`User Data/${robber}`).get().then((docs) => {
                                    dbService.doc(`User Data/${robber}`).set({
                                        wallet: docs.data().wallet + netWorth/10,
                                        bank: docs.data().bank
                                    })
                                })
                            }
                        })
                        ia.update({"content": `${msg.author.username} just stole 10% of everything ${msg.mentions.users.first().username} owns`, "components": []});
                    } else if (chance <= 19) {
                        dbService.doc(`User Data/${victim}`).get().then((doc) => {
                            const netWorth = doc.data().wallet + doc.data().bank
                            if (netWorth/2 > doc.data().wallet) {
                                dbService.doc(`User Data/${victim}`).set({
                                    wallet: 0,
                                    bank: doc.data().bank - (netWorth/2 - doc.data().wallet)
                                })
                                dbService.doc(`User Data/${robber}`).get().then((docs) => {
                                    dbService.doc(`User Data/${robber}`).set({
                                        wallet: docs.data().wallet + netWorth/2,
                                        bank: docs.data().bank
                                    })
                                })
                            } else {
                                dbService.doc(`User Data/${victim}`).set({
                                    wallet: doc.data().wallet-netWorth/2,
                                    bank: doc.data().bank
                                })
                                dbService.doc(`User Data/${robber}`).get().then((docs) => {
                                    dbService.doc(`User Data/${robber}`).set({
                                        wallet: docs.data().wallet + netWorth/2,
                                        bank: docs.data().bank
                                    })
                                })
                            }
                            ia.update({"content": `${msg.author.username} just stole half of everything ${msg.mentions.users.first().username} owns`, "components": []});
                        })
                    } else {
                        dbService.doc(`User Data/${victim}`).get().then((doc) => {
                            const netWorth = doc.data().wallet + doc.data().bank
                            dbService.doc(`User Data/${victim}`).set({
                                wallet: 0,
                                bank: 0
                            })
                            dbService.doc(`User Data/${robber}`).get().then((docs) => {
                                dbService.doc(`User Data/${robber}`).set({
                                    wallet: docs.data().wallet + netWorth,
                                    bank: docs.data().bank
                                })
                            })
                        })
                        ia.update({"content": `Wow ${msg.author.username} just stole literally EVERYTHING ${msg.mentions.users.first().username} owns!`, "components": []});
                    }
                    break;
                case "rob__no":
                    ia.update({"content": "Wait what did you even do the command for", "components": []});
                    break;
            }
            rob.delete(ia.user.id)
        }
    }
})

client.on("messageCreate", async (message) => {
    let meme = await dbService.doc(`User Data/${message.author.id}`).get();
    if (!meme.exists) {
        dbService.doc(`User Data/${message.author.id}`).set({
            wallet: 100,
            bank: 0,
        })
    }
    let asdf = await dbService.doc(`Channel Data/${message.channel.id}`).get();
    if (!asdf.exists) {
        dbService.doc(`Channel Data/${message.channel.id}`).set({
            prefix: "-"
        })
    }
    let tips = await dbService.doc(`Tips/${message.author.id}`).get();
    if (!tips.exists) {
        dbService.doc(`Tips/${message.author.id}`).set({
            tips: 0
        })
    }
    if (message.author.id != client.user.id && message.content.startsWith(asdf.data().prefix) == true && !ban.has(message.author.id)) {
        const args = message.content.trim().split(/ +/g);
        const command = args[0].substring(1).toLowerCase();
        if (message.mentions.users.size == 0) {
        if (command == "ping") {
            message.channel.send(`Current ping is ${client.ws.ping}ms`)
        } else if (command == "prefix" || command == "p") {
            if (args[1]) {
                if (args[1].length == 1) {
                    dbService.doc(`Channel Data/${message.channel.id}`).set({
                        prefix: args[1],
                    })
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
            tipsA.add(message.author.id)
            dbService.doc(`Tips/${message.author.id}`).get().then((doc) => {
                message.channel.send({"content": `${message.author.username}'s tipbox contains ${doc.data().tips}`, "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "label": "Get",
                                "style": "SUCCESS",
                                "customId": "tips__get"
                            },
                            {
                                "type": 2,
                                "label": "Wait",
                                "style": "PRIMARY",
                                "customId": "tips__wait"
                            },
                            {
                                "type": 2,
                                "label": "Cancel",
                                "style": "DANGER",
                                "customId": "tips__cancel"
                            }
                        ]
                    }
                ]})
            })
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
                message.channel.send("Cannot find a user with id: " + message.mentions.users.first().id);
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
            rr.add(message.author.id);
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
        } else if (command == "rob") {
            console.log(args[1])
        } else {
            message.channel.send("That is not a command")
        }
    } else {
        const asdf = message.mentions.users.first().id;
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
                                    message.channel.send(`${message.author.username} gave all of his money to ${message.mentions.users.first().username}`)
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
                } else if (command == "rob") {
                    if (args[1]) {
                        if (message.mentions.users.first().id !== message.author.id) {
                            if (message.mentions.users.first().id !== client.user.id) {
                                rob.add(message.author.id);
                                message.reply({"content": `${message.author.username}, you have 50% chance of dying, 30% chance of stealing 10% of ${message.mentions.users.first().username}'s money, 15% chance of stealing half of ${message.mentions.users.first().username}'s money, and 5% chance of stealing everything ${message.mentions.users.first().username} owns. Do you still wish to continue?`, "components": [
                                    {
                                        "type": 1,
                                        "components": [
                                            {
                                                "type": 2,
                                                "label": "Yes",
                                                "style": "SUCCESS",
                                                "customId": "rob__yes"
                                            },
                                            {
                                                "type": 2,
                                                "label": "No",
                                                "style": "DANGER",
                                                "customId": "rob__no"
                                            }
                                        ]
                                    }
                                ]});
                            } else {
                                message.reply("I was thinking you would be smart enough not to know that you can't rob a bot, but this proves me wrong")
                            }
                        } else {
                            message.reply("Why tf are you trying to rob yourself")
                        }
                    } else {
                        message.reply("Please specify who you're robbing");
                    }
                }
            })
        }
    }
	});

client.login(process.env.TOKEN);