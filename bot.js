require("express")().listen(1343);

const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");

setInterval(() => {
  var links = db.get("helo");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("helo"))) {
    db.set("helo", []);
  }
});

client.on("ready", () => {
  //client.user.setActivity(`KiBo Uptime`);
  client.user.setStatus("idle");
  console.log(`Bot Aktif`);
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!add") {
    var helo = spl[1];
    fetch(helo)
      .then(() => {
        if (
          db
            .get("helo")
            .map(z => z.url)
            .includes(helo)
        )
          return message.channel.send(
            "**<a:nlem:779294306350661643> Zaten Eklenmiş !!!**"
          );

        let yardım = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor(0x6a3db8)
          .setDescription(
            "**<a:ykleniyo:779061588786937917> Başarılı Bir Şekilde 7/24 Yapıldı !!!**"
          )
          .setFooter(`© ${client.user.username}`, client.user.avatarURL)
          .setTimestamp();
        message.channel.send(yardım)
        db.push("helo", { url: helo, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor(0x6a3db8)
          .setDescription(
            "<a:nlem:779294306350661643>  **Error Yalnızca Mutlak URL'ler Desteklenir.**"
          )
          .setFooter(`© ${client.user.username}`, client.user.avatarURL)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!say") {
    var link = spl[1];
    message.channel.send(
      `**İşte Bot Sayısı <a:iaret:779061627928182824>  ${
        db.get("helo").length
      }**`
    );
  }
});

const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!yardım") {
    let embed = new Discord.RichEmbed()
      .setColor("#e900ea")
      .addField("<a:tik2:778968359924137995> **u!yardım**","Uptime Botunun Yardım Sistemini Gösterir (Burası)")
      .addField("<a:iaret:779061627928182824> **u!add**","Botunuzu 7/24 Aktif Tutmak İçin Kullanılan Komut")
      .addField("<:dc:779061614644428800> **u!say**","Sistemde Kaç Bot Olduğuna Bakar")
      .addField("<a:tac:779294351502737418> **u!developer**","Botun Hawli Geliştiricilerini Gösterir")
      .addField("<a:an:779294328106254387> **u!ping**","Botun Pingini Gösterir.")
      .addField("<a:dc_bkm:779294318409023488> **u!davet**","Botun Destek Sunucusunu Ve Ekleme Linkini Atar.")
      .addField("<a:dn_dc:779294443634950174> **u!istatistik**","Botun İstatistiklerini Gösterir.")
      .setImage("https://cdn.discordapp.com/attachments/779001955233824790/779064222637883392/standard_1.gif")
    
      .setAuthor(client.user.username, client.user.avatarURL);
    return message.channel.send(embed);
  }
});

const log = message => {
  console.log(`${message}`);
};

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!developer") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setAuthor("Developers", client.user.avatarURL)
      .addField(
        " <a:beyaz:779061642192486450> **>> İşte Hawli Sahibim**",
        "<@!755160817753653269>"
      )
      .addField(
        " <a:beyaz:779061642192486450>   **>> İşte Hawli Yazılımcım**",
        "<@!731527765681242133>"
      );
    return message.channel.send(embed);
  }
});

client.on("message", msg => {
  if (msg.content === "u!ping") {
    msg.channel.send(`Pingim **${client.ping}** !`);
  }
  });

  client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!davet") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(
        `**Botun Davet Linki : [Tıkla](https://discord.com/api/oauth2/authorize?client_id=779060147506118697&permissions=8&scope=bot)** 
         **Botun Destek Sunucusu : [Tıkla](https://discord.gg/)**`)
    return message.channel.send(embed);
  }
});


client.on("message", msg => {
  if (msg.content === "u!istatistik") {
   const seksizaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('ORANGE')
  .setFooter(client.user.username, client.user.avatarURL)
  .addField('<a:an:779294328106254387> Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2)) 
  .addField("» Çalışma süresi", seksizaman)
  .addField("» Discord.JS sürüm", "v"+Discord.version, true)
  .addField(`» Node.JS sürüm`, `${process.version}`, true)
  .addField("» Ping",`${client.ping} MS`)
  .addField(':book: Kütüphanesi;', `Discord.js`)
  .addField("**❯ Bot Davet**", " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=771114994791743568&scope=bot&permissions=8)", )
  .addField("**❯ Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/pcH6tRtNJm)", )

  return msg.channel.send(istatistikler);
  }
  });
  
  client.on("message", msg => {
  if (msg.content === "u!i") {
   const seksizaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('ORANGE')
  .setFooter(client.user.username, client.user.avatarURL)
  .addField('<a:an:779294328106254387> Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2)) 
  .addField("» Çalışma süresi", seksizaman)
  .addField("» Discord.JS sürüm", "v"+Discord.version, true)
  .addField(`» Node.JS sürüm`, `${process.version}`, true)
  .addField("» Ping",`${client.ping} MS`)
  .addField(':book: Kütüphanesi;', `discord.js`)
  .addField("**❯ Bot Davet**", " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=771114994791743568&scope=bot&permissions=8)", )
  .addField("**❯ Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/pcH6tRtNJm)", )

  return msg.channel.send(istatistikler);
  }
  });

  client.on("message", msg => {
  if (msg.content === "u!reboot") {
  var embed2 = new Discord.RichEmbed()   
      .setTitle('Merhaba, ' + msg.member.user.username)
      .setDescription('Sadece Geliştiricim Bu Komudu Kullanabilir Yani <@!731588742388645939>')
      .setColor('RED') 
  

  if(msg.author.id !== '731588742388645939') return msg.channel.sendEmbed(embed2)
     
  //Cortex botun reboot sistemi hadi h.o
  var embed = new Discord.RichEmbed()   
      .setTitle('**Merhaba Geliştiricims :D,**')
      .setDescription('Beni yeniden başlatmak  istediğine eminsen aşağıdaki **TİK** işaretine, bir kere dokunur musun?')
      .setColor('RANDOM')
msg.channel.send(embed).then(async function (sentEmbed) {
            const emojiArray = ["✅"];
            const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === msg.author.id;
            await sentEmbed.react(emojiArray[0]).catch(function () { });
            var reactions = sentEmbed.createReactionCollector(filter, {
                time: 30000
            });
reactions.on("end", () => msg.delete().then(mr => sentEmbed.delete()).then(m => msg.delete()).then(m2 => msg.author.send("Yeniden başlatma İşlemini İptal Ettim!"))) 
    reactions.on("collect", async function (reaction) {
                if (reaction.emoji.name === "✅") {
  try {
    msg.delete().then(mr => sentEmbed.delete()).then(wb => { 
 console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
    })
  } catch (err) {
    msg.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
};}})})};});
