const levels = { debug: 0, info: 1, warn: 2, error: 3 };

function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, message, ...meta };
  console.log(JSON.stringify(entry));
  return entry;
}

module.exports = {
  debug: (msg, meta) => log("debug", msg, meta),
  info: (msg, meta) => log("info", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  error: (msg, meta) => log("error", msg, meta),
};
