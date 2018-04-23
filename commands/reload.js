module.exports.run = async (bot, message, args) => {
  let errors = require("../util/erorrs.js");

  let commandName = args[0];

  bot.loadCommand = (commandName) => {
    try {
      const props = require(`./${commandName}`);
      bot.logger.log(`Loading Command: ${props.help.name}. ðŸ‘Œ`);
      if (props.init) {
        props.init(bot);
      }
      bot.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  bot.unloadCommand = async (commandName) => {
    let command;
    if (bot.commands.has(commandName)) {
      command = bot.commands.get(commandName);
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

    if (command.shutdown) {
      await command.shutdown(bot);
    }
    delete require.cache[require.resolve(`./${commandName}.js`)];
    return false;
  };

  if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
  return errors.noPerm(message);
  if (!args || args.length < 1) return message.reply("Must provide a command to reload. Derp.");

  let response = await bot.unloadCommand(args[0]);
  if (response) return message.reply(`Error Unloading: ${response}`);

  response = bot.loadCommand(args[0]);
  if (response) return message.reply(`Error Loading: ${response}`);

  message.reply(`The command \`${args[0]}\` has been reloaded`);
};


module.exports.help = {
  name: "reload",
  description: "Allows you to reload a command.",
  usage: "reload [command]"
};