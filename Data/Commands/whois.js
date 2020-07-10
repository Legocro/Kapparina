const Discord = require("discord.js"),
    Moment = require("moment");

const whois = {

    run: async function (Message, Client, Arguments) {
        const embed = new Discord.RichEmbed(),
            author = Client.Util.parseAuthor(Client, Message, Arguments);
        if (typeof author === "string") return Message.channel.send(author);
        let color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        embed.setTitle("**User info**")
            .setTimestamp()
            .setColor(color)
            .setThumbnail(author.user.avatarURL)
            .addField("**Name**", `${author.user.username}   (${author.nickname || author.user.username})   <${author.id}>`)
            .addField("**Account created at**", Moment(author.user.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a') + " UTC" + "    (" + Moment.duration(author.user.createdTimestamp - new Date().getTime()).humanize(true) + ")")
            .addField("**Joined server at**", Moment(author.joinedAt).utc().format('MMMM Do YYYY, h:mm:ss a') + " UTC" + "    (" + Moment.duration(author.joinedTimestamp - new Date().getTime()).humanize(true) + ")")
            .addField("**Roles**", author.roles.map(r => r.name).join(" , "))
            .addField("**Status**", author.presence.status + ` (Playing ${author.presence.game ? author.presence.game.name : "Nothing."})`)
        Message.channel.send({ embed });
    },

    config: {
        permissionLevel: 0
    }

}

module.exports = whois;