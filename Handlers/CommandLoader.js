const fs = require("fs"),
    path = require("path"),
    pathName = path.join(path.dirname(module.parent.filename).replace("\Handlers", ""), "Data", "Commands"),
    util = require("util"),
    readdirpr = util.promisify(fs.readdir);
const loader = {
    commands: {},
    load: async function () {
        let commandsList = await readdirpr(pathName);
        for (i = 0; i < commandsList.length; i++) {
            let item = commandsList[i];
            if (item.match(/\.js$/)) {
                delete require.cache[require.resolve(path.join(pathName, item))];
                this.commands[item.slice(0, -3)] = require(path.join(pathName, item));
            }
        }
        console.log(`Commands Loaded! [${Object.keys(this.commands).length}]`);
        return this.commands;
    }
}

module.exports = loader