const Discord = require("discord.js");
module.exports = (bot, member) => {

  let messages = [`❌ Sorry to see you leave us **${member.displayName}**!`];

  let result = Math.floor((Math.random() * messages.length));

  const embed = new Discord.RichEmbed()
  .setDescription(messages[result])
  .setColor("#ff1919")

  member.guild.channels.find("name", "welcome").send(embed).catch(console.error);
};
