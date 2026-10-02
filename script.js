document.addEventListener("DOMContentLoaded", function() {
  fetchLiveStatus();
  setInterval(fetchLiveStatus, 60000);
  loadSensSettings();
});

// دالة الدخول للموقع (تخفي شاشة الترحيب وتشغل الفيديو والصوت بامتياز)
function enterSite() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const bgVideo = document.getElementById("bgVideo");
  const audioIcon = document.getElementById("audioIcon");

  if (welcomeScreen) {
    welcomeScreen.style.opacity = "0";
    setTimeout(() => {
      welcomeScreen.style.display = "none";
    }, 600);
  }

  if (bgVideo) {
    bgVideo.muted = false; // تشغيل الصوت فور الضغط
    bgVideo.play().then(() => {
      if (audioIcon) {
        audioIcon.classList.remove("fa-volume-xmark");
        audioIcon.classList.add("fa-volume-high");
      }
    }).catch(error => {
      console.log("خطأ في تشغيل الفيديو:", error);
    });
  }
}

// دالة التحكم بزر الصوت يدويًا
function toggleAudio() {
  const bgVideo = document.getElementById("bgVideo");
  const audioIcon = document.getElementById("audioIcon");

  if (bgVideo.muted) {
    bgVideo.muted = false;
    audioIcon.classList.remove("fa-volume-xmark");
    audioIcon.classList.add("fa-volume-high");
  } else {
    bgVideo.muted = true;
    audioIcon.classList.remove("fa-volume-high");
    audioIcon.classList.add("fa-volume-xmark");
  }
}

function openAccountsModal() {
  document.getElementById("accountsModal").style.display = "flex";
}
function closeAccountsModal() {
  document.getElementById("accountsModal").style.display = "none";
}

function openSensModal() {
  document.getElementById("sensModal").style.display = "flex";
}
function closeSensModal() {
  document.getElementById("sensModal").style.display = "none";
}

function copyToClipboard(elementId) {
  const textElement = document.getElementById(elementId);
  const textToCopy = textElement.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = textElement.innerHTML;
    textElement.innerHTML = `<span style="color: #53fc18;"><i class="fa-solid fa-check"></i> تم النسخ بنجاح!</span>`;
    setTimeout(() => {
      textElement.innerHTML = originalText;
    }, 2000);
  }).catch(err => {
    console.error('فشل النسخ: ', err);
  });
}

function fetchLiveStatus() {
  const statusText = document.getElementById("statusText");
  const statusDot = document.getElementById("statusDot");
  if (statusText && statusDot) {
    statusText.innerText = "متوقف حالياً (انقر للدخول)";
    statusDot.style.background = "#ff4757";
  }
}

function loadSensSettings() {
  const sensCode = document.getElementById("sensCodeText");
  const layoutCode = document.getElementById("layoutCodeText");
  if (sensCode) sensCode.innerText = "7156-4321-9876-1234-55";
  if (layoutCode) layoutCode.innerText = "8833-2211-5566-7788-99";
}
