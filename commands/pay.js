const Discord = require("discord.js")
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  message.delete(4000);
  let target = message.mentions.users.first() || message.guild.members.get(args[0]);

  if (!target) {
    return errors.cantFinduser(message, `Please specify a user.`);
  }

  let score = bot.getScore.get(message.author.id, message.guild.id);
  let score1 = bot.getScore.get(target.id, message.guild.id);

  let pCoins = score1.bal;
  let sCoins = score.bal;
  let amount = args[1];

  if (sCoins < amount) {
    return errors.invalidAmt(message, `You do not have $${amount}.`);
  }
  
  if (!amount) {
    return errors.invalidAmt(message, "Please specify an amount.");
  }

  if (amount < 1) {
    return errors.invalidAmt(message, "Amount must be at least $1.");
  }

  if (isNaN(amount)) {
    return errors.invalidAmt(message, "Amount must be a number.");
  }

  let senderbal = sCoins - parseInt(args[1]);

  let recieverbal = pCoins + parseInt(args[1]);

  let embed = new Discord.RichEmbed()
  .setColor("#0c60a0")
  .setDescription(`✅ You have given ${target.username} $${args[1]}.`);

  message.channel.send(embed);

  sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
    , ${message.author.id}
    , ${message.guild.id}
    , ${score.points}
    , ${score.level}
    , ${senderbal});`).run();
    
  sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${target.id}
    , ${target.id}
    , ${message.guild.id}
    , ${score1.points}
    , ${score1.level}
    , ${recieverbal});`).run();
};

module.exports.help = {
  name: "pay",
  description: "Pay another user some money.",
  usage: "pay [user] [amount]"
};
