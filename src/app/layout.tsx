import "./globals.css";
import SmoothScrolling from "@/animation/SmoothScrolling";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from '@/context/AuthContext';

interface OpenGraph {
  type: string;
  title: string;
  description: string;
  images: string; // Note the singular 'image' if only one image is used
  url: string;
  site_name: string;
}

interface Metadata {
  title: string;
  description: string;
  keywords: string;
  author: string;
  openGraph: OpenGraph; // Use OpenGraph type here
}


export const metadata: Metadata = {
  title: "Pyramids Egypt Tours - Explore Ancient Wonders",
  description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
  keywords: "Pyramids Egypt Tours, Giza Pyramids, Sphinx, Egypt Tours, Ancient Egypt, Historical Tours, Egypt Travel, Cairo Tours",
  author: "Pyramids Egypt Tours",
  openGraph: {
    type: "website",
    title: "Pyramids Egypt Tours - Explore Ancient Wonders",
    description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
    images: "/assets/backgrounds/2.jpg",
    url: "https://pyramidsegypttour.com",
    site_name: "Pyramids Egypt Tours",
  },

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
