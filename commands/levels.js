const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {
  const results = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

  const sorted = results.sort((a, b) => a.points < b.points);

  const top10 = sorted.splice(0, 10);
  let channel = logchannels[message.guild.id].botchannel;

  let place = 1;

  if (message.channel.id == channel) {
    message.delete(4000);
    const embed = new Discord.RichEmbed()
    .setTitle("Top 10 Leaderboard")
    .setColor(0x00AE86);
    for(data of top10) {
       embed.addField(`#${place++} ` + bot.users.get(data.user).username, `**XP:** \`${data.points}\` | **LVL:** \`${data.level}\``);
     }
     return message.channel.send({embed});
    } else {
      message.delete(4000);
      message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
    }
};

module.exports.help = {
  name: "levels",
  description: "Displays the top 10 users in the server.",
  usage: "levels" 
}