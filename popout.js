// Playlist data - Add your tracks here
const playlist = [
  {
    file: "Track1.mp3",
    name: "Summer Vibes",
    artist: "Artist One",
    duration: "3:45",
    emoji: "🌅"
  },
  {
    file: "Track2.mp3",
    name: "Night Drive",
    artist: "Artist Two",
    duration: "4:12",
    emoji: "🌙"
  },
  {
    file: "Track3.mp3",
    name: "Electric Dreams",
    artist: "Artist Three",
    duration: "3:28",
    emoji: "⚡"
  }
];

// State
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffled = false;

// DOM Elements
const audioPlayer = document.getElementById("player");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const trackName = document.getElementById("trackName");
const trackArtist = document.getElementById("trackArtist");
const albumArt = document.getElementById("albumArt");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistSection = document.getElementById("playlistSection");
const volumeSlider = document.getElementById("volumeSlider");
const volumeFill = document.getElementById("volumeFill");

// Initialize
function init() {
  renderPlaylist();
  loadTrack(currentTrackIndex);
  setupEventListeners();
  audioPlayer.volume = 0.7;
}

// Render playlist
function renderPlaylist() {
  const playlistHeader = playlistSection.querySelector('.playlist-header');
  
  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    if (index === currentTrackIndex) {
      item.classList.add('active');
    }
    
    item.innerHTML = `
      <div class="playlist-icon">${track.emoji}</div>
      <div class="playlist-info">
        <div class="playlist-name">${track.name}</div>
        <div class="playlist-duration">${track.artist} • ${track.duration}</div>
      </div>
    `;
    
    item.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
      updatePlaylistUI();
    });
    
    playlistSection.appendChild(item);
  });
}

// Load track
function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.file;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
  albumArt.textContent = track.emoji;
  
  // Reset progress
  progressFill.style.width = '0%';
  currentTimeEl.textContent = '0:00';
}

// Play track
function playTrack() {
  audioPlayer.play().then(() => {
    isPlaying = true;
    playBtn.textContent = '⏸';
    updatePlaylistUI();
  }).catch((error) => {
    console.log("Playback failed:", error);
  });
}

// Pause track
function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

// Toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

// Next track
function nextTrack() {
  if (isShuffled) {
    currentTrackIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    playTrack();
  }
  updatePlaylistUI();
}

// Previous track
function prevTrack() {
  if (audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
  } else {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      playTrack();
    }
    updatePlaylistUI();
  }
}

// Toggle shuffle
function toggleShuffle() {
  isShuffled = !isShuffled;
  shuffleBtn.style.background = isShuffled 
    ? 'linear-gradient(135deg, #1ed760 0%, #17a74a 100%)' 
    : 'rgba(255, 255, 255, 0.1)';
}

// Update playlist UI
function updatePlaylistUI() {
  const items = playlistSection.querySelectorAll('.playlist-item');
  items.forEach((item, index) => {
    if (index === currentTrackIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress
function updateProgress() {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFill.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
}

// Seek
function seek(e) {
  const bounds = progressBar.getBoundingClientRect();
  const percent = (e.clientX - bounds.left) / bounds.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
}

// Update volume
function updateVolume(e) {
  const bounds = volumeSlider.getBoundingClientRect();
  const percent = (e.clientX - bounds.left) / bounds.width;
  const volume = Math.max(0, Math.min(1, percent));
  audioPlayer.volume = volume;
  volumeFill.style.width = `${volume * 100}%`;
}

// Setup event listeners
function setupEventListeners() {
  // Controls
  playBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', nextTrack);
  prevBtn.addEventListener('click', prevTrack);
  shuffleBtn.addEventListener('click', toggleShuffle);
  
  // Audio events
  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', nextTrack);
  audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
  });
  
  // Progress bar
  progressBar.addEventListener('click', seek);
  
  // Volume
  volumeSlider.addEventListener('click', updateVolume);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.code === 'ArrowRight') {
      nextTrack();
    } else if (e.code === 'ArrowLeft') {
      prevTrack();
    }
  });
}

// Initialize on load
init();