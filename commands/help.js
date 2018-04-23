const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    const commandNames = Array.from(bot.commands.keys());
    message.delete();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.author.sendCode('asciidoc', `= Command List =\n\nUse ${config.prefix}help [command] for details\n\n${bot.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
    let embed = new Discord.RichEmbed()
    .setColor(config.green)
    .setDescription("A private message has been sent.");
    message.channel.send(embed).then(msg => {msg.delete(5000)});
  } else {
    let command = args[0];
    message.delete();
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      message.author.sendCode('asciidoc', `= ${command.help.name} = \nDescription:: ${command.help.description}\nUsage:: ${config.prefix}${command.help.usage}`);
      let embed = new Discord.RichEmbed()
      .setColor(config.green)
      .setDescription("A private message has been sent.");
      message.channel.send(embed).then(msg => {msg.delete(5000)});
    } else {
      message.channel.send("That command does not exist.").then(msg => {msg.delete(5000)});
    }
  }
};

module.exports.help = {
  name: 'help',
  description: 'Displays all commands.',
  usage: 'help [command]'
};