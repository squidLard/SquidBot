const Discord = require("discord.js");
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {
  var result = Math.floor((Math.random() * 2) + 1);

  let channel = logchannels[message.guild.id].botchannel;

  if (message.channel.id == channel) {
      message.delete(4000);

    if (result == 1) {

      const embed = new Discord.RichEmbed()
      .setDescription("The coin landed on heads!")
      .setColor("338aff")

      message.channel.send(embed);

    } else if (result == 2) {

      const embed = new Discord.RichEmbed()
      .setDescription("The coin landed on tails!")
      .setColor("338aff")

      message.channel.send(embed);
    }
} else {
    message.delete(4000);
    message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
}

};

module.exports.help = {
  name: "cf",
  description: "Flips a coin.",
  usage: "cf"
};
