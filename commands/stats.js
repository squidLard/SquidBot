const Discord = require("discord.js");
let config = require("../config.json");
const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let score = bot.getScore.get(target.id, message.guild.id);
    let nxtlvlxp = score.level * 300;
    let curxp = score.points;
    let difference = nxtlvlxp - curxp;
    let curlvl = score.level;
    let viplvl = 25;
    let vippluslvl = 50;
    let mvplvl = 75;
    let mvppluslvl = 100;
    let diff;
    let channel = logchannels[message.guild.id].botchannel;

    if (message.channel.id == channel) {

        message.delete(4000);

        let embed = new Discord.RichEmbed()
        .setAuthor(target.username, target.displayAvatarURL)
        .setColor(config.blue)
        .addField("Level:", `${score.level}`, true)
        .addField("XP:", `${score.points}`, true)
        .setFooter(`Next Level: ${difference} xp needed.`, "https://images-ext-1.discordapp.net/external/HlUw82PrzL4Z-maNunvlyJyxtCvZ_6_bokb-HDl5ZiI/%3Fcb%3D20120820190914%26path-prefix%3Den/https/vignette.wikia.nocookie.net/nintendo/images/e/e3/1_Up_Mushroom_Icon.png/revision/latest");

        if (score.level < 25) {
            diff = viplvl - score.level;
            embed.addField("Next Rank: ", `${diff} levels needed to get VIP.`)
        } else if (score.level < 50) {
            diff = vippluslvl - score.level;
            embed.addField("Next Rank: ", `${diff} levels needed to get VIP+.`)            
        } else if (score.level < 75) {
            diff = mvplvl - score.level;
            embed.addField("Next Rank: ", `${diff} levels needed to get MVP.`)  
        } else if (score.level < 100) {
            diff = mvppluslvl - score.level;
            embed.addField("Next Rank: ", `${diff} levels needed to get MVP+.`)  
        } else {
            embed.addField("Next Rank: ", "You are currently the max Rank.")
        }

         message.channel.send(embed);
    } else {
        message.delete(4000);
        message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
    }
}

module.exports.help = {
name: "stats",
description: "Displays the level of a user.",
usage: "stats [user]"
}