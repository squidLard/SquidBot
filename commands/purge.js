const Discord = require('discord.js');
let config = require("../config.json");
let logchannels = require("../logchannels.json");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
  return errors.noPerm(message);
  message.delete();
  async function purge() {

            if (isNaN(args[0])) {
                message.channel.send('Please use a number as your arguments. \n Usage: /purge <amount> 2-100');
                return;
            }
            let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
            if (!modlog) return message.channel.send("There is no mod-log channel.");
            const fetched = await message.channel.fetchMessages({limit: args[0]});

            let amount = new Discord.RichEmbed()
            .setColor(config.green)
            .setDescription(`Successfully deleted ${fetched.size} messages.`);

            let embed = new Discord.RichEmbed()
            .setColor(config.red)
            .addField("Action:", `Purge`, true)
            .addField("Deleted:", `${fetched.size}`, true)
            .addField("Channel:", `${message.channel}`, true)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp();

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));
          await message.channel.send(amount).then(msg => {msg.delete(5000)})
          modlog.send({embed}).catch(console.error);
        }
        purge();
};

module.exports.help = {
  name: "purge",
  description: "Allows you to purge messages from a channel.",
  usage: "purge [amount]"
};
