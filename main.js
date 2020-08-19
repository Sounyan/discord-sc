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

client.on("message", message => {
  if (message.author.id !== "696581392318070824")
    if (message.channel.topic === "フリーチャンネル") {
      message.channel
        .send({
          embed: {
            color: 16757683,
            title:
              "本当にあなたは**" +
              message.content +
              "**と言うチャンネルを作りますか?",
            description:
              "**1分以内に下のリアクションを押してください。\n⭕:作る\n❌:キャンセル\nリアクションを押すとチャンネルが出来ます。**"
          }
        })
        .then(sentMessage => {
          sentMessage.react("⭕").then(r => {
            sentMessage.react("❌");
          });
          sentMessage
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == "⭕" || reaction.emoji.name == "❌"),
              { max: 1, time: 60000 }
            )
            .then(collected => {
              if (collected.first().emoji.name == "⭕") {
                message.guild.channels
                  .create(message.content, {
                    type: "text",
                    parent: "726000942704754708",

                    permissionOverwrites: [
                      {
                        id: "726000947175620629",
                        allow: ["VIEW_CHANNEL"],
                        deny: ["MANAGE_WEBHOOKS"]
                      },
                      {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL"]
                      }
                    ]
                  })
                  .then(ch => {
                    sentMessage.edit({
                      embed: {
                        color: 16757683,
                        title: "チャンネルを作りました。",
                        description: "チャンネル➜<#" + ch.id + ">"
                      }
                    });
                    ch.send(
                      message.member.displayName +
                        "が作成しました。\nこのチャンネルを間違えて作ってしまった、または消したいと思ったら⭕を押してください。\n特に消す予定なしって方は❌を押してください。"
                    ).then(msg => {
                      msg.react("⭕").then(r => {
                        msg.react("❌");
                      });
                      msg
                        .awaitReactions(
                          (reaction, user) =>
                            user.id == message.author.id &&
                            (reaction.emoji.name == "⭕" ||
                              reaction.emoji.name == "❌"),
                          { max: 1 }
                        )
                        .then(collected => {
                          if (collected.first().emoji.name == "⭕") {
                            msg.edit("チャンネルを消します。");
                            msg.channel.delete();
                          } else
                            msg.edit("キャンセルされました。").then(mes => {
                              mes.delete();
                            });
                        })
                        .catch(() => {
                          msg.edit("キャンセルされました");
                        });
                    });
                  });
              } else
                sentMessage.edit({
                  embed: {
                    color: 16757683,
                    description: "キャンセルされました。"
                  }
                });
            })
            .catch(() => {
              message.edit({
                embed: {
                  color: 16757683,
                  description:
                    "リアクションが一分間押されなかったのでキャンセルされました。"
                }
              });
            });
        });
    }
});

client.on("message", message => {
  if(message.channel.topic === "#評価") {
    message.react("👍").then(r => {
    message.react("👎")
    })
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  let goodlimit = 3; // number of thumbsdown reactions you need
  let badlimit = 5;
  if (reaction.emoji.name == '👍' && reaction.count >= goodlimit) client.channels.cache.get("743001106426363904").send(reaction.message.content);
  if (reaction.emoji.name == '👎' && reaction.count >= badlimit) client.channels.cache.get("743001106426363904").send(reaction.message.content);

                                                                                                                              
});

client.on("message", async message => {
if (message.content.startsWith('-auth')) {
 
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 300);

      // Return the result to use in the actual canvas
      return ctx.font;
    };
var len = 8;
var str = "abcdefghijklmnopqrstuvwxyz";
var strLen = str.length;
var result = "";
  for (var i = 0; i < len; i++) {
  result += str[Math.floor(Math.random() * strLen)];
}

    const canvas = Canvas.createCanvas(1600, 800);
    const ctx = canvas.getContext("2d")
    
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/4ec68a8b-660a-46e4-b5d9-e69c4a47cd4f%2F%E7%84%A1%E9%A1%8C236_20200811105304.png?v=1597110828575"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = applyText(canvas, result);
    ctx.fillStyle = "#93818";
    ctx.fillText(
      result,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(1600, 800, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "AuthPicture.png"
    );
  message.channel.send("画像の様に文字をってください。",attachment)
  message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 60000}).then(collected => {
    if (collected.first().content.toLowerCase() == result) {
                                            message.reply('正解です。').then(() => message.member.roles.add("726000947175620629"))
            .then(() => message.member.roles.remove("742271596579782746"));
                                            client.channels.cache.forEach(channel => {
            if (channel.name === "🛡鉄路認証通知") {
              channel.send({embed: {
                color: "RANDOM",
                title: `${message.author.username}さんの認証が完了しました。`,
                description: "このユーザーの安全性が確認されたのでサーバーの利用ができるようになりました。\nようこそ!最高の宣伝・共有ポータルへ!"
                
              }});
            }
          });
                                    }

                                    else
                                            message.reply('間違っています。');      
                            }).catch(() => {
                                    message.reply('1分間何も応答が無かったので機能を停止しました。');
                            });
                    
            }  
    }
)

