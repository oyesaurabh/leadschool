"use client";

import axios from "axios";

import { useBookStore } from "@/store/useBookStore";
import { useGridStore } from "@/store/useIsGridStore";
import GridFormat from "./GridFormat";
import TableFormat from "./TableFormat";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const books = useBookStore((state) => state.books);
  const { isGrid } = useGridStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { success, books: fetchedBooks } = (
          await axios.get("/api/get-data")
        )?.data;
        if (!success) throw new Error("Failed to fetch books");

        const mappedBooks = fetchedBooks.map((b: any) => ({
          title: b.title,
          author: b.author,
          cover_image: b.cover_image,
          grade: b.grade || undefined,
          subject: b.subject || undefined,
          series: b.series || undefined,
        }));

        useBookStore.getState().setBooks(mappedBooks);
      } catch (error: any) {
        console.error("Error while fetching data:", error);
        setError(error.message || "An error occurred while fetching books");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col mt-16">
      <div className="container mx-auto flex-1 flex flex-col p-4">
        {!books?.length ? (
          <div className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center flex-1">
            No books available
          </div>
        ) : (
          <>
            {/* Fixed Header */}
            <div className="flex-shrink-0 text-center px-4 py-6 mb-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Featured Books
              </h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {isGrid ? (
                <GridFormat books={books} />
              ) : (
                <TableFormat books={books} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
