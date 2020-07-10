const Discord = require("discord.js");
const { clean } = require("../../Classes/Util");

const Eval = {
    run: async (Message, Client, Arguments) => {
        try {
            let code;
            if (typeof (Arguments) == "string") {
                code = Arguments;
            } else {
                code = Arguments.join(" ");
            }
            console.log(code);
            let evaled = eval(code);
            console.log(typeof evaled);
            if (typeof evaled !== "string") {
                evaled = JSON.stringify(evaled);
                Message.channel.send(`\*\*INPUT:\*\* \n \`\`\`${code}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${clean(evaled)}\`\`\``);
            } else {
                Message.channel.send(`\*\*INPUT:\*\* \n \`\`\`${code}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${clean(evaled)}\`\`\``);
            }
        }
        catch (err) {
            Message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.stack)}\n\`\`\``);
        }
    },

    config: {
        perMessageissionlevel: 2
    }
}

module.exports = Eval;