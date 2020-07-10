class DatabaseClient {
    constructor(MainClient) {
        this._Client = MainClient;
        this.sql = require("sqlite");
        this.start();
    }

    async start() {
        await this.sql.open("./bot.sqlite");
        await this.sql.run("CREATE TABLE IF NOT EXISTS FishGame (UserId TEXT PRIMARY KEY, Points INTEGER, Timestamp TEXT)")
    }

    async createRow(id) {
        await this.sql.run(`INSERT OR IGNORE INTO FishGame (UserId, Points, Timestamp) VALUES ("${id}", 0, "xx")`);
    }

    async getPoints(id) {
        let fish = await this.sql.get(`SELECT Points FROM FishGame WHERE UserId = "${id}"`).catch((e) => {
            console.error;
            this.sql.run("CREATE TABLE IF NOT EXISTS FishGame (UserId TEXT PRIMARY KEY, Points DOUBLE PRECISION, Timestamp TEXT)").then(async () => {
                //this.sql.run(`INSERT INTO Coins (UserId, Coins, Address, LastBalance) VALUES ("${id}", 0, "xx", 0)`);
                await this.createRow(id);
            })
        })
        if (fish != undefined) return fish.Points;
        return 0;
    }

    async setPoints(id, points) {
        let success = await this.sql.run(`UPDATE FishGame SET Points = ${points} WHERE UserId = "${id}"`).catch(e => console.error(e));
    }

    async addPoints(id, points) {
        let currentPoints = await this.getPoints(id);
        this.setPoints(id, currentPoints + points);
    }

    async getPosition(id) {
        let rows = await this.sql.all("SELECT UserId FROM FishGame ORDER BY Points DESC").catch(console.error);
        return rows.findIndex((row) => row.UserId == id) + 1;
    }

    async getTopFiveScores(){
        let rows = await this.sql.all("SELECT UserId, Points from FishGame ORDER BY Points DESC LIMIT 5").catch(console.error);
        return rows;
    }

}

module.exports = DatabaseClient