import "./globals.css";
import SmoothScrolling from "@/animation/SmoothScrolling";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from '@/context/AuthContext';

interface Metadata {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  ogImage: string;
  ogDescription: string;
  twitterCard: string;
  twitterDescription: string;
  twitterTitle: string;
  twitterImage: string;
}

export const metadata: Metadata = {
  title: "Pyramids Egypt Tours - Explore Ancient Wonders",
  description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
  keywords: "Pyramids Egypt Tours, Giza Pyramids, Sphinx, Egypt Tours, Ancient Egypt, Historical Tours, Egypt Travel, Cairo Tours",
  author: "Pyramids Egypt Tours",
  ogTitle: "Pyramids Egypt Tours - Explore Ancient Wonders",
  ogType: "website",
  ogUrl: "https://www.pyramidsegypttours.com",
  ogImage: "https://www.pyramidsegypttours.com/og-image.jpg",
  ogDescription: "Discover the ancient wonders of Egypt with Pyramids Egypt Tours. From the majestic Giza Pyramids to the enigmatic Sphinx, our tours offer an unforgettable journey through Egypt's rich history and culture.",
  twitterCard: "summary_large_image",
  twitterDescription: "Discover the ancient wonders of Egypt with Pyramids Egypt Tours. Explore the Giza Pyramids, Sphinx, and more. Book your journey through Egypt's rich history now.",
  twitterTitle: "Pyramids Egypt Tours - Explore Ancient Wonders",
  twitterImage: "https://www.pyramidsegypttours.com/twitter-image.jpg",
};

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: "no",
  viewportFit: "cover",
  themeColor: "var(--background-color)",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
