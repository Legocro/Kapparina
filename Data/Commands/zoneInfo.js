
const { value, monsterHp, zoneEmbed, baseHs, monsterGold } = require("../../Classes/ZoneUtil");
const zoneinfo =
{
    run: function (Message, Client, Arguments) {
        try {
            let zone = value(Arguments);
            let hp = monsterHp(zone);
            let hs = baseHs(zone);
            let gold = monsterGold(zone);
            //	let mobs = baseMobs(zone);
            //	let tcc = baseTcc(zone);
            //	let bHp = bossHp(zone)
            let embed = zoneEmbed(zone, hs, hp, gold);
            Message.channel.send({ embed });
        } catch (e) {
            let r = typeof e === "string" ? e : e.stack
            Message.channel.send("**ERROR**" + "\n\`\`\`" + r + "\`\`\`");
        }
    },

    config: {
        permissionLevel: 0
    }
}


module.exports = zoneinfo;