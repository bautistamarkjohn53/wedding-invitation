(function() {
  // ===== DOM ELEMENTS =====
  const sealBtn = document.getElementById('sealBtn');
  const coverPage = document.getElementById('envelopeLayer');
  const invitationPage = document.getElementById('invitationContent');
  const closeSealBtn = document.getElementById('closeSealBtn');
  const audio = document.getElementById('bgAudio');
  const musicPlayer = document.getElementById('musicPlayer');
  const discIcon = document.getElementById('discIcon');
  const playIcon = document.getElementById('playIcon');
  const playPauseBtn = document.getElementById('playPauseBtn');

  // Video elements
  const video = document.getElementById('weddingVideo');
  const videoContainer = document.getElementById('videoContainer');
  const videoPage = document.getElementById('videoPage');
  const videoTitle = document.getElementById('videoTitle');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const playPauseVideoBtn = document.getElementById('playPauseVideoBtn');
  const videoPlayIcon = document.getElementById('videoPlayIcon');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeIcon = document.getElementById('volumeIcon');

  // Heart trigger
  const heartTrigger = document.getElementById('heartTrigger');
  if (heartTrigger) {
    heartTrigger.addEventListener('mouseenter', function() {
      document.getElementById('ellaCard').classList.add('show-photo');
      document.getElementById('jamesCard').classList.add('show-photo');
    });
    heartTrigger.addEventListener('mouseleave', function() {
      document.getElementById('ellaCard').classList.remove('show-photo');
      document.getElementById('jamesCard').classList.remove('show-photo');
    });
  }

  // Countdown elements
  const countdownSection = document.getElementById('countdownSection');
  const postWeddingSection = document.getElementById('postWeddingSection');
  const actionSection = document.getElementById('actionSection');
  const pageContent = document.querySelector('.page-content');

  let isOpen = false;
  let isAudioPlaying = false;
  let isVideoPlaying = false;
  let isPostWedding = false;

  // ===== COUNTDOWN =====
  const weddingDate = new Date('December 18, 2026 16:00:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    let diff = weddingDate - now;

    if (diff <= 0 && !isPostWedding) {
      isPostWedding = true;
      showPostWeddingView();
      launchCelebration();
      return;
    }

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  function showPostWeddingView() {
    // Hide all sections except video, thank you
    const sections = ['couplePage', 'entouragePage', 'sponsorsPage', 'detailsPage', 'musicPlayerWrapper', 'musicLabel', 'countdownSection'];
    sections.forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    document.querySelectorAll('.page-divider').forEach(function(el) {
      el.style.display = 'none';
    });

    // Show video
    if (videoPage) {
      videoPage.style.display = 'block';
      videoPage.style.visibility = 'visible';
      videoPage.style.opacity = '1';
      videoPage.style.width = '100%';
      videoPage.style.margin = '10px 0';
    }
    if (videoTitle) videoTitle.style.display = 'none';
    if (videoContainer) {
      videoContainer.style.display = 'block';
      videoContainer.style.visibility = 'visible';
      videoContainer.style.opacity = '1';
      videoContainer.style.width = '100%';
      videoContainer.style.position = 'relative';
      videoContainer.style.paddingBottom = '56.25%';
      videoContainer.style.height = '0';
      videoContainer.style.overflow = 'hidden';
    }
    if (video) {
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.objectFit = 'contain';
    }

    // Show Thank You
    if (postWeddingSection) {
      postWeddingSection.style.display = 'block';
      postWeddingSection.style.visibility = 'visible';
      postWeddingSection.style.opacity = '1';
      postWeddingSection.classList.add('active');
    }

    // Show action buttons
    const existingClone = document.getElementById('actionSectionClone');
    if (existingClone) existingClone.remove();

    if (actionSection && pageContent) {
      const actionClone = actionSection.cloneNode(true);
      actionClone.id = 'actionSectionClone';
      actionClone.style.display = 'block';
      actionClone.style.visibility = 'visible';
      actionClone.style.opacity = '1';
      actionClone.style.textAlign = 'center';
      actionClone.style.padding = '20px 0';
      actionClone.style.marginTop = '10px';
      actionClone.style.width = '100%';

      const rsvpBtnClone = actionClone.querySelector('#rsvpBtn');
      if (rsvpBtnClone) {
        rsvpBtnClone.href = 'https://m.me/janjan.delbarrio.official';
        rsvpBtnClone.target = '_blank';
      }

      const closeBtnClone = actionClone.querySelector('#closeSealBtn');
      if (closeBtnClone) {
        const newCloseBtn = document.createElement('button');
        newCloseBtn.className = closeBtnClone.className;
        newCloseBtn.id = 'closeSealBtn';
        newCloseBtn.innerHTML = closeBtnClone.innerHTML;
        newCloseBtn.style.display = 'inline-block';
        newCloseBtn.style.margin = '10px auto';
        newCloseBtn.style.cursor = 'pointer';
        newCloseBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          closeInvitation();
        });
        closeBtnClone.parentNode.replaceChild(newCloseBtn, closeBtnClone);
      }

      if (postWeddingSection) {
        postWeddingSection.parentNode.insertBefore(actionClone, postWeddingSection.nextSibling);
      } else {
        pageContent.appendChild(actionClone);
      }
    }

    if (pageContent) {
      pageContent.style.display = 'flex';
      pageContent.style.flexDirection = 'column';
      pageContent.style.alignItems = 'center';
      pageContent.style.justifyContent = 'center';
      pageContent.style.gap = '15px';
      pageContent.style.maxWidth = '100%';
      pageContent.style.width = '100%';
      pageContent.style.padding = '10px';
    }
  }

  function launchCelebration() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#1e4a3b', '#c9a84c', '#2b6b56', '#e4cf8a', '#ffffff', '#3a8a6a', '#dbb95c'];
    for (let i = 0; i < 250; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      const size = Math.random() * 8 + 3;
      confetti.style.cssText =
        'left:' + Math.random() * 100 + '%;' +
        'width:' + size + 'px;' +
        'height:' + (size * (Math.random() * 0.6 + 0.6)) + 'px;' +
        'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';' +
        'animation-duration:' + (Math.random() * 3 + 2) + 's;' +
        'animation-delay:' + (Math.random() * 4) + 's;';
      container.appendChild(confetti);
    }
    for (let i = 0; i < 40; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.textContent = '🎈';
      balloon.style.cssText =
        'left:' + (Math.random() * 90 + 5) + '%;' +
        'font-size:' + (Math.random() * 1.2 + 1.8) + 'rem;' +
        'animation-duration:' + (Math.random() * 6 + 4) + 's;' +
        'animation-delay:' + (Math.random() * 8) + 's;';
      container.appendChild(balloon);
    }
    setTimeout(function() { container.innerHTML = ''; }, 18000);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== VIDEO CONTROLS =====
  function toggleVideoPlay() {
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }

  function updateVideoUI() {
    if (!video) return;
    const paused = video.paused;
    isVideoPlaying = !paused;
    if (videoPlayIcon) videoPlayIcon.className = paused ? 'fas fa-play' : 'fas fa-pause';
    if (videoPlayBtn) videoPlayBtn.classList.toggle('hidden', !paused);
    if (!paused && isAudioPlaying && audio) {
      audio.pause();
      isAudioPlaying = false;
      discIcon.classList.remove('playing');
      playIcon.className = 'fas fa-play';
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function updateProgress() {
    if (!video || !video.duration) return;
    progressFill.style.width = (video.currentTime / video.duration * 100) + '%';
    timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
  }

  if (video) {
    video.addEventListener('play', updateVideoUI);
    video.addEventListener('pause', updateVideoUI);
    video.addEventListener('ended', function() {
      isVideoPlaying = false;
      videoPlayIcon.className = 'fas fa-play';
      videoPlayBtn.classList.remove('hidden');
      progressFill.style.width = '0%';
      if (video.duration) timeDisplay.textContent = '0:00 / ' + formatTime(video.duration);
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    video.volume = 0.5;
  }

  if (playPauseVideoBtn) playPauseVideoBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleVideoPlay();
  });
  if (videoContainer) videoContainer.addEventListener('click', function(e) {
    if (!e.target.closest('.video-controls') && !e.target.closest('.volume-btn')) toggleVideoPlay();
  });
  if (videoPlayBtn) videoPlayBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleVideoPlay();
  });
  if (progressBar) progressBar.addEventListener('click', function(e) {
    if (!video) return;
    var rect = this.getBoundingClientRect();
    video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
  });

  // ===== FULLSCREEN =====
  function toggleFullscreen() {
    if (!videoContainer) return;
    var isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (!isFull) {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.webkitRequestFullscreen) videoContainer.webkitRequestFullscreen();
      else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }

  function updateFullscreenIcon() {
    var isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    fullscreenIcon.className = isFull ? 'fas fa-compress' : 'fas fa-expand';
    if (fullscreenBtn) fullscreenBtn.title = isFull ? 'Exit Fullscreen' : 'Fullscreen';
  }
  document.addEventListener('fullscreenchange', updateFullscreenIcon);
  document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
  document.addEventListener('msfullscreenchange', updateFullscreenIcon);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleFullscreen();
  });

  // ===== VOLUME =====
  if (volumeBtn) volumeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!video) return;
    video.muted = !video.muted;
    volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    this.classList.toggle('muted', video.muted);
  });

  // ===== MUSIC PLAYER =====
  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (!audio) return;
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      discIcon.classList.remove('playing');
      playIcon.className = 'fas fa-play';
    } else {
      audio.play().catch(function() {});
      isAudioPlaying = true;
      discIcon.classList.add('playing');
      playIcon.className = 'fas fa-pause';
      if (isVideoPlaying && video) video.pause();
    }
  }
  if (musicPlayer) musicPlayer.addEventListener('click', toggleAudio);
  if (playPauseBtn) playPauseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleAudio(e);
  });
  if (audio) {
    audio.addEventListener('play', function() {
      isAudioPlaying = true;
      discIcon.classList.add('playing');
      playIcon.className = 'fas fa-pause';
    });
    audio.addEventListener('pause', function() {
      isAudioPlaying = false;
      discIcon.classList.remove('playing');
      playIcon.className = 'fas fa-play';
    });
    audio.addEventListener('ended', function() {
      isAudioPlaying = false;
      discIcon.classList.remove('playing');
      playIcon.className = 'fas fa-play';
    });
    audio.load();
  }

  // ===== OPEN / CLOSE =====
  function openInvitation() {
    if (isOpen) return;
    isOpen = true;
    coverPage.classList.add('hidden');
    invitationPage.classList.add('open');
    if (!isAudioPlaying && audio) audio.play().catch(function() {});
  }

  function closeInvitation() {
    if (!isOpen) return;
    isOpen = false;
    coverPage.classList.remove('hidden');
    invitationPage.classList.remove('open');
    if (isAudioPlaying && audio) audio.pause();
    if (isVideoPlaying && video) video.pause();
  }

  if (sealBtn) sealBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openInvitation();
  });
  if (coverPage) coverPage.addEventListener('click', function(e) {
    if (!e.target.closest('.cover-seal')) openInvitation();
  });
  if (closeSealBtn) closeSealBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeInvitation();
  });
})();
