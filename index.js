import { Client, MessageEmbed } from "discord.js";
const client = new Client();
import { config } from "dotenv";
config();
import jsoning from "jsoning";
import dbService from "./fb.js";
import MessageButton from 'discord-buttons';

const database1 = new jsoning("channel.json");
const work = new Set();
const tips = new Set();
const ban = new Set();

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
	let meme = await dbService.doc(`User Data/${message.author.id}`).get();
	if ((await dbService.doc(`User Data/${message.author.id}`).get()).exists == false) {
		dbService.doc(`User Data/${message.author.id}`).set({
			wallet: 100,
			bank: 0
		})
	}
	let prefixes = await database1.get(message.channel.id);
	if (!prefixes) {
		database1.set(message.channel.id, "-");
	}
	if (message.author.id != client.user.id && message.content.startsWith(prefixes) == true) {
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
					message.channel.send(new MessageEmbed()
						.setTitle(`${message.author.username}'s work result`)
						.setDescription(`
                            You worked and got ${salary}
                            `)
                            .setColor("GREEN")
                            .setTimestamp());
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
							message.channel.send(new MessageEmbed()
								.setTitle(`${message.author.username}'s tips`)
								.setDescription(`
                            You collected your tips and got ${salary}
                            `)
                            .setColor("GREEN")
                            .setTimestamp());
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
                        message.channel.send(new MessageEmbed()
                .setTitle(message.author.username+"'s Balance")
                .setColor("BLUE")
								.setDescription(`
								Wallet: ${meme.data().wallet}
								Bank: ${meme.data().bank}
								`)
                .setTimestamp()
                )
                } else if (message.mentions.users.size == 1) {
                    const asdf = (await dbService.doc(`User Data/${message.mentions.users.first().id}`).get()).data()
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
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet - parseInt(args[1]),
                                            bank: meme.data().bank
                                        });
                                        } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled your ${parseInt(args[1])}
												`));
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet + parseInt(args[1]),
                                            bank: meme.data().bank
                                        });
                                        }
                                    }
                                    if (command == "paper") {
                                        if (chosen == "scissor") {
												message.channel.send(new MessageEmbed().setColor("RED").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Lost!d
												
												You lost your ${parseInt(args[1])}
												`));
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet - parseInt(args[1]),
                                            bank: meme.data().bank
                                        });
                                        } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled your ${parseInt(args[1])}
												`));
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet + parseInt(args[1]),
                                            bank: meme.data().bank
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
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet - parseInt(args[1]),
                                            bank: meme.data().bank
                                        });
                                        } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled your ${parseInt(args[1])}
												`));
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
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: 0,
                                        bank: meme.data().bank
                                    });
                                    } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled all your money!
												`));
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet * 2,
                                        bank: meme.data().bank
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
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: 0,
                                        bank: meme.data().bank
                                    });
                                    } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled all your money!
												`));
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet * 2,
                                        bank: meme.data().bank
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
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: 0,
                                        bank: meme.data().bank
                                    });
                                    } else {
												message.channel.send(new MessageEmbed().setColor("GREEN").setTitle(`${message.author.username}'s rock scissor paper game results`).setDescription(`
												You did: ${command}
												I did: ${chosen}
												
												You Won!
												
												You doubled all your money!
												`));
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
                                    message.channel.send(new MessageEmbed()
												.setTitle(`${message.author.username}'s odd/even game result:`)
													.setDescription(`
        
                                **${randomInt}**
        
                                The number was even!
                                You doubled your ${args[1]}
                                `))
                                } else if (args[1] == "all") {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet * 2,
                                        bank: meme.data().bank
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
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: meme.data().wallet - parseInt(args[1]),
                                        bank: meme.data().bank
                                    })
                                    message.channel.send(new MessageEmbed()
														.setTitle(`${message.author.username}'s odd/even game result:`)
															.setDescription(`
        
                                **${randomInt}**
        
                                The number was odd!
                                You lost your ${args[1]}
                                `))
                                } else if (args[1] == "all") {
                                    dbService.doc(`User Data/${message.author.id}`).set({
                                        wallet: 0,
                                        bank: meme.data().bank
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
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet + parseInt(args[1]),
                                            bank: meme.data().bank
                                        })
                                        message.channel.send(new MessageEmbed()
																.setTitle(`${message.author.username}'s odd/even game result:`)
																	.setDescription(`
            
                                    **${randomInt}**
            
                                    The number was odd!
                                    You doubled your ${args[1]}
                                    `))
                                    } else if (args[1] == "all") {
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet*2,
                                            bank: meme.data().bank
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
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: meme.data().wallet - parseInt(args[1]),
                                            bank: meme.data().bank
                                        })
                                        message.channel.send(new MessageEmbed()
																		.setTitle(`${message.author.username}'s odd/even game result:`)
																			.setDescription(`
            
                                    **${randomInt}**
            
                                    The number was even!
                                    You lost your ${args[1]}
                                    `))
                                    } else if (args[1] == "all") {
                                        dbService.doc(`User Data/${message.author.id}`).set({
                                            wallet: 0,
                                            bank: meme.data().bank
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
            } else if (command == "rr") {
                message.reply("This command has not been created yet");
                const asdf = new MessageButton().setLabel("asdf").setStyle("red").setID("asdf");
                message.reply(asdf)
            } else {
                message.channel.send("That is not a command")
            }
        } else {
            const asdf = message.mentions.users.first().id;
            if ((await dbService.doc("User Data/" + asdf).get()).exists == true) {
                dbService.doc("User Data/" + asdf).get().then((doc) => {
                    if (command == "bal" || command == "balance") {
                        message.channel.send(new MessageEmbed()
																				.setTitle(`${message.mentions.users.first().username}'s Balance`)
																					.setDescription(`
                        Wallet: ${doc.data().wallet}
                        Bank: ${doc.data().bank}
                        `)
                        .setTimestamp()
                        .setColor("BLUE"))
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
                message.reply("Sorry that user doesn't use this bot.");
            }
            }
        }});

client.login(process.env.ANDREW);