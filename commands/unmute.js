const Discord = require('discord.js');
let logchannels = require("../logchannels.json");
let config = require("../config.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
    return errors.noPerm(message);
  let user = message.mentions.users.first();
  let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) return message.channel.send("There is no mod-log channel.");
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to unmute them.').catch(console.error);
  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .addField("Action:", `Unmute`, true)
  .addField("User:", `<@${user.id}>`, true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
  .setTimestamp();

  if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (!message.guild.member(user).roles.has(muteRole.id)) return message.reply("User is already unmuted.");

  message.guild.member(user).removeRole(muteRole);
  message.channel.send(user + " has been unmuted.")
  modlog.send(embed).catch(console.error);
};

module.exports.help = {
  name: "unmute",
  description: "Allows you to unmute a user in the server.",
  usage: "unmute [user]"
};
