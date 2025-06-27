"use client";

import BookCard from "./BookCard";

export default function GridFormat({ books }: any) {
  return (
    <div className="px-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {books.map((book: any, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
