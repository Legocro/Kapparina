const ajax = require("superagent");
const Discord = require("discord.js");



const urban = {

    run: function (Message, Client, Arguments) {
        try {
            let title;
            if (Arguments.length > 1) {
                title = Arguments.join(" ");
                Arguments = Arguments.join("+");
            } else {
                title = Arguments[0];
                Arguments = Arguments[0];
            }
            let query = { term: Arguments }
            let callback = (e, r) => {
                if (e || !r.ok) {
                    Message.channel.send("Something went wrong");
                    console.log(e.stack);
                    console.log(r);
                } else {
                    if (r.body.list[0] == undefined) return Message.channel.send(`Couldn't find entry for \`${title}\``);
                    let meme = new Discord.RichEmbed();
                    meme.setAuthor(title);
                    meme.addField("**Definiton**", `\`\`\`${r.body.list[0].definition}\`\`\``);
                    meme.addField("**Example**", `\`\`\`${r.body.list[0].example}\`\`\``);
                    meme.setTimestamp();
                    Message.channel.send({ embed: meme });
                }
            }
            ajax
                .get(`http://api.urbandictionary.com/v0/define?term=${Arguments}`)
                .end(callback);
        } catch (e) {
            console.error(e.stack);
        }



    },




    config: {
        permissionLevel: 0
    }
}

module.exports = urban;