import Navbar from "@/components/Navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeroHighlight>
        <div>
          <Navbar />
          {children}
        </div>
      </HeroHighlight>
    </>
  );
}
