export function onYouTubeIframeAPIReady() {
    initYouTubeMusicPlayer();
}

function initYouTubeMusicPlayer() {
    // API Key and dynamic playlist loading removed for security and functionality on GitHub Pages.
    // The playlist is now hardcoded below.

    const playerContainer = document.getElementById('music-player-container');
    const playerElement = document.getElementById('music-player');
    const albumArt = document.getElementById('player-album-art');
    const title = document.getElementById('player-title');
    const progress = document.getElementById('player-progress');
    const progressContainer = document.getElementById('player-progress-container');
    const playBtn = document.getElementById('player-play');
    const prevBtn = document.getElementById('player-prev');
    const nextBtn = document.getElementById('player-next');
    const progressRing = document.querySelector('.progress-ring__circle');
    const miniPlayerIcon = document.getElementById('mini-player-icon');

    if (!playerElement) return;

    const radius = progressRing.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;
    
    let ytPlayer;
    let playlist = [];
    let currentTrackIndex = 0;
    let isReady = false;
    let progressInterval = null;

    ytPlayer = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    function onPlayerReady(event) {
        isReady = true;
        loadHardcodedPlaylist();
    }

    function onPlayerStateChange(event) {
        updatePlayPauseIcon(event.data);
        
        if (event.data === YT.PlayerState.ENDED) {
            let nextIndex = (ytPlayer.getPlaylistIndex() + 1) % playlist.length;
            ytPlayer.playVideoAt(nextIndex);
            updatePlayerUI(nextIndex);
        }
    }

    function loadHardcodedPlaylist() {
        // Playlist is hardcoded here to avoid using an API key on the client-side.
        // To add more songs, add new objects to this array with a videoId, title, and thumbnail URL.
        playlist = [
            { videoId: 'fSrwcaXLS5M', title: 'Lofi Girl - beats to relax/study to', thumbnail: 'https://i.ytimg.com/vi/fSrwcaXLS5M/default.jpg' },
            { videoId: 'jfKfPfyJRdk', title: 'lofi hip hop radio 📚 - beats to relax/study to', thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/default.jpg' }
        ];

        const videoIds = playlist.map(track => track.videoId);
        ytPlayer.cuePlaylist(videoIds);
        
        updatePlayerUI(0);
    }
    
    function playTrack() {
        if (!isReady || playlist.length === 0) return;
        ytPlayer.playVideo();
        startProgressUpdater();
    }

    function pauseTrack() {
        if (!isReady) return;
        ytPlayer.pauseVideo();
        stopProgressUpdater();
    }

    function nextTrack() {
        if (!isReady || playlist.length === 0) return;
        let nextIndex = (ytPlayer.getPlaylistIndex() + 1) % playlist.length;
        ytPlayer.playVideoAt(nextIndex);
        updatePlayerUI(nextIndex);
    }

    function prevTrack() {
        if (!isReady || playlist.length === 0) return;
        let prevIndex = ytPlayer.getPlaylistIndex() - 1;
        if (prevIndex < 0) {
            prevIndex = playlist.length - 1;
        }
        ytPlayer.playVideoAt(prevIndex);
        updatePlayerUI(prevIndex);
    }

    function seek(event) {
        if(!isReady || !ytPlayer.getDuration) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const duration = ytPlayer.getDuration();
        if (duration) {
            const seekTime = (clickX / width) * duration;
            ytPlayer.seekTo(seekTime, true);
            
            const percent = (seekTime / duration) * 100;
            progress.style.width = `${percent}%`;
        }
    }

    function updatePlayerUI(trackIndex) {
        if (!playlist[trackIndex]) return;
        const track = playlist[trackIndex];
        title.textContent = track.title;
        albumArt.src = track.thumbnail;
    }

    function updatePlayPauseIcon(playerState) {
        const albumArt = document.getElementById('player-album-art');

        if (playerState === YT.PlayerState.PLAYING) {
            playBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
            startProgressUpdater();
            albumArt.classList.add('is-playing');
            miniPlayerIcon.classList.add('is-playing');
        } else {
            playBtn.innerHTML = '<i data-lucide="play" class="w-6 h-6"></i>';
            stopProgressUpdater();
            albumArt.classList.remove('is-playing');
            miniPlayerIcon.classList.remove('is-playing');
        }
        lucide.createIcons();
    }
    
    function startProgressUpdater() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const currentTime = ytPlayer.getCurrentTime();
            const duration = ytPlayer.getDuration();
            const percent = (duration > 0) ? (currentTime / duration) * 100 : 0;
            progress.style.width = `${percent}%`;

            const offset = circumference - (percent / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
        }, 500);
    }

    function stopProgressUpdater() {
        clearInterval(progressInterval);
    }

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const playerState = ytPlayer.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextTrack(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevTrack(); });
    progressContainer.addEventListener('click', seek);
}