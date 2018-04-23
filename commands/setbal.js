const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  message.delete(5000);
  
  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
  return errors.noPerm(message);

  let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
  let score = bot.getScore.get(target.id, message.guild.id);
  let amount = args[1];
  
  if (!amount) {
    return errors.invalidAmt(message, "Please specify an amount.");
  }

  if (amount < 1) {
    return errors.invalidAmt(message, "Amount must be at least $1.");
  }

  if (isNaN(amount)) {
    return errors.invalidAmt(message, "Amount must be a number.");
  }

  if (!target) {
    return errors.cantFinduser(message, "Please specify a player.")
  }

  let bal = parseInt(args[1]);

  let embed = new Discord.RichEmbed()
  .setColor("#0c60a0")
  .setDescription(`✅ Set **${target.username}\'s** balance to ${args[1]}`);

  message.channel.send(embed).then(msg => {msg.delete(5000)});

  sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${target.id}
    , ${target.id}
    , ${message.guild.id}
    , ${score.points}
    , ${score.level}
    , ${bal});`).run();

};

module.exports.help = {
  name: "setbal",
  description: "Sets the balance of a user.",
  usage: "setbal [user] [amount]"
};