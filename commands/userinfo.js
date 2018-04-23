const Discord = require('discord.js');
const config = require('../config.json');
let errors = require("../util/erorrs.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
  return errors.noPerm(message);
  let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
  if (!target) return errors.invalidUser(message);
  message.delete(5000);

  let kickable = message.guild.member(target).kickable ? "✅" : "❌";
  let bannable = message.guild.member(target).bannable ? "✅" : "❌";

  let msg = new Discord.RichEmbed()
    .setColor(config.green)
    .setDescription("A private message has been sent.");

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${target.username}`)
  .setColor(config.green)
  .setThumbnail(target.displayAvatarURL)
  .addField('Username', target.username + "#" +target.discriminator, true)
  .addField('User ID', target.id, true)
  .addField('Status', target.presence.status, true)
  .addField('Account Created at:', target.createdAt)
  .addField('Bannable', bannable, true)
  .addField('Kickable', kickable, true);
  message.author.send(embed);
  message.channel.send(msg).then(msg => {msg.delete(5000)});
  return
};

module.exports.help = {
  name: 'userinfo',
  description: 'Displays information about the user.',
  usage: 'userinfo [@user]'
}