const Discord = require("discord.js");
let logchannels = require("../logchannels.json");
module.exports.run = async (bot, message, args) => {
  let channel = logchannels[message.guild.id].botchannel;

  if (message.channel.id == channel) {
    message.delete();
    if (!args[2]) return message.reply("Please ask a full question!")
      let replies = ["Yes", "No", "I don't know", "Ask again later", "Maybe"];
      let result = Math.floor((Math.random() * replies.length));
      let question = args.slice(1).join(' ');

      const embed = new Discord.RichEmbed()
      .setDescription("@everyone The answer is, " + replies[result] + "!")
      .setColor("338aff")

      message.channel.send(embed);
    } else {
      message.delete(4000);
      message.channel.send("This command can only be used in the bot channel").then(msg => {msg.delete(5000)});
  }
}

module.exports.help = {
  name: "8ball",
  description: "Answers a question with yes, no, I don't know, Ask again later or mayber.",
  usage: "8ball [Question]"
}