client.on("message", message => {
  if (message.author.id !== "696581392318070824")
    if (message.channel.topic === "フリートピック") {
      message.channel
        .send({
          embed: {
            color: "RANDOM",
            title:
              "本当にあなたは**" +
              message.content +
              "**と言うチャンネルを作りますか?",
            description:
              "1分以内に下のリアクションを押してください。\n⭕:作る\n❌:キャンセル\nリアクションを押すとチャンネルが出来ます。"
          }
        })
        .then(sentMessage => {
          sentMessage.react("⭕").then(r => {
            sentMessage.react("❌");
          });
          sentMessage
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == "⭕" || reaction.emoji.name == "❌"),
              { max: 1, time: 60000 }
            )
            .then(collected => {
              if (collected.first().emoji.name == "⭕") {
                message.guild.channels
                  .create(message.content, {
                    type: "text",
                    topic: message.author.username + "が作成。",
                    parent: "726000943212003368",
                    permissionOverwrites: [
                      {
                        id: "726000947175620629",
                        allow: ["VIEW_CHANNEL"],
                        deny: ["MANAGE_WEBHOOKS"]
                      },

                      {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL"]
                      }
                    ]
                  })
                  .then(ch => {
                    sentMessage.edit({
                      embed: {
                        color: "RANDOM",
                        title: "チャンネルを作りました。",
                        description: "チャンネル➜<#" + ch.id + ">"
                      }
                    });
                    ch.send(
                      message.member.displayName +
                        "が作成しました。\nこのチャンネルを間違えて作ってしまった、または消したいと思ったら⭕を押してください。\n特に消す予定なしって方は❌を押してください。"
                    ).then(msg => {
                      msg.react("⭕").then(r => {
                        msg.react("❌");
                      });
                      msg
                        .awaitReactions(
                          (reaction, user) =>
                            user.id == message.author.id &&
                            (reaction.emoji.name == "⭕" ||
                              reaction.emoji.name == "❌"),
                          { max: 1 }
                        )
                        .then(collected => {
                          if (collected.first().emoji.name == "⭕") {
                            msg.edit("チャンネルを消します。");
                            msg.channel.delete();
                          } else
                            msg.edit("キャンセルされました。").then(mes => {
                              mes.delete();
                            });
                        })
                        .catch(() => {
                          msg.edit("キャンセルされました");
                        });
                    });
                  });
              } else
                sentMessage.edit({
                  embed: {
                    color: "RANDOM",
                    description: "キャンセルされました。"
                  }
                });
            })
            .catch(() => {
              message.edit({
                embed: {
                  color: "RANDOM",
                  description:
                    "リアクションが一分間押されなかったのでキャンセルされました。"
                }
              });
            });
        });
    }
});

client.on("message", message => {
  if (message.content.startsWith("Sc+Shutdown")) {
    if (!message.author.id === "645581794267234315") return;
    process.exit();
  }
});

client.on("message", message => {
  if (message.channel.id !== "708955825087053896") return;
  if (message.content === "Ad!push") {
    message.delete();
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

    sleep(30, function() {
      message.channel.send("Ad!push");
    });
  }
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

  sleep(30, function() {
    message.delete();
  });
});

client.on("ready", () => {
  cron.schedule("0 * * * *", () => {
    const jphours = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    ).getHours();
    const comment = [
      "暇だーって方はここでぜひ話してください!",
      "たくさん話してねー",
      "忙しい方は頑張ってください!",
      "友達を積極的に誘って下さい!!"
    ];
    const random = Math.floor(Math.random() * comment.length);
    client.channel.cache.forEach(channel => {
    if(channel.name === "💬┇主雑談") {
    channel.send({
      embed: {
        color: "RANDOM",
        title: "時報です。",
        description:
          "**" + jphours + "時になりました。**\n> " + comment[random],
        thumbnail: {
          url:
            "https://cdn.glitch.com/54a9aaa2-c952-46a9-8b02-fb5d02b4f5a0%2F3f8240fa1d16d0de6d4e7510b43b37ba.gif?v=1590394933876"
        }
      }
    });
    }})
  });
});

