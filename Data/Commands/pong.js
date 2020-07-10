const ping =
{
    run: function (Message, Client, Arguments) {
        Message.channel.send("Ping!");
    },

    config: {
        permissionLevel: 0
    }
}


module.exports = ping;