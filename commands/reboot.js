module.exports.run = async (bot, message, args) => {
  let errors = require("../util/erorrs.js");
  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
  return errors.noPerm(message);
  await message.reply("Bot is shutting down.");
  bot.commands.forEach( async cmd => {
    await bot.unloadCommand(cmd);
  });
  process.exit(1);
};

module.exports.help = {
  name: "reboot",
  description: "Reboots the bot.",
  usage: "reboot"
};
