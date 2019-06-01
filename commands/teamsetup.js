const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client();
const Enmap = require("enmap");

module.exports.run = (client, message, args) => {
    if (message.guild.member(message.member.id).hasPermission("ADMINISTRATOR")) {
        var ffc = message.channel.guild;

        ffc.createRole({
            name: `${args.join(" ")}`,
        }).then(newRole => {
            permissions = [{
                id: newRole.id,
                allow: 509952
            }]

            ffc.createChannel(`${args.join(" ")}`, {
                type: 'category',
                permissionOverwrites: permissions
            })
                .then(

                    ffc.createChannel("discussion", "text")
                        .then(channel => {
                            channel.setParent(ffc.channels.find('name', args.join(" ")));

                            ffc.createChannel("Voice", "voice")
                                .then(channel => {
                                    channel.setParent(ffc.channels.find('name', args.join(" ")));
                                })

                        })

                )

        }



        )



    }
}