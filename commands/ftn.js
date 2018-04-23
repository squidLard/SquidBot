const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const Fortnite = require('fortnite');
const stats = new Fortnite(config.fortniteapikey);

module.exports.run = async (client, message, args, tools) => {
  let platform;
  let username;
  let mode;

  if (!['pc','xbl','psn'].includes(args[0])){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please include a platform in your arguments.');
    message.channel.send(embed);
    return
  };
  if (!args[1]){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please include a username in your arguments.');
    message.channel.send(embed);
    return
  };

  platform = args.shift();
  username = args.join(' ');

  stats.getInfo(username, platform).then(data => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Fortnite Stats for ${data.username}`)
    .setThumbnail("https://i.imgur.com/TNINlOT.png")
    .setColor(config.blue)
    .addField('Wins:', data.lifetimeStats[8].value)
    .addField('K/D:', data.lifetimeStats[11].value)
    .addField('Solo K/D:', `${data.stats.p2.kd.value}`, true)
    .addField('Kills:', `${data.lifetimeStats[10].value}`, true)
    .addField('Duo K/D:', `${data.stats.p10.kd.value}`, true)
    .addField('Total Score:', data.lifetimeStats[6].value, true)
    .addField('Squad K/D:', `${data.stats.p9.kd.value}`, true)
    .addField('Win Percentage:', data.lifetimeStats[9].value, true)
    .addField('Matches Played:', data.lifetimeStats[7].value, true)
    .addField('Time Played:', data.lifetimeStats[13].value, true)
    message.channel.send(embed);
    return
  })

  .catch(error => {
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This username was not found.');
    message.channel.send(embed);
    return
  });
};

module.exports.help = {
  name: 'ftn',
  description: 'Displays stats for a user on the game Fortnite.',
  usage: 'fortnite [pc | xbl | psn] [username]'
};
