const Discord = require("discord.js"),
    data = require("../Data/settings.json"),
    MessageHandler = require("../Handlers/MessageHandler"),
    Util = require("../Classes/Util");

class DiscordClient extends Discord.Client {
    constructor(MainClient) {
        super();
        this._Client = MainClient;
        this.login(data.token);
        this.on("ready", function () {
            console.log("Ready!");
        })
        this.on("error", console.error);
        this.MessageHandler = new MessageHandler(this);
        this.Util = Util;
    }

}

module.exports = DiscordClient;