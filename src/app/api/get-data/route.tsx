import { BookService } from "@/lib/book-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const bookService = new BookService();
    let books = bookService.getAllBooks(search || undefined);

    return NextResponse.json({
      success: true,
      books,
      count: books.length,
    });
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
