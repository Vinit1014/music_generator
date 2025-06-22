const moods = ['Happy', 'Sad', 'Energetic', 'Chill'];
const genres = ['Pop', 'Lo-fi', 'Cinematic', 'EDM'];

const getTracks = (frontendURL) => [
  {
    title: 'Sunny Vibes',
    url: `${frontendURL}/assets/good-vibes.mp3`,
    mood: 'Happy',
    genre: 'Pop',
  },
  {
    title: 'Midnight Rain',
    url: `${frontendURL}/assets/midnight-highway.mp3`,
    mood: 'Sad',
    genre: 'Lo-fi',
  },
  {
    title: 'Epic Pulse',
    url: `${frontendURL}/assets/epic-hollywood.mp3`,
    mood: 'Energetic',
    genre: 'Cinematic',
  },
  {
    title: 'Chill Zone',
    url: `${frontendURL}/assets/chill.mp3`,
    mood: 'Chill',
    genre: 'EDM',
  },
];

module.exports = { moods, genres, getTracks };
