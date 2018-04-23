const Discord = require("discord.js");
module.exports = (client, member) => {

  let messages = [`**${member.displayName}**, Welcome to **${member.guild.name}**! Enjoy your stay!`, `**${member.displayName}**, Welcome to **${member.guild.name}**! Have a great day!`, `Welcome **${member.displayName}** Everyone say hello!`];

  let result = Math.floor((Math.random() * messages.length));

  const embed = new Discord.RichEmbed()
  .setDescription(messages[result])
  .setColor("#26af3b")
  
  let role = client.guilds.get(member.guild.id).roles.find('name', 'Member');
  if (!role) return;
  member.addRole(role);

  member.guild.channels.find("name", "welcome").send(embed).catch(console.error);
};

