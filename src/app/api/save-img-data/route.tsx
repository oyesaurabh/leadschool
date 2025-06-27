import { NextRequest, NextResponse } from "next/server";
import { BookService } from "@/lib/book-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Book title is required" },
        { status: 400 }
      );
    }

    if (!body.imageBase64) {
      return NextResponse.json(
        { success: false, error: "Book cover image is required" },
        { status: 400 }
      );
    }

    // Initialize book service
    const bookService = new BookService();

    // Save the book
    bookService.saveBook({
      title: body.title.trim(),
      author: body.author?.trim() || "",
      grade: body.grade?.trim() || "",
      subject: body.subject?.trim() || "",
      series: body.series?.trim() || "",
      imageBase64: body.imageBase64,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Book saved successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving book:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
