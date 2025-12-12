# 🎵 GrooveBox Music Player

A Chrome extension music player with a sleek dark interface, playlist management, and intuitive playback controls.

## Features

- 🎨 Modern dark theme with vibrant green accents
- 📋 Interactive playlist - click any track to play
- ⏯ Full playback controls (play, pause, next, previous, shuffle)
- 🎚 Volume control slider
- ⏱ Progress bar with time tracking
- 🪟 Pop-out window mode for multitasking
- ⌨ Keyboard shortcuts support
- 🎯 Zero permissions required

## Files Structure

<img width="622" height="207" alt="image" src="https://github.com/user-attachments/assets/b69b161f-a669-46a2-8cba-90a6166cb26a" />



## Installation
### Clone the repository
```bash
git clone https://github.com/anushkaChat10/GrooveBox.git
cd GrooveBox

```

### Load on Chrome
1. Open Chrome and navigate to chrome://extensions/
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the cloned directory
4. The extension will be loaded and ready to use

## Usage

1. Click the GrooveBox icon in your Chrome toolbar
2. Select any track from the playlist to start playing
3. Use the playback controls to manage your music
4. Click "↗ Pop Out" to open the player in a separate window

### Keyboard Shortcuts
- Space - Play/Pause
- Arrow Right - Next track
- Arrow Left - Previous track

## Customization

### Adding Your Own Music

1. Add your MP3 files to the project folder

2. Update manifest.json:
```json
"web_accessible_resources": [
  {
    "resources": ["Track1.mp3", "Track2.mp3", "YourSong.mp3"],
    "matches": ["<all_urls>"]
  }
]
```

3. Edit the playlist in popout.js:
```javascript
const playlist = [
  {
    file: "YourSong.mp3",
    name: "Song Name",
    artist: "Artist Name",
    duration: "3:45",
    emoji: "🎸"
  }
];

```
4. Reload the extension in Chrome

### Changing Theme Color

Replace #1DB954 throughout popout.html with your preferred color:
- Purple: #8B5CF6
- Blue: #3B82F6
- Red: #EF4444
- Orange: #F97316

## Technologies Used

- HTML5
- CSS3 (Gradients, Flexbox, Animations)
- Vanilla JavaScript
- Chrome Extension Manifest V3
- Web Audio API

## Troubleshooting

*Extension won't load*
- Ensure Developer mode is enabled
- Check all files are in the same folder
- Verify manifest.json syntax

*Music won't play*
- Confirm MP3 files are in the extension folder
- Check filenames in popout.js match actual files
- Try reloading the extension

*Pop-out window doesn't open*
- Check if pop-ups are blocked in Chrome settings
- Allow pop-ups for the extension

## Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature/new-feature
3. Commit changes: git commit -m "Add new feature"
4. Push to branch: git push origin feature/new-feature
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Screenshots

<img width="474" height="751" alt="image" src="https://github.com/user-attachments/assets/a4408e1d-085c-4375-9e9b-14b74a86ed41" />
