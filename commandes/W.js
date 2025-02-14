const {
  zokou
} = require("../framework/zokou");
zokou({
  'nomCom': "weather",
  'reaction': "🌡️",
  'categorie': "Search"
}, 
    async (_0x626df9, _0x17e5bb, _0x37baf6) => {
  const _0x445647 = _0x1180fa.join(" ");
  if (!_0x445647) {
    return _0xecdf09("Give me location...");
  }
  const _0x470189 = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + _0x445647 + "&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en");
  const _0x4bfc6 = await _0x470189.json();
  const _0x3cf19a = _0x4bfc6.name;
  const _0x52e997 = _0x4bfc6.main.temp;
  const _0x32180e = _0x4bfc6.weather[0x0].description;
  const _0x2da493 = _0x4bfc6.main.humidity;
  const _0x368581 = _0x4bfc6.wind.speed;
  const _0x28a97c = _0x4bfc6.rain ? _0x4bfc6.rain['1h'] : 0x0;
  const _0x39a4af = _0x4bfc6.clouds.all;
  const _0x41b2f8 = new Date(_0x4bfc6.sys.sunrise * 0x3e8);
  const _0x4393a0 = new Date(_0x4bfc6.sys.sunset * 0x3e8);
  await _0xecdf09(" *ALONE-MD WEATHER UPDATES* \n\n❄️ Weather in " + _0x3cf19a + "\n\n🌡️ *Temperature:* " + _0x52e997 + "°C\n📝 *Description:* " + _0x32180e + "\n❄️ *Humidity:* " + _0x2da493 + "%\n🌀 *Wind Speed:* " + _0x368581 + " m/s\n🌧️ *Rain Volume (last hour):* " + _0x28a97c + " mm\n☁️ *Cloudiness:* " + _0x39a4af + "%\n🌄 *Sunrise:* " + _0x41b2f8.toLocaleTimeString() + "\n🌅 *Sunset:* " + _0x4393a0.toLocaleTimeString() + "\n🌫️ *Latitude:* " + _0x4bfc6.coord.lat + "\n🌪️ *Longitude:* " + _0x4bfc6.coord.lon + "\n\n🗺 *Country:* " + _0x4bfc6.sys.country + "\n\n\n*°Powered by ALONE-MD*");
});
zokou({
  'nomCom': 'fact',
  'reaction': '👌',
  'categorie': 'User'
}, async (_0x3c85fa, _0xe0dd81, _0x20339c) => {
  const {
    repondre: _0x12e23a,
    arg: _0xec0687,
    ms: _0x5d5368
  } = _0x20339c;
  const _0x5754a8 = await fetch("https://nekos.life/api/v2/fact");
  const _0x21e127 = await _0x5754a8.json();
  _0x12e23a(" *ALONE MD FACT MESSAGE* \n*💠* " + _0x21e127.fact + "\n\n\n\n\n*© Toputech *\n\n╔═════◇\n║◇ *ALONE MD*\n╚════════════════════>  ");
});

zokou({
  'nomCom': 'define',
  'reaction': '😁',
  'categorie': "Search"
}, async (_0x2d6773, _0x1778cf, _0x5bcf7e) => {
  const {
    repondre: _0x3c6e3b,
    arg: _0x3997ea,
    ms: _0x10a9bb
  } = _0x5bcf7e;
  if (!_0x3997ea || _0x3997ea.length === 0x0) {
    return _0x3c6e3b("provide a term");
  }
  const _0x243eb3 = _0x3997ea.join(" ");
  try {
    let {
      data: _0x31830d
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x243eb3);
    var _0x259634 = "\n Word: " + _0x243eb3 + "\n Definition: " + _0x31830d.list[0x0].definition.replace(/\[/g, '').replace(/\]/g, '') + "\n Example: " + _0x31830d.list[0x0].example.replace(/\[/g, '').replace(/\]/g, '');
    return _0x3c6e3b(_0x259634);
  } catch {
    return _0x3c6e3b("No result for " + _0x243eb3);
  }
});
zokou({
  'nomCom': "lyrics",
  'reaction': '🗞',
  'categorie': "Search"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const {
    repondre: _0x323d88,
    arg: _0x47ee56,
    ms: _0x26dbd3
  } = _0x5047e1;
  try {
    if (!_0x47ee56 || _0x47ee56.length === 0x0) {
      return _0x323d88("please provide me the song name");
    }
    const _0x2d6993 = _0x47ee56.join(" ");
    const _0x19a972 = await Client.songs.search(_0x2d6993);
    const _0x349a1c = _0x19a972[0x0];
    const _0x3e8204 = await _0x349a1c.lyrics();
    await _0x24921b.sendMessage(_0x16b585, {
      'text': _0x3e8204
    }, {
      'quoted': _0x26dbd3
    });
  } catch (_0xe736b5) {
    reply("I did not find any lyrics for " + text + ". Try searching a different song.");
    console.log(_0xe736b5);
  }
});
