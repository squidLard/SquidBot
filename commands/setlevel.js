const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
  return errors.noPerm(message);

  let target = message.mentions.users.first() || message.guild.members.get(args[1]);
  message.delete(5000);
  let score = bot.getScore.get(target.id, message.guild.id);
  let level = parseInt(args[1]);

  if (!level) {
    return errors.invalidAmt(message, "Please specify a level.");
  }

  if (level < 1) {
    return errors.invalidAmt(message, "Level must be at least 1.");
  }

  if (isNaN(level)) {
    return errors.invalidAmt(message, "Level must be a number.");
  }

  if (!target) {
    return errors.cantFinduser(message, "Please specify a player.")
  }

  let xp = level * 300;

  let embed = new Discord.RichEmbed()
  .setColor("#0c60a0")
  .setDescription(`✅ Set **${target.username}\'s** level to ${args[1]}`);

  message.channel.send(embed).then(msg => {msg.delete(5000)});

  sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${target.id}
    , ${target.id}
    , ${message.guild.id}
    , ${xp}
    , ${level}
    , ${score.bal});`).run();

};

module.exports.help = {
  name: "setlevel",
  description: "Sets the level of a user.",
  usage: "setlevel [user] [amount]"
};