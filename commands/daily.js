const db = require("quick.db");
const ms = require("parse-ms")
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {
  let cooldown = 8.64e+7;
  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
  let score = bot.getScore.get(message.author.id, message.guild.id);
  let channel = logchannels[message.guild.id].botchannel;

  if (message.channel.id == channel) {
    message.delete(4000);

    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastDaily));

      message.channel.send(`You already collected this, please wait **${timeObj.hours}h ${timeObj.minutes}m**!`).then(msg => {msg.delete(5000)});
    } else {
      let newbal = score.bal + 25;

      sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
        , ${message.author.id}
        , ${message.guild.id}
        , ${score.points}
        , ${score.level}
        , ${newbal});`).run();
      message.channel.send("You have been given $25 for the day!");
      db.set(`lastDaily_${message.author.id}`, Date.now());
    }
  } else {
    message.delete(4000);
    message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
  }
};

module.exports.help = {
  name: "daily",
  description: "Gives you $25 daily.",
  usage: "daily"
}
