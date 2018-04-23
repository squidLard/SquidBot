const Discord = require('discord.js');
let config = require("../config.json");
let logchannels = require("../logchannels.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
  return errors.noPerm(message);
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let muterole = bot.guilds.get(message.guild.id).roles.find('name', 'muted');
  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) return message.channel.send("There is no mod-log channel.");
  if (!muterole) return message.reply('I cannot find a mute role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .addField("Action:", `Mute`, true)
  .addField("User:", `<@${user.id}>`, true)
  .addField("Reason:", `${reason}`, true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
  .setTimestamp();

  if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muterole.id)) return message.reply("User is already muted.");

  message.guild.member(user).addRole(muterole);
  message.channel.send(user + " has been muted.");
  modlog.send(embed).catch(console.error);
};

module.exports.help = {
  name: "mute",
  description: "Allows you to mute a user in the server.",
  usage: "mute [user] [reason]"
};
