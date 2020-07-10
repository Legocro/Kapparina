const ajax = require("superagent");
const Discord = require("discord.js");

const xkcd = {
    run: function(Message, Client, Arguments){
        try{
            let id = Arguments[0];
            let callback = (e,r) => {
                if (e || !r.ok){
                    Message.channel.send("Something went wrong");
                    console.log(e.stack);
                    console.log(r);
                }else{
                    let comic = r.body;
                    let yes = new Discord.RichEmbed()
                    .setAuthor(`xkcd #${comic.num}`, null , `https://xkcd.com/${comic.num}`)
                    .setImage(comic.img)
                    .addField("**Title**" , comic.title , true)
                    .addField("**Mouseover text**" , comic.alt , true)
                    .setTimestamp();
                    Message.channel.send({embed : yes});
                }
            }
        
            ajax
            .get(`http://xkcd.com/${id}/info.0.json`)
            .end(callback);
        }catch(e){
            console.log(e.stack);
        }
    },
    config: {
        permissionLevel: 0
    }
}

module.exports = xkcd;