"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBookStore } from "@/store/useBookStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BookDetails {
  title: string;
  author: string;
  grade: string;
  subject: string;
  series: string;
  cover_image: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const router = useRouter();
  const addBook = useBookStore((state) => state.addBook);

  const [step, setStep] = useState<"upload" | "processing" | "edit">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    title: "",
    author: "",
    grade: "",
    subject: "",
    series: "",
    cover_image: "",
  });
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const apikey = useRef<string | null>(null);

  useEffect(() => {
    const key = localStorage.getItem("geminiApiKey");
    if (!key) {
      router.push("/");
      return;
    }
    apikey.current = key;
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setImageBase64(result.split(",")[1]);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = async () => {
    if (!imageBase64) return;

    setStep("processing");
    setIsProcessing(true);
    setError("");

    try {
      const response = await axios.post("/api/process-img", {
        imageBase64,
        apikey: apikey.current,
      });

      const data = response.data;

      if (data.success) {
        setBookDetails({
          title: data.details.title || "",
          author: data.details.author || "",
          grade: data.details.grade || "",
          subject: data.details.subject || "",
          series: data.details.series || "",
          cover_image: imageBase64,
        });
        setStep("edit");
      } else {
        throw new Error(data.error || "Failed to extract book details");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image");
      setStep("upload");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!bookDetails.title.trim()) {
      setError("Book title is required");
      return;
    }

    try {
      setIsProcessing(true);
      const { success, error }: any = (
        await axios.post("/api/save-img-data", {
          ...bookDetails,
          imageBase64,
        })
      ).data;
      if (!success) {
        throw new Error(error || "Failed to save book");
      }
      setError("");
      setStep("upload");
      addBook(bookDetails);
      handleClose();
    } catch (error) {
      console.log("Error saving book:", error);
      setError("Failed to save book. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep("upload");
    setSelectedImage(null);
    setImageBase64("");
    setBookDetails({
      title: "",
      author: "",
      grade: "",
      subject: "",
      series: "",
      cover_image: "",
    });
    setError("");
    setIsProcessing(false);
    onClose();
  };

  const handleInputChange = (field: keyof BookDetails, value: string) => {
    setBookDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Step */}
        {step === "upload" && (
          <div className="space-y-2">
            {!selectedImage ? (
              <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Upload className="text-muted-foreground" />{" "}
                      <h3 className="text-lg font-medium">Book Cover</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      upload an image of the book cover
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG (max 5MB)
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src={selectedImage}
                    alt="Selected book cover"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedImage(null);
                      setImageBase64("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleProcessImage}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Process with AI
                  </Button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Processing Image</h3>
              <p className="text-sm text-muted-foreground">
                AI is extracting book details from the cover...
              </p>
            </div>
          </div>
        )}

        {/* Edit Step */}
        {step === "edit" && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Image
                src={selectedImage ?? ""}
                alt="Book cover"
                className="w-24 h-32 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-medium">Review & Edit Details</h3>
                <p className="text-sm text-muted-foreground">
                  AI has extracted the following details. Please review and edit
                  as needed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={bookDetails.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter book title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={bookDetails.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Enter author name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Input
                  id="grade"
                  value={bookDetails.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                  placeholder="e.g., K-2, 3-5, 6-8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={bookDetails.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="e.g., Math, Science, Reading"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="series">Series</Label>
                <Input
                  id="series"
                  value={bookDetails.series}
                  onChange={(e) => handleInputChange("series", e.target.value)}
                  placeholder="Enter series name if applicable"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {isProcessing ? <Loader2 /> : "Save Book"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
