module.exports.run = (bot, message, args, config) => {
    const Discord = require("discord.js")
    const steam = require('steamidconvert')(process.env.STEAM_TOKEN);
    const SteamID = require('steamid');
    const fs = require('fs')
    const request = require('request');
    const jp = require('jsonpath');


        if (args[0] && message.mentions.members.first()) {

                    fs.readFile('players.json', 'utf8', function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            obj = JSON.parse(data);
                            console.log(`Query if player already signed up: ${(jp.query(obj.players, `$..${extMemID}`)).length}`)
                            if ((jp.query(obj.players, `$..${extMemID}`)).length !== 0) {
                                obj.players[0][extMemID] = {
                                    status: "✅",
                                    sid64: sid64
                                }
                            } else {
                                obj.players.push({
                                    [extMemID]: {
                                        status: "✅",
                                        sid64: sid64
                                    }
                                })
                            }
                                console.log(obj)
                                json = JSON.stringify(obj);
                                fs.writeFile('players.json', json, 'utf8');
                                extMemID.send("You have been accepted into the Fresh Fraggers Cup! You are now allowed to create a team. Once you have all the players you want (from your regional looking-for channels or elsewhere), you can follow the instructions in <#584206605139050501> to create your team.")
                                extMemID.addRole(message.guild.roles.find('name', 'Players'))
                                message.react("✅")
                            
                        }
                    });
        } else {
            message.channel.send(`Error: You need to mention the player's Discord in this space (e.g. ${config.prefix}accept ${message.author})`)
        }
};