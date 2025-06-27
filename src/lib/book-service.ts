import { getDatabase } from "./database";
import Database from "better-sqlite3";

interface BookData {
  title: string;
  author: string;
  grade: string;
  subject: string;
  series: string;
  imageBase64: string;
}

interface Book extends BookData {
  id: number;
  created_at: string;
  updated_at: string;
}

export class BookService {
  private db: Database.Database;

  constructor() {
    this.db = getDatabase();
  }

  // Save a new book
  saveBook(bookData: BookData): Book {
    const stmt = this.db.prepare(`
      INSERT INTO books (title, author, grade, subject, series, cover_image)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      bookData.title,
      bookData.author || null,
      bookData.grade || null,
      bookData.subject || null,
      bookData.series || null,
      bookData.imageBase64
    );

    // Return the newly created book
    return this.getBookById(result.lastInsertRowid as number)!;
  }

  // Get book by ID
  getBookById(id: number): Book | null {
    const stmt = this.db.prepare("SELECT * FROM books WHERE id = ?");
    return stmt.get(id) as Book | null;
  }

  // Get all books with optional search
  getAllBooks(searchQuery?: string): Book[] {
    let query = "SELECT * FROM books";
    let params: any[] = [];

    if (searchQuery) {
      query += ` WHERE 
        title LIKE ? OR 
        author LIKE ? OR 
        subject LIKE ? OR 
        series LIKE ?
        ORDER BY created_at DESC
      `;
      const searchPattern = `%${searchQuery}%`;
      params = [searchPattern, searchPattern, searchPattern, searchPattern];
    } else {
      query += " ORDER BY created_at DESC";
    }

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as Book[];
  }
}
