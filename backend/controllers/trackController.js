const { moods, genres, getTracks } = require('../data/tracks');
const { FRONTEND_BASE_URL } = require('../config');
exports.getMoods = (req, res) => res.json(moods);
exports.getGenres = (req, res) => res.json(genres);
exports.getFilteredTracks = (req, res) => {
  const { mood, genre } = req.query;
  const tracks = getTracks(FRONTEND_BASE_URL);

  const filtered = tracks.filter((t) => {
    return (
      (!mood || t.mood === mood) ||
      (!genre || t.genre === genre)
    );
  });

  res.json(filtered);
};
