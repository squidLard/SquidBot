const Discord = require('discord.js');
let config = require("../config.json");
let logchannels = require("../logchannels.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Administrator", "Owner"].includes(r.name))) {
    return errors.noPerm(message);
  }

  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) {
    return message.channel.send("There is no mod-log channel.");
  }

  let user = message.mentions.users.first();

  if(!user) {
    return message.reply("Please mention a valid member of this server");
  }

  if(!user.bannable) {
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  }

  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the ban!");

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .addField("Action:", `Ban`, true)
    .addField("User:", `<@${user.id}>`, true)
    .addField("Reason:", `${reason}`, true)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp();

    try {
      await member.send(`You have been banned from \`${message.guild.name}\`.\n**Reason**: ${reason}`);
    } catch (e) {
      message.channel.send("Could not send user a DM");
    }

  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(user + " has been banned.")
    modlog.send({embed}).catch(console.error);
};

module.exports.help = {
  name: "ban",
  description: "Bans a user from the server.",
  usage: "ban [user] [reason]"
};
