import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let db: Database.Database;

export function initDatabase() {
  if (!db) {
    // Create database directory if it doesn't exist
    const dbDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Initialize database
    const dbPath = path.join(dbDir, "books.db");
    db = new Database(dbPath);

    // Create books table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT,
        grade TEXT,
        subject TEXT,
        series TEXT,
        cover_image TEXT, -- Store base64 image data
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database initialized successfully");
  }
  return db;
}
export function getDatabase() {
  if (!db) {
    return initDatabase();
  }
  return db;
}

// Close database connection
export function closeDatabase() {
  if (db) {
    db.close();
  }
}
