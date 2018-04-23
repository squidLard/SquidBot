module.exports.run = async (bot, message, args) => {
  const msg = await message.channel.send("Pong!");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
};

module.exports.help = {
  name: "ping",
  description: "Displays your ping to the server.",
  usage: "ping"
};
