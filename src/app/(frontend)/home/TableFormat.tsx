import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Book = {
  title: string;
  author: string;
  series?: string;
  subject?: string;
  cover_image?: string;
};

type BookTableProps = {
  books: Book[];
};

const TableFormat = ({ books }: BookTableProps) => {
  return (
    <div className="px-4 pb-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border bg-background text-sm rounded-lg">
          <thead className="bg-muted text-muted-foreground sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Cover</th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Series</th>
              <th className="px-4 py-3 text-left font-semibold">Subject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {books.map((book, index) => (
              <BookRow key={index} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BookRow = ({ book }: { book: Book }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasValidImage =
    book?.cover_image && book?.cover_image.trim() !== "" && !imageError;

  return (
    <tr className="hover:bg-muted/40 transition-colors">
      <td className="px-4 py-3">
        <div className="h-20 w-16 overflow-hidden rounded bg-muted relative flex-shrink-0">
          {hasValidImage ? (
            <>
              <Image
                src={
                  book?.cover_image?.startsWith("data:")
                    ? book?.cover_image
                    : `data:image/jpeg;base64,${book?.cover_image}`
                }
                alt={`${book?.title} cover`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen className="h-6 w-6 text-muted-foreground/50" />
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 font-medium text-foreground max-w-xs">
        <div className="truncate" title={book?.title}>
          {book?.title}
        </div>
      </td>
      <td className="px-4 py-3 text-muted-foreground max-w-xs">
        <div className="truncate" title={book?.author}>
          {book?.author}
        </div>
      </td>
      <td className="px-4 py-3 text-muted-foreground max-w-xs">
        <div className="truncate" title={book?.series}>
          {book?.series || "-"}
        </div>
      </td>
      <td className="px-4 py-3">
        {book?.subject ? (
          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            {book?.subject}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">-</span>
        )}
      </td>
    </tr>
  );
};

export default TableFormat;
