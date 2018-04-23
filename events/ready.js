const SQLite = require("better-sqlite3");
sql = new SQLite('./scores.sqlite');
module.exports = (bot, member) => {

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, bal INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (?, ?, ?, ?, ?);");

  bot.user.setActivity("!help");
  bot.logger.log(`[READY] ${bot.user.tag}, ready to serve ${bot.users.size} users in ${bot.guilds.size} servers.`, "ready");
};
