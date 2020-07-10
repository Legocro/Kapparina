const mathjs = require("mathjs");
const { exp } = require("mathjs");
const math = mathjs.create({ number: "BigNumber" });


const expr = {
    run: (Message, Client, Arguments) => {
        try {
            var expression = Arguments.join(" ");
            var evaled = math.eval(expression);
            Message.channel.send(`\*\*INPUT:\*\* \n \`\`\`${expression}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${evaled}\`\`\``);
        } catch (e) {
            Message.channel.send(`\*\*INPUT:\*\* \n \`\`\`${expression}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${expression}\`\`\``);
        }
    },
    config: {
        permissionlevel: 0
    }
}

module.exports = expr;