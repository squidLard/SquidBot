const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

  if (message.author.id !== `${config.ownerID}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`An error has occurred!`)
    .setColor(config.red)
    .setDescription(`Only <@${config.ownerID}> can terminate the instance.`)
    message.channel.send(embed);
  }

  if (message.author.id == `${config.ownerID}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`It's time for ${bot.user.username} to go!!!`)
    .setColor(config.red)
    .setDescription('Leaving Guild...')
    message.channel.send(embed);

    message.guild.leave();
    return
  }
}

module.exports.help = {
  name: 'terminate',
  description: 'Will make the bot leave the guild and terminate it\'s instance.',
  usage: 'terminate'
}