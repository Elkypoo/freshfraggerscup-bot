module.exports.run = (bot, message, args, config) => {
    const Discord = require("discord.js")
    const steam = require('steamidconvert')(process.env.STEAM_TOKEN);
    const SteamID = require('steamid');
    const fs = require('fs')
    const request = require('request');
    const jp = require('jsonpath');


    if (args[0] && message.mentions.members.first()) {
        var extMemID = message.mentions.members.first().id
        fs.readFile('players.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                console.log(`Query if player already signed up: ${(jp.query(obj.players, `$..${extMemID}`)).length}`)
                if ((jp.query(obj.players, `$..${extMemID}`)).length !== 0) {
                    obj.players[0][extMemID] = {
                        status: "❌",
                        sid64: sid64
                    }
                } else {
                    obj.players.push({
                        [extMemID]: {
                            status: "❌",
                            sid64: sid64
                        }
                    })
                }
                console.log(obj)
                json = JSON.stringify(obj);
                fs.writeFile('players.json', json, 'utf8');
                client.users.get(extMemID).send("We're sorry to inform you that you have been denied entry into the Fresh Fraggers Cup. This decision may be overturned by an Admin, in which case you will receive an acceptance message. For more information on this denial, please ask in our <#576533066131046406> channel or message an Admin.")
                if (client.users.get(extMemID).roles.has(message.guild.roles.find('name', 'Players'))) {
                    client.users.get(extMemID).removeRole(message.guild.roles.find('name', 'Players'))
                }
                message.react("❌")

            }
        });
    } else {
        message.channel.send(`Error: You need to mention the player's Discord in this space (e.g. ${config.prefix}deny ${message.author})`)
    }
};