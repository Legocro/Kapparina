const { arg } = require("mathjs");



const fish = {
    run: async function (Message, Client, Arguments) {
        let command = Arguments[0];
        switch (command) {
            case "list": 
                let embed = await Client.Util.fishList(Message, Client, Arguments);
                Message.channel.send({embed});
                break;
        }
    },

    config: {
        permissionLevel: 0
    }
}

module.exports = fish;