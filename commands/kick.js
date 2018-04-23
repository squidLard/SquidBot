const Discord = require('discord.js');
let logchannels = require("../logchannels.json");
let config = require("../config.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
  return errors.noPerm(message);

  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) return message.channel.send("There is no mod-log channel.");
  let member = message.mentions.members.first();
  let user = message.mentions.users.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.kickable)
    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    if (!modlog) return message.channel.send("There is no mod-log channel.");

  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the kick!");

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .addField("Action:", `Kick`, true)
    .addField("User:", `<@${user.id}>`, true)
    .addField("Reason:", `${reason}`, true)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp();

  await member.kick(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send(user + " has been kicked.")
    modlog.send({embed}).catch(console.error);
};

module.exports.help = {
  name: "kick",
  description: "Allows you to kick a user from the server.",
  usage: "kick [user] [reason]"
};
