const Discord = require("discord.js");
let config = require("../config.json");
module.exports.noPerm = (message) => {

    let embed = new Discord.RichEmbed()
    .setAuthor("ERROR", message.author.displayAvatarURL)
    .setColor(config.red)
    .setDescription("You do not have permission to run this command!");

    message.channel.send(embed).then(msg => {msg.delete(5000)});
}

module.exports.invalidAmt = (message, string) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("ERROR", message.author.displayAvatarURL)
    .setColor(config.red)
    .setDescription(string);

    message.channel.send(embed).then(msg => {msg.delete(5000)});
}

module.exports.cantFinduser = (message, string) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("ERROR", message.author.displayAvatarURL)
    .setColor(config.red)
    .setDescription(string);

    message.channel.send(embed).then(msg => {msg.delete(5000)});
}