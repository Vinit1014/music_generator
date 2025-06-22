//This I kept only in case backend apis fail. API calling for all of them is done from services/api.js
export const moods = ['Happy', 'Sad', 'Energetic', 'Chill'];
export const genres = ['Pop', 'Lo-fi', 'Cinematic', 'EDM'];

export const mockTracks = [
  {
    title: 'Sunny Vibes',
    url: '/assets/good-vibes.mp3',  
    mood: 'Happy',
    genre: 'Pop'
  },
  {
    title: 'Midnight Rain',
    url: '/assets/midnight-highway.mp3',
    mood: 'Sad',    
    genre: 'Lo-fi'
  },
  {
    title: 'Epic Pulse',
    url: '/assets/epic-hollywood.mp3',
    mood: 'Energetic',
    genre: 'Cinematic'
  },
  {
    title: 'Chill Zone',
    url: '/assets/chill.mp3',
    mood: 'Chill',
    genre: 'EDM'
  }
];