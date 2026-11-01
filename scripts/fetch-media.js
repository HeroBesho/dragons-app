// Downloads the free, public-domain exercise photos (free-exercise-db) into www/
const fs = require('fs'), path = require('path');
const BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/';
const OUT = path.join(__dirname, '..', 'www');
async function get(u, bin) {
  for (let i = 0; i < 4; i++) {
    try { const r = await fetch(u); if (r.ok) return bin ? Buffer.from(await r.arrayBuffer()) : await r.text(); } catch (e) {}
    await new Promise(r => setTimeout(r, 500 * (i + 1)));
  }
  return null;
}
(async () => {
  const txt = await get(BASE + 'dist/exercises.json');
  if (!txt) throw new Error('Could not download the exercise list');
  const list = JSON.parse(txt);
  fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });
  const out = [], queue = [...list]; let done = 0;
  async function worker() {
    while (queue.length) {
      const x = queue.pop();
      const imgs = (x.images || []).slice(0, 2);
      if (imgs.length) {
        const dir = path.join(OUT, 'media', 'ex', x.id);
        fs.mkdirSync(dir, { recursive: true });
        let ok = 0;
        for (let k = 0; k < imgs.length; k++) {
          const b = await get(BASE + 'exercises/' + imgs[k], true);
          if (b) { fs.writeFileSync(path.join(dir, k + '.jpg'), b); ok++; }
        }
        if (ok) out.push({ id: x.id, n: x.name, c: x.category || '', m: (x.primaryMuscles || [])[0] || '', eq: x.equipment || '', lv: x.level || '', ins: (x.instructions || []).slice(0, 8), k: ok });
      }
      if (++done % 100 === 0) console.log(done + '/' + list.length);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  out.sort((a, b) => a.n.localeCompare(b.n));
  fs.writeFileSync(path.join(OUT, 'data', 'exercises.js'), 'window.EXDB=' + JSON.stringify(out) + ';');
  console.log('Exercises with photos:', out.length);
})().catch(e => { console.error(e); process.exit(1); });
