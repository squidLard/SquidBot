const Discord = require("discord.js")
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let config = require("../config.json");
let logchannels = require("../logchannels.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {

    let channel = logchannels[message.guild.id].botchannel;

    if (message.channel.id == channel) {
    message.delete();

    let chance = Math.floor(Math.random() * 2) + 1;
    let failamt = Math.floor(Math.random() * 10) + 1;
    let target = message.mentions.users.first() || message.guild.members.get(args[1]);

    if (!target) {
      return errors.cantFinduser(message, "Please specify a player.")
    }
    
    let score = bot.getScore.get(message.author.id, message.guild.id);
    let score1 = bot.getScore.get(target.id, message.guild.id);

    let senderbal = score.bal;
    let targetbal = score1.bal;
    let amount = args[1];

    if (targetbal < amount) {
      return errors.invalidAmt(message, `${target.username} does not have $${args[1]}`);  
    }

    if (!amount) {
      return errors.invalidAmt(message, "Please specify an amount.");
    }
    
    if (amount < 1) {
      return errors.invalidAmt(message, "Amount must be at least 1.");
    }
    
    if (isNaN(amount)) {
      return errors.invalidAmt(message, "Amount must be a number.");
    }

    if (chance == 1) {

        let robberbal = senderbal + parseInt(args[1]);
        let robbedbal = targetbal - parseInt(args[1]);

        sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
            , ${message.author.id}
            , ${message.guild.id}
            , ${score.points}
            , ${score.level}
            , ${robberbal});`).run();
            
          sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${target.id}
            , ${target.id}
            , ${message.guild.id}
            , ${score1.points}
            , ${score1.level}
            , ${robbedbal});`).run();

        let successembed = new Discord.RichEmbed()
        .setColor(config.green)
        .setDescription(`✅ You took $${args[1]} from **${target.username}**`);

        message.channel.send(successembed);
    } else if (chance == 2) {

        if (senderbal < failamt) {
            let bal = 0;
            sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
                , ${message.author.id}
                , ${message.guild.id}
                , ${score.points}
                , ${score.level}
                , ${bal});`).run();
        } else {
            let failedbal = senderbal - failamt;

            sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
                , ${message.author.id}
                , ${message.guild.id}
                , ${score.points}
                , ${score.level}
                , ${failedbal});`).run();
        }

        let dmembed = new Discord.RichEmbed()
        .setAuthor("Oh no!")
        .setColor(config.red)
        .setDescription(`Someone tried to rob you of $${args[1]}, but were caught by the admins!`);

        target.send(dmembed);

        let failembed = new Discord.RichEmbed()
        .setAuthor("Oh no!", message.author.displayAvatarURL)
        .setColor(config.red)
        .setDescription(`You were caught by the staff! They fined you $${failamt} for your crimes!`);

        message.channel.send(failembed);
    }
} else {
    message.delete(4000);
    message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
}



    
};

module.exports.help = {
  name: "rob",
  description: "Rob a user from some money, but if you are caught you'll be fined.",
  usage: "rob [user] [amount]"
};