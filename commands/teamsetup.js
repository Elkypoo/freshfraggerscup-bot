const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client();
const Enmap = require("enmap");

module.exports.run = (client, message, args) => {
    if (message.guild.member(message.member.id).hasPermission("ADMINISTRATOR")) {
        var ffc = message.channel.guild;

        ffc.createRole({
            name: `${args.join(" ")}`,
        }).then(

            ffc.createChannel(`${args.join(" ")}`, {
                type: 'category',
                permissionOverwrites: [{
                    id: ffc.roles.find('name',`${args.join(" ")}`),
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL']
                }]
            })
                /*.then(

                    ffc.createChannel("discussion", "text")
                        .then(channel => {
                            let category = ffc.channels.find(c => c.name == `${args.join(" ")}` && c.type == "category");

                            if (!category) throw new Error("Category channel does not exist");
                            channel.setParent(category.id);

                            ffc.createChannel("Voice", "voice")
                                .then(channel => {
                                    let category = ffc.channels.find(c => c.name == `${args.join(" ")}` && c.type == "category");

                                    if (!category) throw new Error("Category channel does not exist");
                                    channel.setParent(category.id);
                                })

                        })

                )*/

        )



    }
}