const fs = require("fs");
module.exports = (bot, guild) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  prefixes[guild.id] = {
    prefixes: "!"
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });
};
