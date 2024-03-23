const {
  smd,
  tlang,
  prefix,
  Config,
  sleep,
  getBuffer,
  smdJson,
  smdBuffer
} = require("../lib");
smd({
  cmdname: "afkreply",
  alias: ["freply", "afk", "fakereply"],
  desc: "Create fake Reply by given texts!",
  type: "main",
  use: " msg| reply_text | number ",
  usage: "generates fake messages of given text and number!",
  filename: __filename,
  public: true
}, async (m, text) => {
  try {
    let types = ["text", "order", "contact", "image", "video"];
    let args = text.split("|");
    if (!text || args.length < 3) {
      return await m.reply(`*Use ${prefix}fakereply text |Reply_text|923184474176|type(text,order,contact,image,video)*`);
    }
    let reply = args[0];
    let msg = args[1];
    let num = `${args[2].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    let type = args[3] && types.includes(args[3]) ? args[3] : "text";
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let smds = "SMD";
    for (let i = 0; i < 13; i++) {
      smds += charset[Math.floor(Math.random() * charset.length)];
    }
    let fak = await m.bot.fakeMessage(type, {
      id: smds,
      remoteJid: m.isGroup ? m.chat : num,
      participant: num
    }, msg);
    try {
      if (type === "contact") {
        fak.message.contactMessage.jpegThumbnail = await m.getpp(num);
      }
    } catch (e) {
      console.log(e);
    }
    await m.bot.sendMessage(m.chat, {
      text: reply
    }, {
      quoted: fak
    });
  } catch (e) {
    m.error(`${e}\n\nCommand: fakereply`, e, false);
  }
});