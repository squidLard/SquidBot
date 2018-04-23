const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
const fs = require("fs");
let config = require("../config.json");
module.exports = (bot, message) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.content.startsWith(config.prefix)) return;
  let vip = bot.guilds.get(message.guild.id).roles.find('name', 'VIP');
  let vipplus = bot.guilds.get(message.guild.id).roles.find('name', 'VIP+');
  let mvp = bot.guilds.get(message.guild.id).roles.find('name', 'MVP');
  let mvpplus = bot.guilds.get(message.guild.id).roles.find('name', 'MVP+');
  let user = message.author.id;
  let score;
  let curlvl;
  let bal;
  let xpAdd = Math.floor(Math.random() * 5) + 5;
  if (message.guild) {
    score = bot.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1,
        bal: 0
      }
    }

    let randomAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;

    if (randomAmt === baseAmt) {
      bal = score.bal + randomAmt;
      message.channel.send(`+$${randomAmt}`).then(msg => {msg.delete(5000)});
    } else {
      bal = score.bal;
    }
    let points = score.points + xpAdd;
    let nxtlvl = score.level * 300;
    if(nxtlvl <= points) {
      curlvl = score.level + 1;
      if (score.level == 24) {
        message.guild.member(user).addRole(vip);
        message.channel.send(`You are now level ${curlvl} and have recieved VIP rank!`);
      } else if (score.level == 49) {
        message.guild.member(user).addRole(vipplus);        
        message.channel.send(`You are now level ${curlvl} and have recieved VIP+ rank!`);      
      } else if (score.level == 74) {
        message.guild.member(user).addRole(mvp);        
        message.channel.send(`You are now level ${curlvl} and have recieved MVP rank!`);   
      } else if (score.level == 99) {
        message.guild.member(user).addRole(mvpplus);        
        message.channel.send(`You are now level ${curlvl} and have recieved MVP+ rank!`);   
      } else {
        message.channel.send(`You are now level ${curlvl}`).then(msg => {msg.delete(5000)});
      }
    } else {
      curlvl = score.level;
    }
    sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, bal) VALUES (${message.guild.id}-${message.author.id}
      , ${message.author.id}
      , ${message.guild.id}
      , ${points}
      , ${curlvl}
      , ${bal});`).run();
  }
};
