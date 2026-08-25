(function () {
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
  const rsvpBtn = document.getElementById('rsvpBtn');

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

  // ===== HEART HOVER =====
  const heartTrigger = document.getElementById('heartTrigger');
  if (heartTrigger) {
    heartTrigger.addEventListener('mouseenter', function () {
      const ellaCard = document.getElementById('ellaCard');
      const jamesCard = document.getElementById('jamesCard');
      if (ellaCard) ellaCard.classList.add('show-photo');
      if (jamesCard) jamesCard.classList.add('show-photo');
    });
    heartTrigger.addEventListener('mouseleave', function () {
      const ellaCard = document.getElementById('ellaCard');
      const jamesCard = document.getElementById('jamesCard');
      if (ellaCard) ellaCard.classList.remove('show-photo');
      if (jamesCard) jamesCard.classList.remove('show-photo');
    });
  }

  // Countdown elements
  const countdownWrap = document.getElementById('countdownWrap');
  const countdownSection = document.getElementById('countdownSection');
  const postWeddingSection = document.getElementById('postWeddingSection');
  const actionSection = document.getElementById('actionSection');
  const pageContent = document.querySelector('.page-content');

  let isOpen = false;
  let isAudioPlaying = false;
  let isVideoPlaying = false;
  let isPostWedding = false;

  // ===== RSVP =====
  if (rsvpBtn) rsvpBtn.href = 'https://m.me/janjan.delbarrio.official';

  // ===== COUNTDOWN =====
  // Wedding date: December 18, 2026 at 4:00 PM
  const weddingDate = new Date('December 18, 2026 16:00:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    let diff = weddingDate - now;

    // ===== POST-WEDDING: When countdown is done (diff <= 0) =====
    if (diff <= 0 && !isPostWedding) {
      isPostWedding = true;

      // Show post-wedding view
      showPostWeddingView();

      // Launch celebration with confetti
      launchCelebration();
      return;
    }

    // Update countdown numbers (only if not post-wedding)
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  function showPostWeddingView() {
    // ===== HIDE EVERYTHING EXCEPT VIDEO, THANK YOU, RSVP, CLOSE =====

    // 1. Hide all sections
    const sectionsToHide = [
      'couplePage',
      'entouragePage',
      'sponsorsPage',
      'detailsPage',
      'musicPlayerWrapper',
      'musicLabel',
      'flowersTop',
      'flowersBottom',
      'bookClosing',
      'countdownSection',
      'postWeddingDivider',
      'detailsDivider',
      'divider1',
      'divider2',
      'divider3',
      'divider4'
    ];

    sectionsToHide.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    // Hide all page dividers
    const dividers = document.querySelectorAll('.page-divider');
    dividers.forEach(function (divider) {
      divider.style.display = 'none';
    });

    // 2. SHOW VIDEO - Make it visible
    if (videoPage) {
      videoPage.style.display = 'block';
      videoPage.style.visibility = 'visible';
      videoPage.style.opacity = '1';
      videoPage.style.width = '100%';
      videoPage.style.maxWidth = '100%';
      videoPage.style.margin = '10px 0';
    }

    // Hide video title
    if (videoTitle) {
      videoTitle.style.display = 'none';
    }

    // Ensure video container is visible and properly sized
    if (videoContainer) {
      videoContainer.style.display = 'block';
      videoContainer.style.visibility = 'visible';
      videoContainer.style.opacity = '1';
      videoContainer.style.width = '100%';
      videoContainer.style.maxWidth = '100%';
      videoContainer.style.position = 'relative';
      videoContainer.style.paddingBottom = '56.25%';
      videoContainer.style.height = '0';
      videoContainer.style.overflow = 'hidden';
    }

    // Ensure video element is visible and properly sized
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

    // 3. SHOW Thank You message
    if (postWeddingSection) {
      postWeddingSection.style.display = 'block';
      postWeddingSection.style.visibility = 'visible';
      postWeddingSection.style.opacity = '1';
      postWeddingSection.classList.add('active');
    }

    // 4. SHOW RSVP and Close buttons
    // Remove any existing clone
    const existingClone = document.getElementById('actionSectionClone');
    if (existingClone) {
      existingClone.remove();
    }

    if (actionSection && pageContent) {
      // Clone the action section
      const actionClone = actionSection.cloneNode(true);
      actionClone.id = 'actionSectionClone';
      actionClone.style.display = 'block';
      actionClone.style.visibility = 'visible';
      actionClone.style.opacity = '1';
      actionClone.style.textAlign = 'center';
      actionClone.style.padding = '20px 0';
      actionClone.style.marginTop = '10px';
      actionClone.style.width = '100%';

      // Fix RSVP button in clone
      const rsvpBtnClone = actionClone.querySelector('#rsvpBtn');
      if (rsvpBtnClone) {
        rsvpBtnClone.href = 'https://m.me/janjan.delbarrio.official';
        rsvpBtnClone.target = '_blank';
        rsvpBtnClone.style.display = 'inline-block';
        rsvpBtnClone.style.margin = '5px auto';
      }

      // Fix Close button in clone
      const closeBtnClone = actionClone.querySelector('#closeSealBtn');
      if (closeBtnClone) {
        const newCloseBtn = document.createElement('button');
        newCloseBtn.className = closeBtnClone.className;
        newCloseBtn.id = 'closeSealBtn';
        newCloseBtn.innerHTML = closeBtnClone.innerHTML;
        newCloseBtn.style.display = 'inline-block';
        newCloseBtn.style.margin = '10px auto';
        newCloseBtn.style.cursor = 'pointer';
        newCloseBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          closeInvitation();
        });
        closeBtnClone.parentNode.replaceChild(newCloseBtn, closeBtnClone);
      }

      // Insert after post-wedding section
      if (postWeddingSection) {
        postWeddingSection.parentNode.insertBefore(actionClone, postWeddingSection.nextSibling);
      } else {
        pageContent.appendChild(actionClone);
      }
    } else if (pageContent) {
      // Create new action section if none exists
      createNewActionSection(pageContent);
    }

    // 5. Style the page content container
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

  function createNewActionSection(container) {
    if (!container) return;

    const newAction = document.createElement('div');
    newAction.className = 'action-section';
    newAction.id = 'actionSectionClone';
    newAction.style.textAlign = 'center';
    newAction.style.padding = '15px 0';
    newAction.style.marginTop = '10px';
    newAction.style.width = '100%';
    newAction.style.display = 'block';

    // RSVP button
    const rsvpLink = document.createElement('a');
    rsvpLink.href = 'https://m.me/janjan.delbarrio.official';
    rsvpLink.target = '_blank';
    rsvpLink.className = 'btn-gold';
    rsvpLink.id = 'rsvpBtn';
    rsvpLink.innerHTML = '<i class="fab fa-facebook-messenger"></i> RSVP now';
    rsvpLink.style.display = 'inline-block';
    rsvpLink.style.margin = '5px auto';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-seal-btn';
    closeBtn.id = 'closeSealBtn';
    closeBtn.innerHTML = '<i class="fas fa-envelope"></i> Close Book';
    closeBtn.style.display = 'inline-block';
    closeBtn.style.margin = '10px auto';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeInvitation();
    });

    newAction.appendChild(rsvpLink);
    newAction.appendChild(document.createElement('br'));
    newAction.appendChild(closeBtn);

    if (postWeddingSection) {
      postWeddingSection.parentNode.insertBefore(newAction, postWeddingSection.nextSibling);
    } else {
      container.appendChild(newAction);
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
      confetti.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${size}px;
                height: ${size * (Math.random() * 0.6 + 0.6)}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation-duration: ${Math.random() * 3 + 2}s;
                animation-delay: ${Math.random() * 4}s;
            `;
      container.appendChild(confetti);
    }
    for (let i = 0; i < 40; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.textContent = '🎈';
      balloon.style.cssText = `
                left: ${Math.random() * 90 + 5}%;
                font-size: ${Math.random() * 1.2 + 1.8}rem;
                animation-duration: ${Math.random() * 6 + 4}s;
                animation-delay: ${Math.random() * 8}s;
            `;
      container.appendChild(balloon);
    }
    setTimeout(function () {
      container.innerHTML = '';
    }, 18000);
  }

  // Initial countdown update
  updateCountdown();
  // Update every second
  setInterval(updateCountdown, 1000);

  // ===== VIDEO CONTROLS =====
  function toggleVideoPlay() {
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function updateVideoUI() {
    if (!video) return;
    const paused = video.paused;
    isVideoPlaying = !paused;
    if (videoPlayIcon) {
      videoPlayIcon.className = paused ? 'fas fa-play' : 'fas fa-pause';
    }
    if (videoPlayBtn) {
      videoPlayBtn.classList.toggle('hidden', !paused);
    }
    if (!paused && isAudioPlaying && audio) {
      audio.pause();
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
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
    var pct = (video.currentTime / video.duration) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (timeDisplay) {
      timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
    }
  }

  // Set up video event listeners
  if (video) {
    video.addEventListener('play', updateVideoUI);
    video.addEventListener('pause', updateVideoUI);
    video.addEventListener('ended', function () {
      isVideoPlaying = false;
      if (videoPlayIcon) videoPlayIcon.className = 'fas fa-play';
      if (videoPlayBtn) videoPlayBtn.classList.remove('hidden');
      if (progressFill) progressFill.style.width = '0%';
      if (timeDisplay && video.duration) {
        timeDisplay.textContent = '0:00 / ' + formatTime(video.duration);
      }
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    video.volume = 0.5;
  }

  // Video control buttons
  if (playPauseVideoBtn) {
    playPauseVideoBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleVideoPlay();
    });
  }

  if (videoContainer) {
    videoContainer.addEventListener('click', function (e) {
      if (!e.target.closest('.video-controls') && !e.target.closest('.volume-btn')) {
        toggleVideoPlay();
      }
    });
  }

  if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleVideoPlay();
    });
  }

  if (progressBar) {
    progressBar.addEventListener('click', function (e) {
      if (!video) return;
      var rect = this.getBoundingClientRect();
      var percent = (e.clientX - rect.left) / rect.width;
      video.currentTime = percent * video.duration;
    });
  }

  // ===== FULLSCREEN =====
  function toggleFullscreen() {
    if (!videoContainer) return;
    var isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (!isFull) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  function updateFullscreenIcon() {
    var isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (fullscreenIcon) {
      fullscreenIcon.className = isFull ? 'fas fa-compress' : 'fas fa-expand';
    }
    if (fullscreenBtn) {
      fullscreenBtn.title = isFull ? 'Exit Fullscreen' : 'Fullscreen';
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenIcon);
  document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
  document.addEventListener('msfullscreenchange', updateFullscreenIcon);

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleFullscreen();
    });
  }

  // ===== VOLUME =====
  if (volumeBtn) {
    volumeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!video) return;
      video.muted = !video.muted;
      if (volumeIcon) {
        volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
      }
      this.classList.toggle('muted', video.muted);
    });
  }

  // ===== MUSIC PLAYER =====
  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (!audio) return;
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
    } else {
      audio.play().catch(function () { });
      isAudioPlaying = true;
      if (discIcon) discIcon.classList.add('playing');
      if (playIcon) playIcon.className = 'fas fa-pause';
      if (isVideoPlaying && video) video.pause();
    }
  }

  if (musicPlayer) {
    musicPlayer.addEventListener('click', toggleAudio);
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleAudio(e);
    });
  }

  if (audio) {
    audio.addEventListener('play', function () {
      isAudioPlaying = true;
      if (discIcon) discIcon.classList.add('playing');
      if (playIcon) playIcon.className = 'fas fa-pause';
    });
    audio.addEventListener('pause', function () {
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
    });
    audio.addEventListener('ended', function () {
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
    });
    audio.load();
  }

  // ===== OPEN / CLOSE =====
  function openInvitation() {
    if (isOpen) return;
    isOpen = true;
    if (coverPage) coverPage.classList.add('hidden');
    if (invitationPage) invitationPage.classList.add('open');
    if (!isAudioPlaying && audio) {
      audio.play().catch(function () { });
    }
  }

  function closeInvitation() {
    if (!isOpen) return;
    isOpen = false;
    if (coverPage) coverPage.classList.remove('hidden');
    if (invitationPage) invitationPage.classList.remove('open');
    if (isAudioPlaying && audio) audio.pause();
    if (isVideoPlaying && video) video.pause();
  }

  // ===== EVENTS =====
  if (sealBtn) {
    sealBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      openInvitation();
    });
  }

  if (coverPage) {
    coverPage.addEventListener('click', function (e) {
      if (!e.target.closest('.cover-seal')) {
        openInvitation();
      }
    });
  }

  if (closeSealBtn) {
    closeSealBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeInvitation();
    });
  }

  console.log('✨ Emerald & Gold · Wedding Invitation Book loaded!');
  console.log('📅 Wedding Date: December 18, 2026 at 4:00 PM');
  console.log('🎉 When countdown hits zero, ONLY Video, Thank You, RSVP & Close will show!');
})();
