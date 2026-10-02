window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideo');
  if (video) { video.muted = true; video.play().catch(e => {}); }
  fetchSettings();
  setInterval(fetchSettings, 30000);
});

async function fetchSettings() {
  const statusText = document.getElementById('statusText');
  const liveCard = document.getElementById('liveCard');
  const statusDot = document.getElementById('statusDot');
  const sensCodeText = document.getElementById('sensCodeText');
  const layoutCodeText = document.getElementById('layoutCodeText');
  const avatarContainer = document.getElementById('avatarContainer');
  const videoSource = document.getElementById('videoSource');
  const bgVideo = document.getElementById('bgVideo');

  try {
    const response = await fetch('status.json?t=' + new Date().getTime());
    const data = await response.json();

    if (data.isLive) {
      statusText.innerText = "انقر للمشاهدة الآن 🟢";
      statusText.style.color = "var(--live-green)";
      statusDot.style.background = "var(--live-green)";
      statusDot.style.boxShadow = "0 0 10px var(--live-green)";
      liveCard.style.borderColor = "var(--live-green)";
    } else {
      statusText.innerText = "البث مغلق حالياً 🔴";
      statusText.style.color = "#ff4757";
      statusDot.style.background = "#ff4757";
      statusDot.style.boxShadow = "0 0 10px #ff4757";
      liveCard.style.borderColor = "rgba(255, 71, 87, 0.3)";
    }

    if(sensCodeText) sensCodeText.innerText = data.sensitivityCode;
    if(layoutCodeText) layoutCodeText.innerText = data.layoutCode;

    if (data.avatarUrl && data.avatarUrl.trim() !== "") {
      avatarContainer.innerHTML = `<img src="${data.avatarUrl}" alt="Avatar">`;
    }

    if (data.bgVideoUrl && videoSource.getAttribute('src') !== data.bgVideoUrl) {
      videoSource.setAttribute('src', data.bgVideoUrl);
      bgVideo.load();
      bgVideo.play().catch(e => {});
    }

  } catch (e) {
    statusText.innerText = "انقر للمشاهدة الآن 🟢";
  }
}

function toggleAudio() {
  const video = document.getElementById('bgVideo');
  const audioIcon = document.getElementById('audioIcon');
  if (video.muted) {
    video.muted = false;
    video.play();
    audioIcon.className = "fa-solid fa-volume-high";
  } else {
    video.muted = true;
    audioIcon.className = "fa-solid fa-volume-xmark";
  }
}

function openAccountsModal() { document.getElementById('accountsModal').classList.add('active'); }
function closeAccountsModal() { document.getElementById('accountsModal').classList.remove('active'); }
function openSensModal() { document.getElementById('sensModal').classList.add('active'); }
function closeSensModal() { document.getElementById('sensModal').classList.remove('active'); }
