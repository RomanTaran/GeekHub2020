const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
        Title: String,
        Year: String,
        Runtime: String,
        Actors: String,
        Awards: String,
        BoxOffice: String,
        Country: String,
        DVD: String,
        Director: String,
        Genre: String,
        Language: String,
        Metascore: String,
        Plot: String,
        Poster: String,
        Production: String,
        Rated: String,
        Released: String,
        Response: String,
        imdbID: String,
        imdbRating: String,
        imdbVotes: String
    })
;

const Movies = mongoose.model("Movies", movieSchema);

exports.Movies = Movies;
