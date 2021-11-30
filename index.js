import { Client, MessageEmbed } from "discord.js";
const client = new Client();
import { config } from "dotenv";
config();
import jsoning from "jsoning";
import dbService from "./fb.js";
const database = new jsoning("money.json");
const database1 = new jsoning("channel.json");
const work = new Set();
const tips = new Set();

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
    let prefixes = await database1.get(message.channel.id);
    if (!prefixes) {
        database1.set(message.channel.id, "-");
    }
    if (message.author.id != client.user.id && message.content.startsWith(prefixes) == true) {
        const args = message.content.trim().split(/ +/g);
        const command = args[0].substring(1).toLowerCase();
        let data = await database.get(message.author.id);
        if (!data) {
            database.set(message.author.id, {
                wallet: 100,
                bank: 0
            });
        }
        if (command == "ping") {
            message.channel.send(`Current ping is ${client.ws.ping}ms`)
        }
        if (command == "prefix" || command == "p") {
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
        }
    if (command == "work" || command == "w") {
        if (work.has(message.author.id)) {
            message.reply("Your cooldown hasn't ended yet")
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
                work.add(message.author.id);
                setTimeout(() => {
                    work.delete(message.author.id);
                }, 60000);
        }
    }
    if (command == "tips" || command == "t") {
        if (tips.has(message.author.id)) {
            message.reply(`Your cooldown hasn't ended yet`)
        } else {
            const salary = Math.floor(Math.random() * 1000);
                    message.channel.send(new MessageEmbed()
                    .setTitle(`${message.author.username}'s tips`)
                    .setDescription(`
                    You collected your tips and got ${salary}
                    `)
                    .setColor("GREEN")
                    .setTimestamp());
                    database.set(message.author.id, {
                        wallet: data.wallet + salary,
                        bank: data.bank
                    });
                tips.add(message.author.id);
                setTimeout(() => {
                    tips.delete(message.author.id);
                }, 60000);
        }
    }
    if (command == "balance" || command == "bal") {
        if (message.mentions.users.size == 0) {
            message.channel.send(new MessageEmbed()
        .setTitle(message.author.username+"'s Balance")
        .setColor("BLUE")
        .setDescription(`
        Wallet: ${data.wallet}
        Bank: ${data.bank}
        `)
        .setTimestamp()
        )
        } else if (message.mentions.users.size == 1) {
            let asdf = await database.get(message.mentions.users.first().id);
            if (asdf) {
                message.channel.send(new MessageEmbed()
        .setTitle(message.mentions.users.first().username+"'s Balance")
        .setColor("BLUE")
        .setDescription(`
        Wallet: ${asdf.wallet}
        Bank: ${asdf.bank}
        `)
        .setTimestamp()
        )
            } else {
                message.channel.send("That person does not use this bot");
            }
        } else {
            message.channel.send("You can only check 1 person's balance each time");
        }
    }
    if(command == "deposit" || command == "dep") {
        if(parseInt(args[1]) > data.wallet) {
            message.channel.send("You don't have that much money in your wallet");
        } else if (parseInt(args[1]) < 0) {
            message.channel.send("The number has to be greater than 0");
        } else if (args[1] == "all") {
            message.channel.send(`${message.author.username} deposited ${data.wallet}`);
            database.set(message.author.id, {
                wallet: data.wallet - data.wallet,
                bank: data.bank + data.wallet
            });
        } else if(parseInt(args[1]) > 0) {
            message.channel.send(`${message.author.username} deposited ${args[1]}`);
            database.set(message.author.id, {
                wallet: data.wallet - parseInt(args[1]),
                bank: data.bank + parseInt(args[1])
            })
        }
    }
    if(command == "withdraw" || command == "with") {
        if(parseInt(args[1]) > data.bank) {
            message.channel.send("You don't have that much money in your bank");
        } else if (parseInt(args[1]) < 0) {
            message.channel.send("The number has to be greater than 0");
        } else if (args[1] == "all") {
            message.channel.send(`${message.author.username} withdrew ${data.bank}`);
            database.set(message.author.id, {
                wallet: data.wallet + data.bank,
                bank: 0
            })
        } else if (parseInt(args[1]) > 0) {
            database.set(message.author.id, {
                wallet: data.wallet + parseInt(args[1]),
                bank: data.bank - parseInt(args[1])
            })
            message.channel.send(`${message.author.username} withdrew ${args[1]}`);
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
            **-odd <quantity>** or **-even <quantity>** to gamble on odd/even
        `)
        .setColor("BLUE"))
    }
    if(command == "rock" || command == "scissor" || command == "paper") {
        if (data.wallet == 0) {
            message.channel.send("You can't gamble if you don't have money");
        } else {
            if (!parseInt(args[1]) && args[1] != "all") {
                message.channel.send("Please write down your bet");
            } else {
                if (parseInt(args[1])) {
                    if (parseInt(args[1]) <= 0) {
                        message.channel.send("The bet has to be at least 1")
                    } else if (parseInt(args[1]) > data.wallet) {
                        message.channel.send("You don't have that much money in your wallet");
                    } else {
                        const rsp = ["rock", "paper", "scissor"];
                        const chosen = rsp[Math.floor(Math.random() * 3)]
                        if (command === chosen) {
                            message.channel.send(new MessageEmbed().setColor("YELLOW").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
        
                            Tie!
        
                            You got your ${parseInt(args[1])} back
                            `));
                        } else {
                            if (command == "rock") {
                                if (chosen == "paper") {
                                    message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                You did: ${command}
                                I did: ${chosen}
            
                                You Lost!
            
                                You lost your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet - parseInt(args[1]),
                                    bank: data.bank
                                });
                                } else {
                                    message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                You did: ${command}
                                I did: ${chosen}
            
                                You Won!
            
                                You doubled your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet + parseInt(args[1]),
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
            
                                You lost your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet - parseInt(args[1]),
                                    bank: data.bank
                                });
                                } else {
                                    message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                You did: ${command}
                                I did: ${chosen}
            
                                You Won!
            
                                You doubled your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet + parseInt(args[1]),
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
            
                                You lost your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet - parseInt(args[1]),
                                    bank: data.bank
                                });
                                } else {
                                    message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                                You did: ${command}
                                I did: ${chosen}
            
                                You Won!
            
                                You doubled your ${parseInt(args[1])}
                                `));
                                database.set(message.author.id, {
                                    wallet: data.wallet + parseInt(args[1]),
                                    bank: data.bank
                                });
                                }
                            }
                        }
                    }
                } else if (args[1] == "all") {
                    const rsp = ["rock", "paper", "scissor"];
                    const chosen = rsp[Math.floor(Math.random() * 3)]
                    if (command === chosen) {
                        message.channel.send(new MessageEmbed().setColor("YELLOW").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                        You did: ${command}
                        I did: ${chosen}
    
                        Tie!
    
                        Nothing changes
                        `));
                    } else {
                        if (command == "rock") {
                            if (chosen == "paper") {
                                message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
        
                            You Lost!
        
                            You lost all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: 0,
                                bank: data.bank
                            });
                            } else {
                                message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
        
                            You Won!
        
                            You doubled all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: data.wallet * 2,
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
        
                            You lost all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: 0,
                                bank: data.bank
                            });
                            } else {
                                message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
        
                            You Won!
        
                            You doubled all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: data.wallet * 2,
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
        
                            You lost all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: 0,
                                bank: data.bank
                            });
                            } else {
                                message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
                            You did: ${command}
                            I did: ${chosen}
        
                            You Won!
        
                            You doubled all your money!
                            `));
                            database.set(message.author.id, {
                                wallet: data.wallet * 2,
                                bank: data.bank
                            });
                            }
                        }
                    }
                }
            }
        }
    }
    if (command == "odd" || command == "even") {
        if (data.wallet == 0) {
            message.channel.send("You can't gamble without any money");
        } else {
            const randomInt = Math.ceil(Math.random()*10);
        if (args[1]) {
            if (args[1] == "all" || parseInt(args[1])) {
                if (command == "even") {
                    if (randomInt % 2 == 0) {
                        if (parseInt(args[1])) {
                            database.set(message.author.id, {
                                wallet: data.wallet + parseInt(args[1]),
                                bank: data.bank
                            })
                            message.channel.send(new MessageEmbed()
                        .setTitle(`${message.author.username}'s odd/even game result:`)
                        .setDescription(`

                        **${randomInt}**

                        The number was even!
                        You doubled your ${args[1]}
                        `))
                        } else if (args[1] == "all") {
                            database.set(message.author.id, {
                                wallet: data.wallet * 2,
                                bank: data.bank
                            })
                            message.channel.send(new MessageEmbed()
                        .setTitle(`${message.author.username}'s odd/even game result:`)
                        .setDescription(`

                        **${randomInt}**

                        The number was even!
                        You doubled your money!
                        `))
                        }
                    } else {
                        if (parseInt(args[1])) {
                            database.set(message.author.id, {
                                wallet: data.wallet - parseInt(args[1]),
                                bank: data.bank
                            })
                            message.channel.send(new MessageEmbed()
                        .setTitle(`${message.author.username}'s odd/even game result:`)
                        .setDescription(`

                        **${randomInt}**

                        The number was odd!
                        You lost your ${args[1]}
                        `))
                        } else if (args[1] == "all") {
                            database.set(message.author.id, {
                                wallet: 0,
                                bank: data.bank
                            })
                            message.channel.send(new MessageEmbed()
                        .setTitle(`${message.author.username}'s odd/even game result:`)
                        .setDescription(`

                        **${randomInt}**

                        The number was odd!
                        You lost all your money!
                        `))
                        }
                    }
                } else {
                    if (command == "odd") {
                        if (randomInt % 2 != 0) {
                            if (parseInt(args[1])) {
                                database.set(message.author.id, {
                                    wallet: data.wallet + parseInt(args[1]),
                                    bank: data.bank
                                })
                                message.channel.send(new MessageEmbed()
                            .setTitle(`${message.author.username}'s odd/even game result:`)
                            .setDescription(`
    
                            **${randomInt}**
    
                            The number was odd!
                            You doubled your ${args[1]}
                            `))
                            } else if (args[1] == "all") {
                                database.set(message.author.id, {
                                    wallet: data.wallet*2,
                                    bank: data.bank
                                })
                                message.channel.send(new MessageEmbed()
                            .setTitle(`${message.author.username}'s odd/even game result:`)
                            .setDescription(`
    
                            **${randomInt}**
    
                            The number was odd!
                            You doubled all your money
                            `))
                            }
                        } else {
                            if (parseInt(args[1])) {
                                database.set(message.author.id, {
                                    wallet: data.wallet - parseInt(args[1]),
                                    bank: data.bank
                                })
                                message.channel.send(new MessageEmbed()
                            .setTitle(`${message.author.username}'s odd/even game result:`)
                            .setDescription(`
    
                            **${randomInt}**
    
                            The number was even!
                            You lost your ${args[1]}
                            `))
                            } else if (args[1] == "all") {
                                database.set(message.author.id, {
                                    wallet: 0,
                                    bank: data.bank
                                })
                                message.channel.send(new MessageEmbed()
                            .setTitle(`${message.author.username}'s odd/even game result:`)
                            .setDescription(`
    
                            **${randomInt}**
    
                            The number was even!
                            You lost all your money
                            `))
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
    }
    if (command == "asdf") {
        let jin = await database.get(message.mentions.users.first().id)
        dbService.doc(`User Data/${message.mentions.users.first().id}`).set({
            wallet: jin.wallet,
            bank: jin.bank
        })
    }
    if (command == "give") {
        let jin = await database.get(message.mentions.users.first().id)
        if (jin != client.user.id || jin != message.author.id) {
            if (data.wallet != 0) {
                if (message.mentions.users.size == 1) {
                    if (parseInt(args[2])) {
                        if (parseInt(args[2]) > data.wallet) {
                            message.channel.send("You don't have enough money");
                        } else {
                            database.set(message.author.id, {
                                wallet: data.wallet - parseInt(args[2]),
                                bank: data.bank
                            });
                            database.set(message.mentions.users.first().id, {
                                wallet: jin.wallet + parseInt(args[2]), 
                                bank: jin.bank
                            });
                            message.channel.send(`${message.author.username} gave ${args[2]} to ${message.mentions.users.first().username}`);
                        }
                    } else if (args[2] == "all") {
                        database.set(message.mentions.users.first().id, {
                            wallet: jin.wallet + data.wallet,
                            bank: jin.bank
                        })
                        database.set(message.author.id, {
                            wallet: 0,
                            bank: data.bank
                        })
                        message.channel.send(`${message.author.username} gave all his money to ${message.mentions.users.first().username}`)
                    } else {
                        message.channel.send("You need to specify the amount");
                    }
                } else if (message.mentions.users.size == 0) {
                    message.channel.send("Please specify who you are giving the money to");
                } else {
                    message.channel.send("You can only give money to one person at a time");
                }
            } else {
                message.channel.send("You can't give money when you don't have any");
            }
        } else if (jin == message.author.id) {
            message.channel.send("Why are you trying to give coins to yourself?");
        } else if (jin == client.user.id) {
            message.channel.send("I don't need your dirty money")
        } else {
            message.channel.send("That user does not use this bot")
        }
    }
    }
    dbService.doc(`User Data/${message.author.id}`).set({
        wallet: data.wallet,
        bank: data.bank
    })
});

client.login(process.env.THING_THING);
