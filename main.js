// Response for Uptime Robot
const http = require("http");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };

  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
var server = http.createServer(function(req, res) {
  var url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  console.log(url);
if (req.url == "/members.txt") {
      res.writeHead(200, { "Content-Type": getType(url) });
      res.end(client.users.cache.size);
}
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("ok");
});

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();
const Canvas = require("canvas");
const prefix = "Sc+";
const fs = require("fs");
const cron = require("node-cron");
const { inspect } = require("util");
const ms = require("ms");

client.on("ready", message => {
  console.log("bot is ready!");
  client.user.setActivity("リニューアル中です!");
});


client.on("message", message => {
  const prob = Math.floor(Math.random() * 100);

  //乱数の値が10以下だったら
  if (message.channel.id === "726000952296865813" && prob < 1) {
    message.channel.send("https://discord.gg/ChRCsyN",
                         {embed: {
      color: "RANDOM",
                           
      title: "おっと、ここで雑談してますね?",
      description: "ここで雑談するのもいいんですが雑談に特化したサーバーがあるんですよ〜\n是非このサーバーへ〜"
    }})
  }
})

const messageId　= '742265836244434994'
const channelId = '726000945309286460'
const emojiId =　'726000967627046912'
client.once('ready', () => {
  client.channels.fetch(channelId)
    .then(channel => channel.messages.fetch(messageId))
    .catch(console.error)
})

client.on('messageReactionAdd', async (reaction,user) => {
  const message = reaction.message
  const emoji = reaction.emoji
  if (emoji.id !== emojiId) return
  if (message.id !== messageId) return
  if (reaction.message.guild.member(user.id).roles.cache.has("726000947175620629")) return
  reaction.message.guild.member(user.id).roles.add("742271596579782746")
})

const messageId1　= '742630590234361907'
const channelId1 = '742623891301597194'
const emojiId1 =　'726000967627046912'
client.once('ready', () => {
  client.channels.fetch(channelId1)
    .then(channel => channel.messages.fetch(messageId1))
    .catch(console.error)
})

client.on('messageReactionAdd', async (reaction,user) => {
  const message = reaction.message
  const emoji = reaction.emoji
  if (emoji.id !== emojiId1) return
  if (message.id !== messageId1) return
  if (reaction.message.guild.member(user.id).roles.cache.has("742632018029969418")) return
reaction.message.guild.member(user.id).roles.add("742632018029969418")
})

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "eval") {
    // Put your userID here
    if (message.author.id !== "645581794267234315") return;

    let evaled;
    try {
      evaled = await eval(args.join(" "));
      message.channel.send(inspect(evaled));
      message.react("check");
      console.log(inspect(evaled));
    } catch (error) {
      console.error(error);
      message.channel.send({
        embed: {
          color: 16757683,
          title: "⚠エラーが発生しました…⚠",
          description: "エラー内容```" + error + "```"
        }
      });
      message.react("uncheck");
    }
  }

 

  if (command === "topic") {
    const topic = args.join(" ");
    message.channel.setTopic("```"+topic+"```")
  }
  })

client.on("ready", () => {
  cron.schedule('*/30 * * * * *', () => {
const channel = client.channels.cache.get("739372365338902560")  
var ads = ['> **Perfume**\n**__あなたの目的に合う__\n多目的コミュニティです!**\n> 😍 `見やすいデザイン`\n役職・チャンネルのデザイン、専属Botのメッセージなど様々な所にこだわってます。\n__**ここだけのデザインを作ります。**__\n> 🌈 `個性豊かなメンバー`\n色々なメンバーがあなたを待っています!\n**__雑談はとても楽しいです!__**\n> 🤖 `他のサーバーにないような物を…`\nOwnerは専属Botを作ってます。\n**__他のサーバーに無いような機能も…?__**\n> 📢 `宣伝媒体としても…?`\n宣伝媒体としても使えます!\nこのサーバーは宣伝を制限しません!\n__**あなたのサーバーの発展を応援します!**__\n> 🔗 `是非このサーバーに…`\n約1週間で100人突破しました!🎉\n**__イベント開催します!__**\nぜひ入って下さい!\nhttps://cdn.discordapp.com/attachments/735660808046116935/738306419299975259/211_20200729204818.png\nhttps://discord.gg/ChRCsyN','```*~Hayashi Bot公式鯖~*\nQ,ここは何の鯖すか？\nA,Hayashi Botの制作者が経営するサーバーです！\n============================================\nQ,Botを導入したいんですが...\nこのサーバーの導入というチャンネルがあるのでそこのURLからどうぞ！\n================================================================\nルール\n1,宣伝目的での参加、NG!\n2,荒らしだめ、絶対\n3,BANされたからといいサブ垢で参加NG!\n================================================================\nこのルールを守ってこのサーバーの使用をお願い致します！\n\nさあ！君のサーバーでもHayashi Botを使おう！```\nhttps://discord.gg/TWRZx6B','どうもです(=ﾟωﾟ)ﾉ\n\nみんなさ、、今外出自粛で困ってないかい❓\n\nそんな時には日香に旅行に行こうよ✈️(((ね、ね？(圧)\n\nほら、友達とか家族誘ってさ、、あ！今からアナウンス流れるよ🎙️\n\n__`ピーンポーンパーンポーン♪`__\n\n```皆様、こちらはCBN航空日香行きのG55便はただ今54番ゲートよりご搭乗\n\nいただいております。\n\nCBN航空日香行きG55便はただ今、ご搭乗いただいております。\n\n当便をご利用になるお客様は81番ゲートにお進みください。\n\n間も無くG55便が離陸致します。```\n\n　discord.gg/dtGn75M']
var random = Math.floor( Math.random() * ads.length )
channel.send(ads[random]).then(m=>{
  function sleep(waitSec, callbackFunc) {
      var spanedSec = 0;

      var waitFunc = function() {
        spanedSec++;

        if (spanedSec >= waitSec) {
          if (callbackFunc) callbackFunc();
          return;
        }

        clearTimeout(id);
        id = setTimeout(waitFunc, 1000);
      };

      var id = setTimeout(waitFunc, 1000);
    }

  sleep(29, function() {
    channel.bulkDelete(2)
  });
});
})
})


client.login("Njk2NTgxMzkyMzE4MDcwODI0.XxRAiQ.F496_S9XSqLDyVhexmtSByJdx2M");
