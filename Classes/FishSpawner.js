const CH_GENERAL_CHAT_ID = "104739787872694272";
const FISH_REACTION_ID = "540612753363304449";
const MINUTE = 60000;
const THIRTY_MINUTES = MINUTE*30;

class FishSpawner {


    constructor(MainClient) {
        this._Client = MainClient;
        this._Client.DiscordClient.on("ready", () => { this.setup() });

        this.spawnfish = true;
        this.fishSpawned = false
        this.timer = null
        this.fishChannel = null
        this.fishMessage = null
    }

    async setup() {
        await this.getChannel();
        await this.getMessage();
        await this.setTimer();
    }
    async spawnFish() {
        if (!this.fishSpawned && this.spawnfish) {
            this.fishSpawned = true;
            await this.fishMessage.react(FISH_REACTION_ID);
            let collection = await this.fishMessage.awaitReactions(this.fishFilter, { maxUsers: 1, time: MINUTE*2 }).catch(console.error);
            
            if (collection.size == 0) {
                await this.fishMessage.reactions.sweep(r => r.emoji.id !== FISH_REACTION_ID);
                await this.fishMessage.reactions.first().removeAll();
                this.fishSpawned = false;
                return;
            }

            let reaction = collection.first();
            reaction.users.sweep(u => u.id == this._Client.DiscordClient.user.id);
            let winner = reaction.users.first();
            let points = 5 + Math.ceil(5 * Math.random());
            await this._Client.DatabaseClient.createRow(winner.id);
            let current = await this._Client.DatabaseClient.getPoints(winner.id);
            await this._Client.DatabaseClient.addPoints(winner.id, points);
            await reaction.removeAll();
            this.fishSpawned = false;
        }
    }

    async getMessage() {
        await this.fishChannel.fetchMessages();
        this.fishMessage = this.fishChannel.lastMessage;
    }
    getChannel() {
        this.fishChannel = this._Client.DiscordClient.channels.get(CH_GENERAL_CHAT_ID);
    }

    async setTimer() {
        this.timer = this._Client.DiscordClient.setTimeout(() => { this.setTimer() }, THIRTY_MINUTES+Math.ceil(THIRTY_MINUTES*Math.random())); //1800000 + Math.ceil(1800000*Math.random());
        await this.getMessage();
        await this.spawnFish();
    }
    fishFilter(reaction, user) {
        return !user.bot && reaction.emoji.id == FISH_REACTION_ID;
    }
}

module.exports = FishSpawner;