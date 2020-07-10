const Discord = require("discord.js"),
    Util = require("util"),
    fs = require("fs"),
    Moment = require("moment"),
    util = {
        parseAuthor: function (Client, message, arguments) {
            try {
                if (/<@![0-9]+>/g.test(message)) {
                    return message.mentions.members.first();
                }
                if (message.guild.member(arguments[0])) {
                    return message.guild.member(arguments[0]);
                }
                return message.member;
            } catch (e) {
                console.log(e.message);
                return "Error occurred while getting User!"
            }
        },
        degrees: function (d1, d2, num) {
            let poss = ["k", "f", "c"];
            if (!poss.includes(d1.toLowerCase())) return "Possible units are C, F and K.";
            if (!poss.includes(d2.toLowerCase())) return "Possible units are C, F and K.";
            if (!typeof num == "number") return "Degrees must be a number.";
            d1 = d1.toUpperCase();
            d2 = d2.toUpperCase();
            num = Number(num);
            return Number(util.table[`${d1}2${d2}`](num));
        },
        table: {
            C2F: (x) => { return x * 1.8 + 32 },
            F2C: (x) => { return (x - 32) * 5 / 9 },
            K2C: (x) => { return x - 273 },
            C2K: (x) => { return x + 273 },
            K2F: (x) => { return table.C2F(x - 273) },
            F2K: (x) => { return table.F2C(x) + 273 }
        },
        clean: (text) => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        },
        async fishList(Message, Client, Arguments) {
            var embed = new Discord.RichEmbed().setTitle("**POINTS**").setColor("#a00eef");
            if (Arguments[1] !== "all") {
                let pos = await Client._Client.DatabaseClient.getPosition(Message.author.id);
                let points = await Client._Client.DatabaseClient.getPoints(Message.author.id);
                embed.addField(Message.author.username,`${points}   (${pos}.)`);
                return embed;
            } else {
                let topfive = await Client._Client.DatabaseClient.getTopFiveScores();
                //let topfiveID = await Client._Client.DatabaseClient.getTopFiveIds();
                for (let u in topfive) {
                    let points = topfive[u].Points;
                    let pos = parseInt(u)+1;

                    let username = await Client.fetchUser(topfive[u].UserId);
                    embed.addField(username.username, `${points}  (${pos}.)`);
                }
                return embed;
            }
        }
    };


module.exports = util;