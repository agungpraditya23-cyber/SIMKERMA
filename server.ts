import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("simkerma.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'DRAF',
    p1_nama TEXT,
    p1_jabatan TEXT,
    p1_alamat TEXT,
    p1_dasar_hukum TEXT,
    p2_instansi TEXT,
    p2_nama TEXT,
    p2_jabatan TEXT,
    p2_alamat TEXT,
    kategori_mitra TEXT,
    judul TEXT,
    ruang_lingkup TEXT,
    jangka_waktu_mulai TEXT,
    jangka_waktu_selesai TEXT,
    nomor_surat TEXT,
    status_naskah TEXT,
    file_naskah TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/submissions", (req, res) => {
    const rows = db.prepare("SELECT * FROM submissions ORDER BY created_at DESC").all();
    res.json(rows);
  });

  app.get("/api/submissions/:id", (req, res) => {
    const row = db.prepare("SELECT * FROM submissions WHERE id = ?").get(req.params.id);
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.post("/api/submissions", (req, res) => {
    try {
      const s = req.body;
      
      // Ensure required fields are present or have defaults
      const stmt = db.prepare(`
        INSERT INTO submissions (
          type, p1_nama, p1_jabatan, p1_alamat, p1_dasar_hukum,
          p2_instansi, p2_nama, p2_jabatan, p2_alamat, kategori_mitra,
          judul, ruang_lingkup, jangka_waktu_mulai, jangka_waktu_selesai, 
          nomor_surat, status_naskah, file_naskah
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const info = stmt.run(
        s.type || 'MoU',
        s.p1_nama || null,
        s.p1_jabatan || null,
        s.p1_alamat || null,
        s.p1_dasar_hukum || null,
        s.p2_instansi || null,
        s.p2_nama || null,
        s.p2_jabatan || null,
        s.p2_alamat || null,
        s.kategori_mitra || 'KSDPK',
        s.judul || null,
        s.ruang_lingkup || null,
        s.jangka_waktu_mulai || null,
        s.jangka_waktu_selesai || null,
        s.nomor_surat || null,
        s.status_naskah || 'BARU',
        s.file_naskah || null
      );
      
      res.json({ id: info.lastInsertRowid });
    } catch (err: any) {
      console.error("Database Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/submissions/:id", (req, res) => {
    db.prepare("DELETE FROM submissions WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.patch("/api/submissions/:id/status", (req, res) => {
    try {
      const { status } = req.body;
      if (!['DRAF', 'REVIEW', 'FINAL'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      db.prepare("UPDATE submissions SET status = ? WHERE id = ?").run(status, req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
