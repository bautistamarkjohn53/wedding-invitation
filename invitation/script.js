(function () {
  'use strict';

  // ---------- Preloader: "Loading" only, reveal only when fully decoded ----------
  var preloader = document.getElementById('preloader');
  var fill = document.getElementById('preloaderFill');
  var barWrap = document.getElementById('preloaderBarWrap');
  var skipBtn = document.getElementById('preloaderSkip');
  document.body.classList.add('locked');

  // webp + jpg pairs: <picture> may pick either, so both must be decoded
  // (bg pair covers the CSS cover background; youandme pair covers the video poster)
  var criticalPairs = [
    ['invitation/img/mj.webp', 'invitation/img/mj.jpg'],
    ['invitation/img/maine.webp', 'invitation/img/maine.jpg'],
    ['invitation/img/youandme.webp', 'invitation/img/youandme.jpeg'],
    ['invitation/img/ring.webp', 'invitation/img/ring.png']
  ];
  var fontFaces = [
    ['Great Vibes', '400', 'normal'],
    ['Playfair Display', '600', 'normal'],
    ['Playfair Display', '700', 'normal'],
    ['Playfair Display', '400', 'italic'],
    ['Playfair Display', '600', 'italic'],
    ['Lato', '300', 'normal'],
    ['Lato', '400', 'normal'],
    ['Lato', '700', 'normal']
  ];

  var loaded = 0;
  var total = criticalPairs.length * 2 + fontFaces.length;
  var finished = false;
  var startTime = Date.now();
  var MIN_DISPLAY = 900; // avoid flash on fast networks

  function renderProgress() {
    var p = Math.round((loaded / total) * 100);
    if (fill) fill.style.width = p + '%';
    if (barWrap) barWrap.setAttribute('aria-valuenow', String(p));
  }

  function finishPreloader() {
    if (finished) return;
    finished = true;
    loaded = total;
    renderProgress();
    // hold the opaque screen for the minimum time so nothing half-renders
    var wait = Math.max(0, MIN_DISPLAY - (Date.now() - startTime));
    setTimeout(function () {
      if (preloader) preloader.classList.add('done');
      document.body.classList.remove('locked');
      document.body.setAttribute('aria-busy', 'false');
      setTimeout(function () {
        if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 500);
      warmMedia();
    }, wait);
  }

  // onload + decode: guarantees the bitmap is ready, not just first bytes
  // (fixes the "half picture for a second" progressive-render flash on 3G)
  function loadImageDecoded(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        if (img.decode) {
          img.decode().then(function () { loaded++; renderProgress(); resolve(); }, function () { loaded++; renderProgress(); resolve(); });
        } else { loaded++; renderProgress(); resolve(); }
      };
      img.onerror = function () { loaded++; renderProgress(); resolve(); };
      img.src = src;
    });
  }

  function loadFont(family, weight, style) {
    try {
      if (document.fonts && document.fonts.load) {
        return document.fonts.load(style + ' ' + weight + ' 16px "' + family + '"').then(
          function () { loaded++; renderProgress(); },
          function () { loaded++; renderProgress(); }
        );
      }
    } catch (e) { /* ignore */ }
    loaded++;
    renderProgress();
    return Promise.resolve();
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (r) { setTimeout(r, ms); })
    ]);
  }

  // slow-network safety: skip button at 10s, auto-finish at 25s (3G-friendly)
  setTimeout(function () {
    if (!finished && skipBtn) skipBtn.hidden = false;
  }, 10000);
  setTimeout(function () { finishPreloader(); }, 25000);
  if (skipBtn) skipBtn.addEventListener('click', function () { finishPreloader(); });

  (async function preloadCritical() {
    renderProgress();
    var jobs = [];
    criticalPairs.forEach(function (pair) {
      jobs.push(withTimeout(loadImageDecoded(pair[0]), 20000));
      jobs.push(withTimeout(loadImageDecoded(pair[1]), 20000));
    });
    fontFaces.forEach(function (f) {
      jobs.push(withTimeout(loadFont(f[0], f[1], f[2]), 8000));
    });
    await Promise.all(jobs);
    finishPreloader();
  })();

  // ---------- Main invitation logic (runs immediately, works under preloader) ----------
  var sealBtn = document.getElementById('sealBtn');
  var coverPage = document.getElementById('envelopeLayer');
  var invitationPage = document.getElementById('invitationContent');
  var closeSealBtn = document.getElementById('closeSealBtn');
  var audio = document.getElementById('bgAudio');
  var musicPlayer = document.getElementById('musicPlayer');
  var discIcon = document.getElementById('discIcon');
  var playIcon = document.getElementById('playIcon');
  var musicStatus = document.getElementById('musicStatus');

  var video = document.getElementById('weddingVideo');
  var videoContainer = document.getElementById('videoContainer');
  var videoPlayBtn = document.getElementById('videoPlayBtn');
  var playPauseVideoBtn = document.getElementById('playPauseVideoBtn');
  var videoPlayIcon = document.getElementById('videoPlayIcon');
  var progressBar = document.getElementById('progressBar');
  var progressFill = document.getElementById('progressFill');
  var timeDisplay = document.getElementById('timeDisplay');
  var fullscreenBtn = document.getElementById('fullscreenBtn');
  var fullscreenIcon = document.getElementById('fullscreenIcon');
  var volumeBtn = document.getElementById('volumeBtn');
  var volumeIcon = document.getElementById('volumeIcon');
  var videoStatus = document.getElementById('videoStatus');

  var jamesCard = document.getElementById('jamesCard');
  var ellaCard = document.getElementById('ellaCard');
  var heartTrigger = document.getElementById('heartTrigger');

  var countdownSection = document.getElementById('countdownSection');
  var postWeddingSection = document.getElementById('postWeddingSection');
  var actionSection = document.getElementById('actionSection');
  var pageContent = document.querySelector('.page-content');

  var isOpen = false;
  var isAudioPlaying = false;
  var isVideoPlaying = false;
  var isPostWedding = false;

  // ----- Couple photos: tap-friendly (not hover-only) -----
  function toggleCards(force) {
    var show;
    if (typeof force === 'boolean') show = force;
    else show = !(jamesCard.classList.contains('show-photo') && ellaCard.classList.contains('show-photo'));
    jamesCard.classList.toggle('show-photo', show);
    ellaCard.classList.toggle('show-photo', show);
  }
  if (heartTrigger) {
    heartTrigger.addEventListener('click', function (e) { e.stopPropagation(); toggleCards(); });
  }
  [jamesCard, ellaCard].forEach(function (card) {
    if (!card) return;
    card.addEventListener('click', function () { card.classList.toggle('show-photo'); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('show-photo'); }
    });
  });

  // ----- Countdown (08:00 AM to match cover) -----
  var weddingDate = new Date('December 18, 2026 08:00:00').getTime();
  function updateCountdown() {
    var now = Date.now();
    var diff = weddingDate - now;
    if (diff <= 0 && !isPostWedding) {
      isPostWedding = true;
      showPostWeddingView();
      launchCelebration();
      return;
    }
    if (diff < 0) diff = 0;
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var de = document.getElementById('days');
    if (de) de.textContent = String(d).padStart(2, '0');
    var he = document.getElementById('hours');
    if (he) he.textContent = String(h).padStart(2, '0');
    var me = document.getElementById('minutes');
    if (me) me.textContent = String(m).padStart(2, '0');
    var se = document.getElementById('seconds');
    if (se) se.textContent = String(s).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  function showPostWeddingView() {
    ['couplePage', 'sponsorsPage', 'detailsPage', 'countdownSection', 'musicPlayerWrapper'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    document.querySelectorAll('.page-divider').forEach(function (el) { el.style.display = 'none'; });
    if (postWeddingSection) postWeddingSection.classList.add('active');
  }

  function launchCelebration() {
    var container = document.getElementById('confettiContainer');
    if (!container) return;
    var colors = ['#1e4a3b', '#c9a84c', '#2b6b56', '#e4cf8a', '#ffffff'];
    for (var i = 0; i < 120; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      var size = Math.random() * 8 + 4;
      c.style.cssText = 'left:' + Math.random() * 100 + '%;width:' + size + 'px;height:' + size + 'px;background:' +
        colors[Math.floor(Math.random() * colors.length)] + ';border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') +
        ';animation-duration:' + (Math.random() * 3 + 2) + 's;animation-delay:' + (Math.random() * 2) + 's;';
      container.appendChild(c);
    }
    setTimeout(function () { container.innerHTML = ''; }, 12000);
  }

  // ----- Media warm-up (non-blocking) -----
  function warmMedia() {
    try {
      if (audio) { audio.preload = 'metadata'; audio.load(); }
    } catch (e) {}
    // load video only when visible to save data
    if ('IntersectionObserver' in window && video && videoContainer) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            try { video.load(); if (videoStatus) videoStatus.textContent = 'Ready • tap to play'; } catch (e) {}
            obs.disconnect();
          }
        });
      }, { rootMargin: '300px' });
      obs.observe(videoContainer);
    }
  }

  // ----- Video controls -----
  function toggleVideoPlay() {
    if (!video) return;
    if (video.paused) { video.play().catch(function () {}); }
    else { video.pause(); }
  }
  function updateVideoUI() {
    if (!video) return;
    var paused = video.paused;
    isVideoPlaying = !paused;
    if (videoPlayIcon) videoPlayIcon.className = paused ? 'fas fa-play' : 'fas fa-pause';
    if (videoPlayBtn) videoPlayBtn.classList.toggle('hidden', !paused);
    if (!paused && isAudioPlaying && audio) {
      audio.pause();
      isAudioPlaying = false;
      if (discIcon) discIcon.classList.remove('playing');
      if (playIcon) playIcon.className = 'fas fa-play';
      if (musicStatus) musicStatus.textContent = 'Paused for video';
    }
  }
  function formatTime(t) {
    if (isNaN(t) || !isFinite(t)) return '0:00';
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ':' + String(s).padStart(2, '0');
  }
  function updateProgress() {
    if (!video || !video.duration) return;
    var p = (video.currentTime / video.duration) * 100;
    if (progressFill) progressFill.style.width = p + '%';
    if (progressBar) progressBar.setAttribute('aria-valuenow', String(Math.round(p)));
    if (timeDisplay) timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
  }
  if (video) {
    video.addEventListener('play', updateVideoUI);
    video.addEventListener('pause', updateVideoUI);
    video.addEventListener('ended', function () {
      isVideoPlaying = false;
      if (videoPlayIcon) videoPlayIcon.className = 'fas fa-play';
      if (videoPlayBtn) videoPlayBtn.classList.remove('hidden');
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    video.volume = 0.8;
  }
  if (playPauseVideoBtn) playPauseVideoBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleVideoPlay(); });
  if (videoPlayBtn) videoPlayBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleVideoPlay(); });
  if (videoContainer) videoContainer.addEventListener('click', function (e) {
    if (!e.target.closest('.video-controls') && !e.target.closest('.volume-btn')) toggleVideoPlay();
  });
  if (progressBar) {
    const seek = function (clientX) {
      if (!video || !video.duration) return;
      var rect = progressBar.getBoundingClientRect();
      var ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      video.currentTime = ratio * video.duration;
    };
    progressBar.addEventListener('click', function (e) { seek(e.clientX); });
    progressBar.addEventListener('keydown', function (e) {
      if (!video || !video.duration) return;
      if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + 5);
      if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 5);
    });
  }
  function toggleFullscreen() {
    if (!videoContainer) return;
    var isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (!isFull) {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.webkitRequestFullscreen) videoContainer.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleFullscreen(); });
  document.addEventListener('fullscreenchange', function () {
    var isFull = !!document.fullscreenElement;
    if (fullscreenIcon) fullscreenIcon.className = isFull ? 'fas fa-compress' : 'fas fa-expand';
  });
  if (volumeBtn) volumeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!video) return;
    video.muted = !video.muted;
    if (volumeIcon) volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  });

  // ----- Music -----
  function setMusicUI(playing) {
    isAudioPlaying = playing;
    if (discIcon) discIcon.classList.toggle('playing', playing);
    if (playIcon) playIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    if (musicStatus) musicStatus.textContent = playing ? 'Playing…' : 'Tap to play';
    if (musicPlayer) musicPlayer.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  }
  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (!audio) return;
    if (isAudioPlaying) { audio.pause(); setMusicUI(false); }
    else {
      try { audio.preload = 'auto'; } catch (err) {}
      audio.play().then(function () { setMusicUI(true); }).catch(function () { setMusicUI(false); });
      if (isVideoPlaying && video) video.pause();
    }
  }
  if (musicPlayer) musicPlayer.addEventListener('click', toggleAudio);
  if (audio) {
    audio.addEventListener('play', function () { setMusicUI(true); });
    audio.addEventListener('pause', function () { setMusicUI(false); });
  }

  // ----- Open / Close -----
  function openInvitation() {
    if (isOpen) return;
    isOpen = true;
    if (coverPage) coverPage.classList.add('hidden');
    if (invitationPage) {
      invitationPage.classList.add('open');
      // scroll to couple section on mobile
      setTimeout(function () {
        var el = document.getElementById('couplePage');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
    if (audio && !isAudioPlaying) {
      audio.play().then(function () { setMusicUI(true); }).catch(function () { setMusicUI(false); });
    }
  }
  function closeInvitation() {
    if (!isOpen) return;
    isOpen = false;
    if (coverPage) {
      coverPage.classList.remove('hidden');
      coverPage.scrollIntoView({ behavior: 'smooth' });
    }
    if (invitationPage) invitationPage.classList.remove('open');
    if (isAudioPlaying && audio) { audio.pause(); setMusicUI(false); }
    if (isVideoPlaying && video) video.pause();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (sealBtn) sealBtn.addEventListener('click', function (e) { e.stopPropagation(); openInvitation(); });
  if (coverPage) coverPage.addEventListener('click', function (e) {
    if (!e.target.closest('.cover-seal')) openInvitation();
  });
  if (closeSealBtn) closeSealBtn.addEventListener('click', function (e) { e.stopPropagation(); closeInvitation(); });
})();
