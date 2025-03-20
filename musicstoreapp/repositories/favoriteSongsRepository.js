module.exports = {
    mongoClient: null,
    database: "musicStore",
    app: null,
    collectionName: "favorites",

    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    getFavorites: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoritesCollection = database.collection(this.collectionName);
            const favorites = await favoritesCollection.find(filter, options).toArray();
            return favorites;
        } catch (error) {
            throw (error);
        }
    },
    insertFavorite: function (favorite, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favoritesCollection = database.collection(this.collectionName);
                favoritesCollection.insertOne(favorite)
                    .then(result => callbackFunction(result.insertedId))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    },
    deleteFavorite: function (idFavorite, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favoritesCollection = database.collection(this.collectionName);
                favoritesCollection.deleteOne(idFavorite)
                    .then(result => callbackFunction(result.deletedCount))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}));
    }
};