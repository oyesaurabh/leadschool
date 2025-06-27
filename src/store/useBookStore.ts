// src/store/useBookStore.ts
import { create } from "zustand";

type BookDetails = {
  title: string;
  author: string;
  grade?: string;
  subject?: string;
  series?: string;
  cover_image: string;
};

type BookStore = {
  books: BookDetails[];
  addBook: (book: BookDetails) => void;
  setBooks: (books: BookDetails[]) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),
  setBooks: (books) => set({ books }),
}));