client.on("guildMemberRemove", async member => {
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px DejaVu`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
  const channel = member.guild.channels.cache.find(ch => ch.name === "👋┇退場");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/54a9aaa2-c952-46a9-8b02-fb5d02b4f5a0%2F%E7%84%A1%E9%A1%8C107_20200430221338.png?v=1588832390482"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px DejaVu";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "来てくれてありがとう!,",
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}さん!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}さん!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "goodbye-image.png"
  );

  channel
    .send({
      embed: {
        author: {
          name: member.user.username + "がこのサーバーから去りました。",
          icon_url: member.user.displayAvatarURL()
        },
        title: "また来てくださいね!",
        description: "またあなたをお待ちしております!",
        color: "RANDOM",
        timestamp: new Date()
      }
    })
    .then(() => channel.send(attachment));
});

client.on("guildMemberAdd", async member => {
  //      member.roles.add("707528684873056326")
  //    .then(() => member.roles.add("707902794052403230"))

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px DejaVu`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
  const channel = member.guild.channels.cache.find(ch => ch.name === "📌┇入場");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/daf383c7-b734-4d70-a899-18ab5da5c8db%2F%E7%84%A1%E9%A1%8C107_20200430221338.png?v=1588252454960"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px DejaVu";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("サーバーへようこそ,", canvas.width / 2.5, canvas.height / 3.5);

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}さん!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}さん!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  channel
    .send({
      embed: {
        author: {
          name: member.user.username + "が来たよ!!",
          icon_url: member.user.displayAvatarURL()
        },
        title: "🕊Discord史上平和なサーバーへようこそ🕊",
        description:
          "まずは <#706819353940590642> で設定をして下さい。\nそして <#706869952753172540> で挨拶をしましょう。\n**平和に過ごせるようなサーバー作りを皆様としましょう!**\n```サーバーの雰囲気や風紀が合わなかったら即抜けして頂いても構いません!\n利用規約は必ず守って下さい。```**只今の人数は" +
          member.guild.members.cache.size +
          "人です。**",
        color: "RANDOM",
        timestamp: new Date()
      }
    })
    .then(() => channel.send(attachment));
});

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

  if (command === "lockdown") {
    if (!client.lockit) client.lockit = [];
    let time = args.join(" ");
    let validUnlocks = ["relase", "unlock"];
    if (!time)
      return message.channel.send("You must set a duration for the lockdown!");

    if (validUnlocks.includes(time)) {
      message.channel
        .overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        })
        .then(() => {
          message.channel.send("Lockdown has been lifted!");
          clearTimeout(client.lockit[message.channel.id]);
          delete client.lockit[message.channel.id];
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      message.channel
        .overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        })
        .then(() => {
          message.channel
            .send(`Channel Locked for ${ms(ms(time), { long: true })}`)
            .then(() => {
              client.lockit[message.channel.id] = setTimeout(() => {
                message.channel
                  .overwritePermissions(message.guild.id, {
                    SEND_MESSAGES: false
                  })
                  .then(message.channel.send("Lockdown Lifted"))
                  .catch(console.error);
                delete client.lockit[message.channel.id];
              }, ms(time));
            })
            .catch(error => {
              console.log(error);
            });
        });
    }
  }

  if (command === "topic") {
    const topic = args.join(" ");
    message.channel.setTopic("```"+topic+"```")
  }
  
  if (command === "auth") {
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 300);

      // Return the result to use in the actual canvas
      return ctx.font;
    };

    const auth_data1 = Math.floor(Math.random() * 10);
    const auth_data2 = Math.floor(Math.random() * 10);
    const auth_a = auth_data1 + auth_data2;

    const canvas = Canvas.createCanvas(980, 500);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/54a9aaa2-c952-46a9-8b02-fb5d02b4f5a0%2F%E7%84%A1%E9%A1%8C112_20200506152448.png?v=1588746330343"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Assign the decided font to the canvas
    ctx.font = applyText(canvas, auth_data1 + " + " + auth_data2);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      +auth_data1 + " + " + auth_data2,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      "https://cdn.glitch.com/fcd0884c-187a-413e-ade3-3511e7eea35c%2F%E7%84%A1%E9%A1%8C111_20200505161822.png?v=1588663142150"
    );
    ctx.drawImage(avatar, 25, 25, 180, 180);

    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "AuthPicture.png"
    );
    message.delete();
    message.channel.send("この問題を10秒で解きなさい", attachment).then(m => {
      m.delete({ timeout: 10000 });
    });

    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 10000
      })
      .then(collected => {
        if (collected.first().content.toLowerCase() == auth_a) {
          collected.first().delete({ timeout: 1000 });
          message
            .reply("正解!答えは" + auth_a + "だよ!!")
            .then(msg2 => {
              msg2.delete({ timeout: 1000 });
            })
            .then(() => message.member.roles.add("707529227515330651"))
            .then(() => message.member.roles.remove("707528684873056326"));
          client.channels.cache.forEach(channel => {
            if (channel.name === "🔒┇auth-message") {
              channel.send(
                message.author.username + "がこのサーバーの認証を行いました。"
              );
            }
          });
        } else {
          collected.first().delete({ timeout: 1000 });
          message
            .reply("残念…答えは" + auth_a + "だよ…もう一度Sc+authを打ってね！")
            .then(msg => {
              msg.delete({ timeout: 1000 });
            });
        }
      })
      .catch(() => {
        message.reply("タイムアップ!もう一度Sc+authを打ってね!").then(msg1 => {
          msg1.delete({ timeout: 1000 });
        });
      });
  }
});

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
