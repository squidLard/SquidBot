const Discord = require('discord.js'); // this links to the official Discord npm package
const { version } = require('discord.js');
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (bot, message, args) => {
  var ms = bot.uptime,
  min = Math.floor((ms/1000/60) << 0),
  sec = Math.floor((ms/1000) % 60);
  message.delete(5000);

  let icon = bot.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${bot.user.username}`)
  .setColor(config.white)
  .setThumbnail(icon)
  .addField('Bot Name:', bot.user.username, true)
  .addField('Bot Uptime:', min + ' minutes ' + sec + ' seconds', true)
  .addField('Discord.js Version:', `v${version}`, true)
  .addField("Node Version", `${process.version}`, true)
  .addField('Total Number of Users:', bot.users.size, true)
  .addField('Total Number of Servers:', bot.guilds.size, true)
  .addField('Ping:', new Date().getTime() - message.createdTimestamp + " ms", true);

  message.author.send(embed);
  let channel = new Discord.RichEmbed()
  .setColor(config.green)
  .setDescription("A private message has been sent.");
  message.channel.send(channel).then(msg => {msg.delete(5000)});
};

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
};