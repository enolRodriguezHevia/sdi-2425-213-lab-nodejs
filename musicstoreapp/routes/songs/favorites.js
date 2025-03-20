const {ObjectId} = require('mongodb');
module.exports = function (app, favoriteSongsRepository, songsRepository) {
    app.get('/songs/favorites', function (req, res) {
        let filter = {};
        let options = {};

        favoriteSongsRepository.getFavorites(filter, options).then(favorites => {
            let sum = favorites.reduce((acc, curr) => acc + Number(curr.price), 0);

            res.render("songs/favorites.twig", {favorites: favorites, priceSum:sum});
        }).catch(error => {

            console.log("Causa del error: " + error);
        });
    });

    app.post('/songs/favorites/add/:song_id', function (req, res) {
        let songId = req.params.song_id;

        let filter = {_id: new ObjectId(songId)};

        let favorite;

        songsRepository.findSong(filter, {})
            .then( song => {
                favorite = {
                    song_id: songId,
                    date: new Date().toLocaleTimeString('es-ES', { hour12: false }),
                    price: song.price,
                    title: song.title,
                    user: req.session.user
                }

                favoriteSongsRepository.insertFavorite(favorite, function(result){
                    if(result !== null && result !== undefined){
                        res.redirect("/songs/favorites");
                    } else {
                        console.log("Error al insertar canción como favorita " + result);
                    }
                });
            })

    });

    app.get('/songs/favorites/delete/:favorite_id', function(req, res){

        let idFavorite = req.params.favorite_id;
        let filter = {_id: new ObjectId(idFavorite)};

        favoriteSongsRepository.deleteFavorite(filter, (result) => {
            if (result.error) {
                res.send("Error al eliminar de favoritos esa canción.");
            } else {
                res.redirect('/songs/favorites');
            }
        });
    });

}