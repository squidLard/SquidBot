const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const https = require("https");
let config = require("./config.json");
let args = process.argv.slice(2);
bot.commands = new Discord.Collection();
bot.logger = require("./util/Logger");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  bot.logger.log(`[Commands] Loading a total of ${files.length} commands.`);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    bot.logger.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

fs.readdir("./events/", (err, files) => {

  if(err) console.log(err);
  bot.logger.log(`[Events] Loading a total of ${files.length} events.`);
  let jsfile = files.filter(f => f.split("."));
  if(jsfile.length <= 0){
    console.log("Couldn't find events.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./events/${f}`);
    //console.log(`${f} loaded!`);
    const eventName = f.split(".")[0];
    const event = require(`./events/${f}`);
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (!commandfile) {
    return
  }
  if(commandfile) commandfile.run(bot,message,args,prefix);
  bot.logger.cmd(`${message.author.username} (${message.author.id}) ran command [${commandfile.help.name}] on ${message.guild.name}`);
});

bot.login(config.token);
