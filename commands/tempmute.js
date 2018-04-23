const Discord = require("discord.js");
const ms = require("ms");
let logchannels = require("../logchannels.json");
let config = require("../config.json");
let errors = require("../util/erorrs.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Admin", "Moderator", "Owner"].includes(r.name)) )
  return errors.noPerm(message);
  let modlog = message.guild.channels.find("id", logchannels[message.guild.id].modlog);
  if (!modlog) return message.channel.send("There is no mod-log channel.");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  if (!modlog) return message.channel.send("There is no mod-log channel.");
  let muterole = message.guild.roles.find(`name`, "muted");
  let mutetime = args[1];

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  };

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .addField("Action:", `Tempmute`, true)
  .addField("User:", `<@${tomute.id}>`, true)
  .addField("Time:", `${mutetime}`, true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
  .setTimestamp();

  let unmute = new Discord.RichEmbed()
  .setColor(config.red)
  .addField("Action:", `AutoUnmute`, true)
  .addField("User:", `<@${tomute.id}>`, true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
  .setTimestamp();

  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  modlog.send(embed).catch(console.error);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
    modlog.send(unmute).catch(console.error);
  }, ms(mutetime));
};

module.exports.help = {
  name: "tempmute",
  description: "Allows you to mute a user for a specified amount of time.",
  usage: "tempmute [user] [time]"
};
