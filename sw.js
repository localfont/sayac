let targetTime = null;
let intervalId = null;

self.addEventListener("message", async (e) => {
  if (e.data.type === "START") {
    targetTime = e.data.target;
    startCounter();
  }
});

function format(ms) {
  if (ms < 0) ms = 0;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return `${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

async function startCounter() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(async () => {
    const now = new Date();
    const diff = targetTime - now.getTime();
    const timeText = format(diff);

    let title = "Ara Tatile Kalan Süre";

    if (now.getHours() === 8 && now.getMinutes() === 0) {
      title = "Gün Başladı";
    }
    if (now.getHours() === 22 && now.getMinutes() === 0) {
      title = "Gün Bitti";
    }

    await self.registration.showNotification(title, {
      body: timeText,
      tag: "gun-sayaci",
      renotify: true,
      requireInteraction: true,
      silent: true
    });
  }, 1000);
}