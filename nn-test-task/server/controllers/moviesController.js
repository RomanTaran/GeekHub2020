const {Movies} = require("../models/movies");

exports.get_movies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send("Server error. Reload page");
  }
}

exports.add_movies = async (req, res) => {
  try {
    let movies = new Movies(req.body);
    movies = await movies.save();
    res.send(movies);
  } catch (e) {
    res.status(500).send("Server error. Reload page");
  }

}

exports.delete_movies = async (req, res) => {
  try {
    const movies = await Movies.findById(req.params.id);
    if (!movies) return res.status(404).send("Movies didn't found in DB...");
    const deletedMovie = await Movies.findByIdAndDelete(req.params.id);
    res.send(deletedMovie);
  } catch (e) {
    res.status(500).send("Server error. Reload page");
  }
}
