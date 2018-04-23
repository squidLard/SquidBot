const Discord = require("discord.js")
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let config = require("../config.json");
let logchannels = require("../logchannels.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  let newbal;
  let score = bot.getScore.get(message.author.id, message.guild.id);
  let result = Math.floor(Math.random() * 2) + 1;
  let sCoins = score.bal;
  let amount;
  let channel = logchannels[message.guild.id].botchannel;

  if (message.channel.id == channel) {
    message.delete(4000);

    if (args[0] == "all") {
      amount = score.bal;
    } else {
      amount = args[0];
    }

    if (sCoins < amount) {
      return errors.invalidAmt(message, `You do not have $${args[0]}.`);
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

    if (result == 1) {

      newbal = score.bal + parseInt(amount);

      let winembed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor(config.green)
      .setDescription(`💰 You have won $${amount}! 💰`);
      message.channel.send(winembed);
    } else if (result == 2) {

      newbal = score.bal - parseInt(amount);

      let loseembed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor(config.red)
      .setDescription(`😵 RIP. You have lost $${amount}!`);
      message.channel.send(loseembed);
    }

    if (result == 1 && score.bal == 100000000000000000000) {
      message.channel.send("You are at max balance so no money was added to your account!")
      return
    }

    sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
      , ${message.author.id}
      , ${message.guild.id}
      , ${score.points}
      , ${score.level}
      , ${newbal});`).run();
  } else {
    message.delete(4000);
    message.channel.send("This command can only be used in the bot channel.").then(msg => {msg.delete(5000)});
  }

};

module.exports.help = {
  name: "gamble",
  description: "Gamble your money to make a profit or lose it all.",
  usage: "gamble [amount]"
};
