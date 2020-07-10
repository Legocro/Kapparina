const DiscordClient = require("./Classes/DiscordClient"),
    DatabaseClient = require("./Classes/Database"),
    FishSpawner = require("./Classes/FishSpawner");

class BotClient {

    constructor() {
        this.DiscordClient = new DiscordClient(this);
        this.DatabaseClient = new DatabaseClient(this);
        this.FishSpawner = new FishSpawner(this);
    }

}

const Client = new BotClient();