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
                        sid64: obj.players[0][extMemID].sid64
                    }
                } else {
                    obj.players.push({
                        [extMemID]: {
                            status: "❌",
                            sid64: "n/a"
                        }
                    })
                }
                console.log(obj)
                json = JSON.stringify(obj);
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                fs.writeFile('players.json', json, 'utf8', function () {
                    message.channel.guild.channels.find("name", "players-json-logs").send(dateTime, { files: ["players.json"] })
                })
                message.guild.members.get(extMemID).send("We're sorry to inform you that you have been denied entry into the Fresh Fraggers Cup. This decision may be overturned by an Admin, in which case you will receive an acceptance message. For more information on this denial, please ask in our <#576533066131046406> channel or message an Admin.")
                if (message.guild.members.get(extMemID).roles.has(message.guild.roles.find('name', 'Players'))) {
                    message.guild.members.get(extMemID).removeRole(message.guild.roles.find('name', 'Players'))
                }
                message.react("❌")

            }
        });
    } else {
        message.channel.send(`Error: You need to mention the player's Discord in this space (e.g. ${config.prefix} deny ${message.author})`)
    }
};