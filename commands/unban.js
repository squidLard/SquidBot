const Discord = require('discord.js');
let logchannels = require("../logchannels.json");
let config = require("../config.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
    return errors.noPerm(message);

	let search = args.join(" ");
	if(!search) return message.channel.send("Please provide a valid ID or name.");
  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) return message.channel.send("There is no mod-log channel.");
	try {
		let bans = await message.guild.fetchBans();
		let banned = bans.get(search) || bans.find(u => u.tag.toLowerCase().includes(search.toLowerCase()));

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .addField("Action:", `Unban`, true)
    .addField("User:", `${banned.tag}`, true)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp();

		if(!banned) return message.channel.send("I could not find a banned user by this ID or name.");

		await message.guild.unban(banned);

    modlog.send({embed}).catch(console.error);

		message.channel.send(`${banned.tag} has been unbanned.`);
	} catch(e) {
		message.channel.send(`Unban failed: ${reason}`)
  }

};

module.exports.help = {
  name: "unban",
  description: "Allows you to unban a user from the server.",
  usage: "unban [user]"
};
