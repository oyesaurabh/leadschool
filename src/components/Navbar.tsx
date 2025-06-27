"use client";

import { useState } from "react";
import Link from "next/link";

import AddBookModal from "@/components/AddBookmodal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode";
import { useGridStore } from "@/store/useIsGridStore";

import { Search, Grid3X3, List, Plus, Loader2 } from "lucide-react";
import { useBookStore } from "@/store/useBookStore";
import axios from "axios";

export default function Navbar() {
  const setBooks = useBookStore((state) => state.setBooks);
  const { isGrid, alterGrid } = useGridStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    try {
      setIsLoading(true);
      const fetchData = async () => {
        const response = await axios.get(`/api/get-data?search=${searchQuery}`);
        const { success, books } = response.data;
        if (!success) throw new Error("Failed to fetch books");
        setBooks(books);
      };
      fetchData();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background border-b z-99">
        <div className="flex items-center justify-between px-2 py-3">
          <div className="items-center hidden md:block">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Change API Key
            </Link>
          </div>

          {/* Middle - Search Box with View Toggle */}
          <div className="flex items-center space-x-2 flex-1 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              className="cursor-pointer"
              size="icon"
              variant={"default"}
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={alterGrid}
              className="shrink-0"
            >
              {isGrid ? (
                <List className="h-4 w-4 cursor-pointer" />
              ) : (
                <Grid3X3 className="h-4 w-4 cursor-pointer" />
              )}
            </Button>
          </div>

          {/* Right - Add New Book */}
          <div className="flex flex-row items-center justify-between gap-2">
            <Button
              className="flex items-center cursor-pointer"
              onClick={() => setIsAddBookModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:block">Add New Book</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
      />
    </>
  );
}
