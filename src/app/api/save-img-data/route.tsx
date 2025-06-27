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
      author: typeof body.author === "string"
          ? body.author.trim()
          : Array.isArray(body.author)
          ? body.author.join(", ").trim()
          : "",
      grade: body.grade?.trim() || "",
      subject:
        typeof body.subject === "string"
          ? body.subject.trim()
          : Array.isArray(body.subject)
          ? body.subject.join(", ").trim()
          : "",
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
