var Discord = require("discord.js")
const config = require("./config.json");
const fs = require("fs")
const client = new Discord.Client();
const Enmap = require("enmap");


var rolemsg;
var guildUser;

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  console.log("Ready to frag!");
  client.user.setPresence({ game: { name: 'with my code :p', type: 2 } });
  "181543685744361482".send("I have been restarted...")

  try {
    client.guilds.map((guild) => {
      guild.channels.find("name", "regional-roles").fetchMessage('581250083782262832').then((message) => {

        var rolemsg = message;

        rolemsg.react("🇺🇸")
        rolemsg.react("🇪🇺")
        rolemsg.react("🇦🇺")
      });
    });
  } catch (err) {
    console.log(err)
  }

})

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.id == "584196106137763872") {
    if (message.content.split(/ +/g)[0].indexOf("steamcommunity.com") != -1) {
      console.log(message.content.split(/ +/g)[0])
      message.author.send("Request received! You will receive a message on whether or not you have been accepted into the tournament. \n\nIf you have any questions, you can send them in <#576533066131046406>. We hope to see you accepted into the tournament!")
      guild.channels.find("name", "accept-deny").send(`$<@${message.author.id}> requests with Steam ${message.content.split(/ +/g)[0]}.\nUse \`\`\`<@${message.author.id}>\`\`\` when accepting or denying.`)
    }
  }
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
})

client.on('messageReactionAdd', (reaction, user) => {
  reaction.message.guild.fetchMember(user).then((guildUser => {
    if (user.bot) {
      return;
    }
    if (reaction.emoji.name === "🇺🇸") {
      guildUser.addRole(reaction.message.guild.roles.find('name', 'NA'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'EU'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'AU'))
    }
    if (reaction.emoji.name === "🇪🇺") {
      guildUser.addRole(reaction.message.guild.roles.find('name', 'EU'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'NA'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'AU'))
    }
    if (reaction.emoji.name === "🇦🇺") {
      guildUser.addRole(reaction.message.guild.roles.find('name', 'AU'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'NA'))
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'EU'))
    }
  })
  )
});

client.on('messageReactionRemove', (reaction, user) => {
  reaction.message.guild.fetchMember(user).then((guildUser => {
    if (user.bot) {
      return;
    }
    if (reaction.emoji.name === "🇺🇸") {
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'NA'))
    }
    if (reaction.emoji.name === "🇪🇺") {
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'EU'))
    }
    if (reaction.emoji.name === "🇦🇺") {
      guildUser.removeRole(reaction.message.guild.roles.find('name', 'AU'))
    }
  })
  )
});



client.login(process.env.BOT_TOKEN);