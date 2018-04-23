const Discord = require('discord.js');
const config = require('../config.json');
let errors = require("../util/erorrs.js");

module.exports.run = async (bot, message, args) => {
  if (args == 0) return errors.invalidPoll(message);

  let embed = new Discord.RichEmbed()
  .setTitle(`Poll by ${message.author.username}`)
  .setColor(config.blue)
  .setDescription(`${args}`.split(',').join(' '));

  return message.channel.send(embed).then(message.delete())

  .then(function (message, str) {
       message.react("👍")
       message.react("👎")
     }).catch(function() {
  });
};

module.exports.help = {
  name: 'poll',
  description: 'Make a poll with a question with thumbs up and down reactions.',
  usage: 'poll [question]'
};