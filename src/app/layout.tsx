import { AuthProvider } from "@/context/AuthContext";
import WhatsappIcon from "@/components/whatsappIcon";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AuthForms from '@/components/loginForm';
import Script from "next/script";
import { Toaster } from "sonner";
import { serverUseToursByIds } from "@/lib/tours/serverUseToursByIds";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"));
import "./globals.css";
import SmoothScroller from "@/animation/SmoothScrolling";
import CookiesConsent from "@/components/cookiesConsent";

export const metadata = {
  title: "Pyramids Egypt Tours - Best Egypt Travel Packages & Tours",
  description: "Discover the best Egypt travel packages and tours with Pyramids Egypt Tours. Explore the ancient pyramids, Sphinx, Nile cruises, and more with our expert guides.",
  keywords: [
    "Egypt travel packages",
    "Egypt tours",
    "Pyramids of Giza",
    "Nile cruises",
    "Cairo tours",
    "Luxor tours",
    "Aswan tours",
    "Alexandria tours",
    "Red Sea resorts",
    "Egyptian museums",
    "Ancient Egyptian sites",
    "Historical tours in Egypt",
    "Egypt vacation packages",
    "Desert safaris in Egypt",
    "Diving in the Red Sea",
    "Cultural tours in Egypt",
    "Egypt sightseeing tours",
    "Family tours in Egypt",
    "Luxury travel in Egypt",
    "Egypt adventure tours",
    "Egypt travel deals",
    "Best places to visit in Egypt",
    "Guided tours of Egypt",
    "Egypt holiday packages",
    "Egyptian heritage tours",
    "Cairo day trips",
    "Giza pyramids tour",
    "Egypt travel guide",
    "Egypt tourist attractions",
    "Egypt tourism 2024"
], 
  author: "Pyramids Egypt Tours",
  openGraph: {
    type: "website",
    title: "Pyramids Egypt Tours - Best Egypt Travel Packages & Tours",
    description: "Discover the best Egypt travel packages and tours with Pyramids Egypt Tours. Explore the ancient pyramids, Sphinx, Nile cruises, and more with our expert guides.",
    url: "https://res.cloudinary.com/ds20vy7zo/image/upload/v1718916258/2_vjkdel.jpg",
    images: [
      {
        url: "https://res.cloudinary.com/ds20vy7zo/image/upload/v1718916258/2_vjkdel.jpg",
        width: 1200,
        height: 630,
        alt: "Pyramids Egypt Tours - Best Egypt Travel Packages & Tours",
      },
    ],
    site_name: "Pyramids Egypt Tours",
  },
  twitter: {
    card: "summary",
    site: "@PyramidsEgyptTours",
    title: "Pyramids Egypt Tours - Best Egypt Travel Packages & Tours",
    description: "Discover the best Egypt travel packages and tours with Pyramids Egypt Tours. Explore the ancient pyramids, Sphinx, Nile cruises, and more with our expert guides.",
  },
  alternates: {
    canonical: "https://pyramidsegypttour.com",
  }
};

async function fetchTours() {
  const tours = await serverUseToursByIds('') ?? [];
  return tours;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tours = await fetchTours();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Pyramids Egypt Tours",
    "url": "https://pyramidsegypttour.com",
    "logo": "https://res.cloudinary.com/ds20vy7zo/image/upload/v1718916258/2_vjkdel.jpg",
    "description": "Discover the best Egypt travel packages and tours with Pyramids Egypt Tours. Explore the ancient pyramids, Sphinx, Nile cruises, and more with our expert guides.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201148544091",
      "contactType": "Customer Service",
      "areaServed": "EG",
      "availableLanguage": ["English", "Arabic", "Spanish"]
    },
    "sameAs": [
      "https://www.facebook.com/PyramidsEgyptTours",
      "https://www.twitter.com/PyramidsEgyptTours",
      "https://www.instagram.com/PyramidsEgyptTours"
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} id="structured-data" />
      </head>
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CurrencyProvider>
              <Navbar tours={tours} />
              <Toaster />
              <SmoothScroller />
              <CookiesConsent />
              {children}
            </CurrencyProvider>
            <WhatsappIcon />
            <AuthForms />
            <Footer />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
