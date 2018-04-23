const Discord = require("discord.js");
let config = require("../config.json");
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
module.exports.run = async (bot, message, args) => {
    message.delete();
    let user;

    if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) ) {
        user = message.author;
    } else {
        user = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    }

    let score = bot.getScore.get(user.id, message.guild.id);

    let embed = new Discord.RichEmbed()
    .setColor(config.green)
    .setDescription("A private message has been sent.");

    let bal = new Discord.RichEmbed()
    .setColor(config.green)
    .setAuthor(`${user.username}\'s Balance:`)
    .setDescription(`${user.username} currently has $${score.bal}`);

    message.author.send(bal);

    message.channel.send(embed).then(msg => {msg.delete(10000)});

}

module.exports.help = {
 name: "bal",
 description: "Displays a users balance.",
 usage: "ball [user]"
}