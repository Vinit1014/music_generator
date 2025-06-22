import {create} from 'zustand';

export const useTrackStore = create((set) => ({
    selectedMood: '',
    selectedGenre: '',
    generateLoading: false,
    currentTrack: null,
    likedTracks: [],
    recentTracks: [],
    playingTrackUrl: null,
    setMood: (mood) => set({ selectedMood: mood }),
    setGenre: (genre) => set({ selectedGenre: genre}),
    setGenerateLoading: (val) => set({ generateLoading: val }),
    setCurrentTrack: (track) => set({ currentTrack: track }),
    toggleLikeTrack: (track) => set((state) => {
        const alreadyLiked = state.likedTracks.some((t) => t.url === track.url);
        const updated = alreadyLiked ? state.likedTracks.filter((t)=> t.url !== track.url) : [...state.likedTracks, track];

        localStorage.setItem('likedTracks', JSON.stringify(updated));
        return { likedTracks: updated};
    }),
    initializeLikes: () => {
        const saved = localStorage.getItem('likedTracks');
        if (saved) {
            set({ likedTracks: JSON.parse(saved) });
        }
    },
    addRecentTrack: (track) => set((state)=>{
        const updated = [track, ...state.recentTracks.filter(t => t.url !== track.url)];
        const limited = updated.slice(0, 2);

        localStorage.setItem('recentTracks', JSON.stringify(limited));
        return { recentTracks: limited };
    }),
    initializeRecents: () => {
        const saved = localStorage.getItem('recentTracks');
        if (saved) {
            set({ recentTracks: JSON.parse(saved) })
        }
    },
    setPlayingTrackUrl: (url) => set({ playingTrackUrl: url }),
}));

