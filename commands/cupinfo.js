module.exports.run = (bot, message, args, config) => {
    const Discord = require("discord.js")
    const steam = require('steamidconvert')(process.env.STEAM_TOKEN);
    const SteamID = require('steamid');
    const fs = require('fs')
    const request = require('request');
    const jp = require('jsonpath');


    if (message.guild.member(message.member.id).hasPermission("MANAGE_ROLES")) {
        fs.readFile('players.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                var accepted = Object.keys(jp.query(obj, `$..players[?(@.status== "✅")]`)).length
                var total = obj.players.length
                var membercount = message.channel.guild.memberCount

                let info = new Discord.RichEmbed()
                    .setTitle("Fresh Fraggers Cup")
                    .setDescription(`Current info on the Fresh Fraggers Cup`)
                    .setColor("#F95454")
                    .addField("Total", total, true)
                    .addField("Accepted", accepted, true)
                    .addField("Member Count", membercount, true)

                message.channel.send(info);

            }


        });
    }
    else {
        message.reply("you don't have permission, sorry!")
    }
};