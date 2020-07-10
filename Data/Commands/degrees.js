const Util = require("../../Classes/Util");

const degrees = {
    run: function (Message, Client, Arguments) {
        try {
            let usage = "Proper usage is \`m~degrees <degrees> <unit_1> in <unit_2>\`";
            if (Arguments.length < 4 || typeof Util.degrees(Arguments[1], Arguments[3], Arguments[0]) == "string") return Message.channel.send(usage || usage + "\n" + Util.degrees(Arguments[1], Arguments[3], Arguments[0]));
            Message.channel.send(`${Arguments[0]}${Arguments[1].toUpperCase()} is equal to ${Util.degrees(Arguments[1], Arguments[3], Arguments[0]).toPrecision(4)}${Arguments[3].toUpperCase()}`);
        } catch (e) {
            console.log(e.stack);
        }
    },

    config: {
        permissionLevel: 0
    }

}

module.exports = degrees;