let logchannels = require("../logchannels.json");
const fs = require("fs");
let errors = require("../util/erorrs.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
  return errors.noPerm(message);
  let newchannel = message.channel.id;

  if (!logchannels[message.guild.id]) logchannels[message.guild.id] = {
    welcomeChannel: "",
    modlog: ""
  };

  logchannels[message.guild.id] = {
    welcomeChannel: logchannels[message.guild.id].welcomeChannel,
    modlog: newchannel
  }

  fs.writeFile("./logchannels.json", JSON.stringify(logchannels), (err) => {
    if (err) console.error(err)
  });

  message.channel.send(`Successfully set this channel to the mod-log channel.`)
};

module.exports.help = {
  name: "setmodlog",
  description: "Sets the mod-log channel.",
  usage: "setmodlog"
}