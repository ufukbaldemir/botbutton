const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const matthe = require('discord-buttons')
matthe(client)

var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`[ Major 💙 Button ] bot başarıyla aktif edildi: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`[ Major 💙 Button ] ${files.length} adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`[ Major 💙 Button ] yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login(ayarlar.token);

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("message", (message) => {

    if (message.content !== ".buton" || message.author.bot) return;
  
  let EtkinlikKatılımcısı = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('Etkinlik Katılımcısı') 
    .setID('EtkinlikKatılımcısı'); 
  
    let DuyuruKatılımcısı = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('Duyuru Rolu') 
    .setID('DuyuruKatılımcısı'); 

  let ÇekilişKatılımcısı = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('Çekiliş Katılımcısı') 
    .setID('ÇekilişKatılımcısı');

    let Partnerkatılımcısı = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('Partner Katılımcısı') 
    .setID('Partnerkatılımcısı');

    let Youtubekatılımcısı = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('YouTube Katılımcısı') 
    .setID('Youtubekatılımcısı');
  
  message.channel.send(`
**Aşağıdaki Menüden Kendinize Rol Seçebilirsiniz.
 
\`>\` <@&936690796470603786> Rolü Almak İçin Etkinlik Katılımcısı! Butonuna.
\`>\` <@&898447341378498611> Rolü Almak İçin Çekiliş Katılımcısı! Butonuna.
\`>\` <@&898447340657057822> Rolü Almak İçin Duyuru Katılımcısı! Butonuna.
\`>\` <@&898456174201036822> Rolü Almak İçin Duyuru Katılımcısı! Butonuna.
\`>\` <@&898464023010496554> Rolü Almak İçin Duyuru Katılımcısı! Butonuna.

**`, { 
    buttons: [ EtkinlikKatılımcısı, ÇekilişKatılımcısı, DuyuruKatılımcısı, Partnerkatılımcısı, Youtubekatılımcısı]
});
});
  
client.on('clickButton', async (button) => {

    if (button.id === 'DiscordGüncellemeler') {
        if (button.clicker.member.roles.cache.get((ayarlar.DiscordGüncellemeler))) {
            await button.clicker.member.roles.remove((ayarlar.DiscordGüncellemeler))
            await button.reply.think(true);
            await button.reply.edit("Discord Güncellemeler rolü başarıyla üzerinizden alındı!")
        } else {
            await button.clicker.member.roles.add(((ayarlar.DiscordGüncellemeler)))
            await button.reply.think(true);
            await button.reply.edit("Discord Güncellemeler rolünü başarıyla aldınız!")
        }
    }
  
      if (button.id === 'DiscordHaberler') {
        if (button.clicker.member.roles.cache.get((ayarlar.DiscordHaberler))) {
            await button.clicker.member.roles.remove((ayarlar.DiscordHaberler))
            await button.reply.think(true);
            await button.reply.edit("Discord Haberler rolü başarıyla üzerinizden alındı!")
        } else {
            await button.clicker.member.roles.add(((ayarlar.DiscordHaberler)))
            await button.reply.think(true);
            await button.reply.edit("Discord Haberler rolünü başarıyla aldınız!")
        }
    }


    if (button.id === ':renk_fusya: ÇekilişKatılımcısı') {
        if (button.clicker.member.roles.cache.get((ayarlar.ÇekilişKatılımcısı))) {
            await button.clicker.member.roles.remove((ayarlar.ÇekilişKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit(`:renk_fusya: Çekiliş Katılımcısı rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add((ayarlar.ÇekilişKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit(`:renk_fusya: Çekiliş Katılımcısı rolünü başarıyla aldınız!`)
        }

    }

    if (button.id === 'Partnerkatılımcısı') {
      if (button.clicker.member.roles.cache.get((ayarlar.Partnerkatılımcısı))) {
          await button.clicker.member.roles.remove((ayarlar.Partnerkatılımcısı))
          await button.reply.think(true);
          await button.reply.edit("Partner Katılımcısı rolü başarıyla üzerinizden alındı!")
      } else {
          await button.clicker.member.roles.add(((ayarlar.Partnerkatılımcısı)))
          await button.reply.think(true);
          await button.reply.edit("Partner Katılımcısı rolünü başarıyla aldınız!")
      }
   }

   if (button.id === 'Youtubekatılımcısı') {
    if (button.clicker.member.roles.cache.get((ayarlar.Youtubekatılımcısı))) {
        await button.clicker.member.roles.remove((ayarlar.Youtubekatılımcısı))
        await button.reply.think(true);
        await button.reply.edit("YouTube Katılımcısı rolü başarıyla üzerinizden alındı!")
    } else {
        await button.clicker.member.roles.add(((ayarlar.Youtubekatılımcısı)))
        await button.reply.think(true);
        await button.reply.edit("YouTube Katılımcısı rolünü başarıyla aldınız!")
       }
    }
});