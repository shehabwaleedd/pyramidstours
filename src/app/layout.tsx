import { AuthProvider } from "@/context/AuthContext";
import WhatsappIcon from "@/components/whatsappIcon";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AnimationProvider } from "@/context/AnimationContext";
import AuthForms from '@/components/loginForm';
import Script from "next/script";
import { Toaster } from "sonner";
import { serverUseToursByIds } from "@/lib/tours/serverUseToursByIds";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"));
import "./globals.css"

export const metadata = {
  title: "Pyramids Egypt Tours - Explore Ancient Wonders",
  description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
  keywords: "Pyramids Egypt Tours, Giza Pyramids, Sphinx, Egypt Tours, Ancient Egypt, Historical Tours, Egypt Travel, Cairo Tours",
  author: "Pyramids Egypt Tours",
  openGraph: {
    type: "website",
    title: "Pyramids Egypt Tours - Explore Ancient Wonders",
    description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
    images: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710937871/rthedhnufmo6l3rz69d0.jpg",
    url: "https://www.pyramidsegypttour.com",
    site_name: "Pyramids Egypt Tours",
  },
  twitter: {
    card: "summary",
    site: "@PyramidsEgyptTours",
    title: "Pyramids Egypt Tours - Explore Ancient Wonders",
    description: "Embark on a journey through time with Pyramids Egypt Tours. Discover the ancient wonders of the Giza Pyramids, Sphinx, and more. Experience the rich history and breathtaking landscapes of Egypt with our expert-guided tours.",
    image: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710937871/rthedhnufmo6l3rz69d0.jpg",
  },
};

async function fetchTours() {
  const tours = await serverUseToursByIds('') ?? [];
  return tours;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tours = await fetchTours();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <Script strategy="worker" async src="https://www.googletagmanager.com/gtag/js?id=G-RDCTEVEDHC"></Script>
        <Script id="google-analytics" strategy="worker">
          {`{
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RDCTEVEDHC');
          }`}
        </Script>
      </head>
      <body>
        <AuthProvider>
          <WishlistProvider>
            <AnimationProvider>
              <CurrencyProvider>
                <Navbar tours={tours} />
                <Toaster />
                {children}
              </CurrencyProvider>
              <WhatsappIcon />
              <AuthForms />
              <Footer />
            </AnimationProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
