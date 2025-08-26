const hryRoot = document.querySelector(".hry");
hryRoot.innerHTML = `<div class="hra">Načítám hry…</div>`;

(async () => {
  try {
    const res = await fetch("/getgamesjson", { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const games = await res.json();

    if (!Array.isArray(games) || games.length === 0) {
      hryRoot.innerHTML = `<div class="hra">Žádné hry k zobrazení.</div>`;
      return;
    }

    hryRoot.innerHTML = games.map(g => {
        let cas = "neznámé";
        if (g.timestamp) {
          cas = new Date(g.timestamp).toLocaleString("cs-CZ", {
            timeZone: "Europe/Prague",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
        }


        return `
          <div class="hra">
            <div class="typ">${g.gameType}</div>
            <div class="popis">${g.gameDescription}</div>
          </div>
    `}).join("");
  } catch (err) {
    console.error(err);
    hryRoot.innerHTML = `<div class="hra">Nepodařilo se načíst hry.</div>`;
  }
})();