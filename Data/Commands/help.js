const Discord = require("discord.js");

const help = {


    run: function (Message, Client, Arguments) {
        try {
            let help = new Discord.RichEmbed();
            help.addField("**Prefix**", "m~");
            help.addField("**Commands**", Object.keys(Client.MessageHandler.Commands).join(", "));
            help.addField("**Owner**", "<@204372456339800065>");
            Message.author.send({ embed: help });
        } catch (e) {
            Message.channel.send(`Error: \`\`\`${e.stack}\`\`\``);
        }
    },


    config: {
        permissionLevel: 0
    }
}

module.exports = help;