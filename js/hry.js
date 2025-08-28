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

    hryRoot.innerHTML = games.map(async g => {
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

        let hrac = {
          id: "132456879012354",
          username: "nepodarilosenacist",
          discriminator: "0",
          displayName: "Nepodařilo se načíst.",
          joinedAt: Date.now(),
          roles: [{id: "123156454566231", name: "Neexistuje"}]
        };
        if (g.user) {
          try {
            const res2 = await fetch("/getuserjson?who="+g.user, { headers: { "Accept": "application/json" } });
            if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
            hrac = await res2.json();
          } catch {

          }
        }

        return `
          <div class="hra">
            <div class="typ"><i class="fa-solid fa-gamepad"></i> ${g.gameType}</div>
            <div class="popis"><i class="fa-regular fa-comment"></i> ${g.gameDescription}</div>
            <div class="cas"><i class="fa-regular fa-clock"></i> ${cas}</div>
            <div class="user"><i class="fa-regular fa-user"></i> ${hrac.displayName}</div>
          </div>
    `}).join("");
  } catch (err) {
    console.error(err);
    hryRoot.innerHTML = `<div class="hra">Nepodařilo se načíst hry. Zkuste znovu načíst stránku (Ctrl+R nebo F5) pokud se nestalo automaticky.</div>`;
    window.location.reload();
  }
})();