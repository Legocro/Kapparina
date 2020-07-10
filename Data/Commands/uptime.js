const moment = require("moment");

const uptime = {
    run: function (Message, Client, Arguments) {
        let time = new Date().getTime() - Client.uptime;
        Message.channel.send(moment(time).utc().format('MMMM Do YYYY, h:mm:ss a') + " UTC" + "    (" + moment.duration(Client.uptime * -1).humanize(true) + ")");
    },

    config: {
        permissionLevel: 0
    }

}

module.exports = uptime;