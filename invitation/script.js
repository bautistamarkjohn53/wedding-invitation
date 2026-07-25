(function() {
  // ===== DOM ELEMENTS =====
  const sealBtn = document.getElementById('sealBtn');
  const envelopeLayer = document.getElementById('envelopeLayer');
  const invitationContent = document.getElementById('invitationContent');
  const closeSealBtn = document.getElementById('closeSealBtn');
  const audio = document.getElementById('bgAudio');
  const weddingCard = document.getElementById('weddingCard');
  const musicPlayer = document.getElementById('musicPlayer');
  const discIcon = document.getElementById('discIcon');
  const playIcon = document.getElementById('playIcon');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const ellaCard = document.getElementById('ellaCard');
  const jamesCard = document.getElementById('jamesCard');
  const heartTrigger = document.getElementById('heartTrigger');
  const rsvpBtn = document.getElementById('rsvpBtn');
  const video = document.getElementById('weddingVideo');
  const videoContainer = document.getElementById('videoContainer');
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
  const countdownWrap = document.getElementById('countdownWrap');
  const countdownFinished = document.getElementById('countdownFinished');
  const countdownSection = document.getElementById('countdownSection');
  const invitationHeader = document.getElementById('invitationHeader');
  const coupleGrid = document.getElementById('coupleGrid');
  const venueLinks = document.getElementById('venueLinks');
  const videoSection = document.getElementById('videoSection');
  const programSection = document.getElementById('programSection');
  const partySection = document.getElementById('partySection');

  let isOpen = false;
  let isAudioPlaying = false;
  let isVideoPlaying = false;
  let countdownFinishedTriggered = false;

  // ===== RSVP =====
  if (rsvpBtn) rsvpBtn.href = 'https://m.me/janjan.delbarrio.official';

  // ===== COUNTDOWN =====
  const targetDate = new Date('December 18, 2026 15:30:00').getTime();

  function updateCountdown() {
    const diff = Math.max(0, targetDate - Date.now());

    if (diff <= 0 && !countdownFinishedTriggered) {
      countdownFinishedTriggered = true;
      if (countdownWrap) countdownWrap.style.display = 'none';
      if (countdownFinished) countdownFinished.classList.add('active');
      if (countdownSection) {
        countdownSection.style.background = 'transparent';
        countdownSection.style.border = 'none';
        countdownSection.style.boxShadow = 'none';
        countdownSection.style.padding = '0';
      }
      [invitationHeader, coupleGrid, venueLinks, videoSection, programSection, partySection].forEach(el => {
        if (el) el.style.display = 'none';
      });
      launchCelebration();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const els = ['days', 'hours', 'minutes', 'seconds'];
    const vals = [days, hours, minutes, seconds];
    els.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(vals[i]).padStart(2, '0');
    });
  }

  // ===== CELEBRATION =====
  function launchCelebration() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#1e4a3b', '#c9a84c', '#2b6b56', '#e4cf8a', '#ffffff', '#3a8a6a', '#dbb95c'];
    for (let i = 0; i < 300; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      const size = Math.random() * 10 + 4;
      confetti.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size * (Math.random() * 0.6 + 0.6)}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation-duration: ${Math.random() * 4 + 2}s;
            animation-delay: ${Math.random() * 5}s;
          `;
      container.appendChild(confetti);
    }

    for (let i = 0; i < 50; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.textContent = '🎈';
      balloon.style.cssText = `
            left: ${Math.random() * 90 + 5}%;
            font-size: ${Math.random() * 1.5 + 2}rem;
            animation-duration: ${Math.random() * 8 + 5}s;
            animation-delay: ${Math.random() * 10}s;
          `;
      container.appendChild(balloon);
    }

    setTimeout(() => container.innerHTML = '', 18000);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== WEDDING PARTY DATA =====
  const partyData = {
    sponsorsGrid: [
      "Mr. & Mrs. Santos", "Mr. & Mrs. Reyes", "Mr. & Mrs. Cruz", "Mr. & Mrs. Garcia",
      "Mr. & Mrs. Mendoza", "Mr. & Mrs. Flores", "Mr. & Mrs. Gonzales", "Mr. & Mrs. Lopez",
      "Mr. & Mrs. Rivera", "Mr. & Mrs. Perez", "Mr. & Mrs. Castillo", "Mr. & Mrs. Torres",
      "Mr. & Mrs. Ramos", "Mr. & Mrs. Diaz", "Mr. & Mrs. Morales", "Mr. & Mrs. Ortiz",
      "Mr. & Mrs. Alvarez", "Mr. & Mrs. Ruiz", "Mr. & Mrs. Santiago", "Mr. & Mrs. Navarro",
      "Mr. & Mrs. Mercado", "Mr. & Mrs. Aquino", "Mr. & Mrs. Castro", "Mr. & Mrs. Luna",
      "Mr. & Mrs. Velasco", "Mr. & Mrs. Valdez", "Mr. & Mrs. Dela Cruz", "Mr. & Mrs. Bautista",
      "Mr. & Mrs. Villanueva", "Mr. & Mrs. Fernandez", "Mr. & Mrs. Gonzaga", "Mr. & Mrs. Salazar",
      "Mr. & Mrs. Manalo", "Mr. & Mrs. Buenaventura", "Mr. & Mrs. Gabriel", "Mr. & Mrs. Javier",
      "Mr. & Mrs. Marcelo", "Mr. & Mrs. Pineda", "Mr. & Mrs. Rosario", "Mr. & Mrs. Tuazon"
    ],
    groomsmenGrid: [
      "Marco Santos", "Paolo Reyes", "Luis Cruz", "Miguel Garcia", "Andres Mendoza",
      "Ramon Flores", "Carlos Gonzales", "Jose Lopez", "Antonio Rivera", "Emmanuel Perez"
    ],
    bridesmaidsGrid: [
      "Sophia Reyes", "Isabella Cruz", "Olivia Garcia", "Emma Flores", "Ava Gonzales",
      "Mia Lopez", "Luna Rivera", "Lily Perez", "Zara Castillo", "Chloe Torres"
    ],
    specialRolesGrid: [
      { role: "Candle Bearer", name: "Liam Santos" },
      { role: "Bible Bearer", name: "Noah Reyes" },
      { role: "Flower Girl", name: "Aria Cruz" },
      { role: "Coin Bearer", name: "Ethan Garcia" }
    ]
  };

  Object.keys(partyData).forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    const items = partyData[id];
    container.innerHTML = items.map(item =>
      typeof item === 'string' ?
      `<div class="name-item">${item}</div>` :
      `<div class="name-item"><strong>${item.role}:</strong> ${item.name}</div>`
    ).join('');
  });

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
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60),
      s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function updateProgress() {
    if (!video || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (timeDisplay) timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  }

  if (video) {
    video.addEventListener('play', updateVideoUI);
    video.addEventListener('pause', updateVideoUI);
    video.addEventListener('ended', () => {
      isVideoPlaying = false;
      if (videoPlayIcon) videoPlayIcon.className = 'fas fa-play';
      if (videoPlayBtn) videoPlayBtn.classList.remove('hidden');
      if (progressFill) progressFill.style.width = '0%';
      if (timeDisplay && video.duration) timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    video.volume = 0.5;
  }

  // ===== VIDEO CONTROLS EVENTS =====
  if (playPauseVideoBtn) playPauseVideoBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleVideoPlay();
  });
  if (videoContainer) videoContainer.addEventListener('click', e => {
    if (!e.target.closest('.video-controls') && !e.target.closest('.volume-btn')) toggleVideoPlay();
  });
  if (videoPlayBtn) videoPlayBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleVideoPlay();
  });
  if (progressBar) progressBar.addEventListener('click', function(e) {
    if (!video) return;
    const rect = this.getBoundingClientRect();
    video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
  });

  // ===== FULLSCREEN =====
  function toggleFullscreen() {
    if (!videoContainer) return;
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document
      .msFullscreenElement);
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
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document
      .msFullscreenElement);
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
    fullscreenBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleFullscreen();
    });
  }

  // ===== VOLUME =====
  if (volumeBtn) volumeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!video) return;
    video.muted = !video.muted;
    if (volumeIcon) volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    this.classList.toggle('muted', video.muted);
  });

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
      audio.play().catch(() => {});
      isAudioPlaying = true;
      if (discIcon) discIcon.classList.add('playing');
      if (playIcon) playIcon.className = 'fas fa-pause';
      if (isVideoPlaying && video) video.pause();
    }
  }

  if (musicPlayer) musicPlayer.addEventListener('click', toggleAudio);
  if (playPauseBtn) playPauseBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleAudio(e);
  });
  if (audio) {
    audio.addEventListener('play', () => {
      isAudioPlaying = true;
      if (discIcon) discIcon.classList.add('playing');
      if (playIcon) playIcon.className = 'fas fa-pause';
    });
    audio.addEventListener('pause', () => {
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
    });
    audio.addEventListener('ended', () => {
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
    if (envelopeLayer) envelopeLayer.classList.add('hidden');
    if (invitationContent) invitationContent.classList.add('open');
    if (weddingCard) weddingCard.style.boxShadow =
      '0 40px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(201,168,76,0.35)';
    if (!isAudioPlaying && audio) audio.play().catch(() => {});
  }

  function closeInvitation() {
    if (!isOpen) return;
    isOpen = false;
    if (envelopeLayer) envelopeLayer.classList.remove('hidden');
    if (invitationContent) invitationContent.classList.remove('open');
    if (weddingCard) weddingCard.style.boxShadow =
      '0 40px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(201,168,76,0.25)';
    if (isAudioPlaying && audio) audio.pause();
    if (isVideoPlaying && video) video.pause();
    if (ellaCard) ellaCard.classList.remove('show-photo');
    if (jamesCard) jamesCard.classList.remove('show-photo');
  }

  // ===== EVENTS =====
  if (sealBtn) sealBtn.addEventListener('click', e => {
    e.stopPropagation();
    openInvitation();
  });
  if (envelopeLayer) envelopeLayer.addEventListener('click', e => {
    if (!e.target.closest('.envelope-seal')) openInvitation();
  });
  if (closeSealBtn) closeSealBtn.addEventListener('click', e => {
    e.stopPropagation();
    closeInvitation();
  });

  // ===== HEART HOVER =====
  if (heartTrigger) {
    heartTrigger.addEventListener('mouseenter', () => {
      if (ellaCard) ellaCard.classList.add('show-photo');
      if (jamesCard) jamesCard.classList.add('show-photo');
    });
    heartTrigger.addEventListener('mouseleave', () => {
      if (ellaCard) ellaCard.classList.remove('show-photo');
      if (jamesCard) jamesCard.classList.remove('show-photo');
    });
  }

  console.log('✨ Emerald & Gold · Wedding Invitation loaded with fullscreen support!');
})();
