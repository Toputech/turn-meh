const autobio = (zk, conf) => {
  if (conf.AUTOBIO === 'yes') {
    setInterval(() => {
      const date = new Date();
      zk.updateProfileStatus(
        `${conf.BOT} is active 24/7\n\n${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} It's a ${date.toLocaleString('en-US', { weekday: 'long', timeZone: 'Africa/Nairobi' })}.`
      );
    }, 10 * 1000);
  }
};

module.exports = autobio
