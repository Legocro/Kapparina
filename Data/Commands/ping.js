const ping =
{
    run: function (Message, Client, Arguments) {
        Message.channel.send("Pong!");
    },

    config: {
        permissionLevel: 0
    }
}


module.exports = ping;