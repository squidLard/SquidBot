const Discord = require("discord.js");
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {

  let channel = logchannels[message.guild.id].botchannel;

    if (message.channel.id == channel) {
        message.delete();

  var result = Math.floor((Math.random() * 100) + 1);

  const embed = new Discord.RichEmbed()
  .setDescription("You rolled a " + result + "!")
  .setColor("338aff")

  message.channel.send(embed);
    } else {
      message.delete(4000);
      message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
    }
};

module.exports.help = {
  name: "roll",
  description: "Rolls a number 1 - 100",
  usage: "roll"
};
