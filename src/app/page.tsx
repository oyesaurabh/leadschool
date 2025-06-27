"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Link from "next/link";

export default function Home() {
  const [api, setApi] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    try {
      if (!api) {
        toast.error("Please enter your API key.");
        return;
      }

      localStorage.setItem("geminiApiKey", api);
      setApi("");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
      toast.success("API key saved locally");
    } catch (error) {
      console.error("Error submitting API key:", error);
      toast.error("Error submitting API key. Please try again.");
    }
  };
  return (
    <>
      <Toaster />
      <HeroHighlight>
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    LeadSchool
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transform Your School with Future-Ready Learning Solutions.
                    LEAD School System builds confidence in your students
                    through Unmatched Curriculum & At-home Support For Your
                    Students.
                  </p>
                </div>

                {/* API Input */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      API Key
                    </label>
                    <Input
                      type="text"
                      value={api}
                      onChange={(e) => setApi(e.target.value)}
                      placeholder="Enter your Gemini API key"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={!api.trim()}
                  >
                    Get Started
                  </Button>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Created by{" "}
                    <Link
                      href={"https://www.linkedin.com/in/notsaurabh/"}
                      className="text-primary hover:underline"
                    >
                      Saurabh
                    </Link>{" "}
                    with ❤️.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroHighlight>
    </>
  );
}
