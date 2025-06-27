import { BookOpen } from "lucide-react";
import { useState } from "react";

const BookCard = ({ book }: any) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasValidImage =
    book.cover_image && book.cover_image.trim() !== "" && !imageError;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2 hover:p-3 transition-all hover:shadow-lg cursor-pointer">
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted">
        {hasValidImage ? (
          <div className="relative h-full w-full">
            <img
              src={
                book.cover_image.startsWith("data:")
                  ? book.cover_image
                  : `data:image/jpeg;base64,${book.cover_image}`
              }
              alt={`${book.title} cover`}
              className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 space-y-1">
        <h3 className="font-medium leading-tight text-foreground line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="text-xs text-muted-foreground/70">{book.series}</p>
      </div>

      {/* Subject Badge */}
      <div className="mt-2">
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          {book.subject}
        </span>
      </div>
    </div>
  );
};
export default BookCard;
