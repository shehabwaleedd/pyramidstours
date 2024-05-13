import React from 'react'
import { TourType } from '@/types/homePageTours';
import { serverTourByTag } from '@/lib/useTourByTag';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import styles from "./page.module.scss"
import TourCard from '@/components/card';
import Image from 'next/image';
import UnifiedToursComponent from '@/components/unifiedToursComponent';
import getBase64 from '@/lib/getLocalBase64';

const imageMap = {
    'cairo-tours': '/backgroundss/Cairo.webp',
    'cairo-day-tours': '/backgroundss/Cairo.webp',
    'giza-day-tours': '/backgroundss/Giza.webp',
    'gizz-tours': '/backgroundss/Giza.webp',
    'alexandria-tours': '/backgroundss/Alexandria.webp',
    'alexandria-day-tours': '/backgroundss/Alexandria.webp',
    'luxor-tours': '/backgroundss/Luxor.webp',
    'luxor-day-tours': '/backgroundss/Luxor.webp',
    'aswan-tours': '/backgroundss/Aswan.webp',
    'aswan-day-tours': '/backgroundss/Aswan.webp',
    'hurghada-tours': '/backgroundss/Hurghada.webp',
    'hurghada-day-tours': '/backgroundss/Hurghada.webp',
    'sharm-el-sheikh-tours': '/backgroundss/Sharm el-Sheikh.webp',
    'sharm-el-sheikh-day-tours': '/backgroundss/Sharm el-Sheikh.webp',
    'siwa-tours': '/backgroundss/Siwa.webp',
    'siwa-day-tours': '/backgroundss/Siwa.webp',
    'dahab-tours': '/backgroundss/Dahab.webp',
    'dahab-day-tours': '/backgroundss/Dahab.webp',
    
};


const descriptionMap: { [key: string]: string } = {
    'cairo-tours': 'Explore the ancient mysteries and modern delights of Cairo. Discover the pyramids, delve into history at the museums, and enjoy the vibrant local life.',
    'cairo-day-tours': 'Perfect day tours in Cairo cover top sights such as the Great Pyramids, the Sphinx, and local markets. Discover Cairo’s rich history and vibrant culture in just one day.',
    'giza-day-tours': 'Step back in time with a day tour in Giza. Visit the iconic pyramids and the Sphinx and learn about their historical significances from expert guides.',
    'giza-tours': 'Uncover the secrets of the ancient world in Giza. Experience the grandeur of the pyramids, take a camel ride, and watch the mesmerizing sound and light show.',
    'alexandria-tours': 'Journey through Alexandria’s storied past and lively present. Visit the Roman amphitheaters, Qaitbay Citadel, and the modern Bibliotheca Alexandrina.',
    'alexandria-day-tours': 'Explore Alexandria on a day trip. See the city’s ancient ruins and modern libraries, and enjoy fresh seafood along the Mediterranean coast.',
    'luxor-tours': 'Discover the open-air museum of Luxor. Tour the Valley of the Kings, Karnak Temple, and witness the enduring legacy of the Pharaohs.',
    'luxor-day-tours': 'Maximize a day in Luxor with visits to its most iconic sights. Explore ancient tombs, marvel at royal treasures, and feel the pulse of ancient history.',
    'aswan-tours': 'Relax in the charm and romance of Aswan. See the Philae Temple, sail on a felucca around Elephantine Island, and visit local Nubian villages.',
    'aswan-day-tours': 'Spend a day discovering Aswan’s treasures. Visit the High Dam, the Unfinished Obelisk, and enjoy tea at a local Nubian house.',
    'hurghada-tours': 'Dive into the Red Sea adventures in Hurghada. Enjoy snorkeling, scuba diving, and relax on the sun-soaked beaches.',
    'hurghada-day-tours': 'Take a quick Hurghada getaway to explore coral reefs and marine life or desert adventures with quad biking and camel rides.',
    'sharm-el-sheikh-tours': 'Indulge in Sharm El Sheikh’s luxury resorts, pristine beaches, and vibrant nightlife. Ideal for a leisurely retreat or an aquatic adventure.',
    'sharm-el-sheikh-day-tours': 'Experience the best of Sharm in a day with a trip to the Sinai desert, snorkeling in the Red Sea, or a visit to St. Catherine’s Monastery.',
    'siwa-tours': 'Escape to the tranquil oasis of Siwa. Explore ancient tombs, bathe in hot springs, and learn about the rich Berber culture.',
    'siwa-day-tours': 'Discover the magic of Siwa in one day. Tour the Oracle Temple, the ruins of Shali, and sample dates and olives grown right in the oasis.',
    'dahab-tours': 'Embrace the laid-back vibe of Dahab. Go windsurfing, diving at the Blue Hole, and savour the Bedouin lifestyle with a desert safari.',
    'dahab-day-tours': 'Explore Dahab’s highlights, from snorkeling in the Blue Hole to trekking the Sinai mountains, all packed into an exciting day.',
    'cultural-tours': 'Immerse yourself in diverse cultures with our Cultural Tours. Experience local traditions, arts, and lifestyles first-hand.',
    'adventure-tours': 'Gear up for thrilling adventures. Our tours promise exciting activities in breathtaking landscapes.',
    'beach-tours': 'Relax on the soft sands and soak up the sun with our Beach Tours. Discover the most serene and beautiful coasts.',
    'private-tours': 'Enjoy a private tour designed just for you. Experience exclusive access and personalized services for a memorable trip.',
    'group-tours': 'Join like-minded travelers on group tours that bring people together in exciting destinations.',
    '1-day-tours': 'Short on time? Our 1-Day Tours pack in plenty of activities and sights without the need for an overnight stay.',
    'budget-tours': 'Travel smart with our Budget Tours. Enjoy amazing trips that are kind on your wallet.',
    'food-tours': 'Taste your way through cities and countrysides. Each food tour offers a delicious insight into local cuisines.',
    'meditation-tours': 'Find your center with our Meditation Tours. Retreats designed to help you relax, rejuvenate, and reconnect.',
    'historical-tours': 'Step back in time with our Historical Tours. Explore ancient sites and learn about past civilizations.',
    'spiritual-tours': 'Seek tranquility and enlightenment on our Spiritual Tours. Visit sacred sites and engage in soulful practices.',
    'custom-tours': 'Create the perfect itinerary with our Custom Tours. Tailor every aspect of your trip to suit your preferences.',
    'city-tours': 'Discover the essence of the world’s most exciting cities. Our City Tours highlight the best of urban life.',
    'cruise-tours': 'Set sail on a luxury cruise. Experience the high seas with comfort and style.',
    'luxury-tours': 'Indulge in the extraordinary with our Luxury Tours. Enjoy world-class accommodations and exclusive experiences.',
    'honeymoon-tours': 'Celebrate your new life together with our Honeymoon Tours. Romantic destinations and unforgettable experiences await.',
    'family-tours': 'Fun and engaging, our Family Tours are designed to delight travelers of all ages.',
    '4-days-3-nights-tours': 'Our 4 Days 3 Nights Tours offer just the right amount of time to explore without rushing.',
    'nile-cruise-tours': 'Cruise the timeless Nile River. Discover the ancient wonders of Egypt from the comfort of a luxurious riverboat.',
    '1-day-tour': 'Perfect for those who want a quick getaway. Our 1-Day Tour offers a complete and enriching experience in just one day.',
    'desert-tours': 'Explore the expansive deserts with our guided tours. Experience the mystery and beauty of the arid landscapes.',
    'top-rated-tours': 'Join our Top Rated Tours, highly recommended by fellow travelers for an exceptional experience.',
    '2-days-tours': 'Escape for a weekend with our 2-Days Tours. Perfect for a quick recharge.',
    'shopping-tours': 'Shop till you drop with our expertly guided Shopping Tours. Visit the best markets and boutiques.',
    'photography-tours': 'Capture breathtaking shots on our Photography Tours. Led by professional photographers in stunning locations.',
    '12-days-11-nights-tours': 'Embark on an epic journey with our 12 Days 11 Nights Tours. See and do it all in a trip that covers all the bases.',
    'family-fours': 'Our Family Fours Tours offer activities and sights that cater to families, ensuring fun for all members.',
    'religious-tours': 'Explore the spiritual landscapes with our Religious Tours. Visit important religious sites and participate in sacred rituals.',
    'luxor-day-tour': 'Spend a day in Luxor and see the best it has to offer, from the Valley of the Kings to the majestic Karnak Temple.'
};

const titleMap: { [key: string]: string } = {
    'cairo-tours': 'Cairo Tours: Ancient Pyramids and Vibrant City Life',
    'cairo-day-tours': 'Cairo Day Tours: Explore the Heart of Egypt',
    'giza-day-tours': 'Giza Day Tours: Visit the Great Pyramids and Sphinx',
    'giza-tours': 'Giza Tours: Discover the Wonders of the Ancient World',
    'alexandria-tours': 'Alexandria Tours: From Ancient Ruins to the Sea',
    'alexandria-day-tours': 'Alexandria Day Tours: A Quick Historical Retreat',
    'luxor-tours': 'Luxor Tours: Walk Through the Valley of Kings',
    'luxor-day-tours': 'Luxor Day Tours: A Journey to Ancient Thebes',
    'aswan-tours': 'Aswan Tours: Nubian Culture and River Views',
    'aswan-day-tours': 'Aswan Day Tours: The Essence of the Nile',
    'hurghada-tours': 'Hurghada Tours: Red Sea Adventures Await',
    'hurghada-day-tours': 'Hurghada Day Tours: Sun, Sand, and Sea',
    'sharm-el-sheikh-tours': 'Sharm El Sheikh Tours: Luxurious Escape by the Red Sea',
    'sharm-el-sheikh-day-tours': 'Sharm El Sheikh Day Tours: Adventure and Relaxation Combined',
    'siwa-tours': 'Siwa Tours: An Oasis of Culture and History',
    'siwa-day-tours': 'Siwa Day Tours: Discovering the Desert’s Charm',
    'dahab-tours': 'Dahab Tours: Dive and Explore the Bedouin Lifestyle',
    'dahab-day-tours': 'Dahab Day Tours: Adventures in the Red Sea and Beyond',
    'cultural-tours': 'Cultural Tours: Dive Deep into Local Traditions and Heritage',
    'adventure-tours': 'Adventure Tours: Thrilling Expeditions for the Fearless',
    'beach-tours': 'Beach Tours: Serene Beachfront Escapes in Pristine Locations',
    'private-tours': 'Private Tours: Exclusive and Personalized Travel Experiences',
    'group-tours': 'Group Tours: Shared Adventures in Iconic Destinations',
    '1-day-tours': '1-Day Tours: Quick Escapes with Rich Experiences',
    'budget-tours': 'Budget Tours: Affordable Trips Without Compromising Quality',
    'food-tours': 'Food Tours: Culinary Journeys Through Local Flavors',
    'meditation-tours': 'Meditation Tours: Peaceful Retreats for Mind and Soul',
    'historical-tours': 'Historical Tours: Exploring the Richness of the Past',
    'spiritual-tours': 'Spiritual Tours: Journeys of Inner Peace and Discovery',
    'custom-tours': 'Custom Tours: Tailored Itineraries for Your Perfect Trip',
    'city-tours': 'City Tours: Explore the Vibrant Heart of Global Cities',
    'cruise-tours': 'Cruise Tours: Luxurious Explorations by Sea',
    'luxury-tours': 'Luxury Tours: Opulent and Meticulously Crafted Travel Experiences',
    'honeymoon-tours': 'Honeymoon Tours: Romantic Getaways to Celebrate Love',
    'family-tours': 'Family Tours: Enjoyable and Safe Adventures for All Ages',
    '4-days-3-nights-tours': '4 Days 3 Nights Tours: Extended Stays Full of Discovery',
    'nile-cruise-tours': 'Nile Cruise Tours: A Classic Voyage Along Historic Waters',
    '1-day-tour': '1-Day Tour: A Perfect Day of Exploration and Fun',
    'desert-tours': 'Desert Tours: Adventures in the Vast and Mystical Expanse',
    'top-rated-tours': 'Top Rated Tours: Highly Recommended Experiences by Travelers',
    '2-days-tours': '2-Days Tours: Short Breaks Packed with Highlights',
    'shopping-tours': 'Shopping Tours: The Best Retail Experiences in Top Markets',
    'photography-tours': 'Photography Tours: Capture Stunning Scenes from Around the World',
    '12-days-11-nights-tours': '12 Days 11 Nights Tours: Comprehensive Journeys Full of Wonder',
    'family-fours': 'Family Fours Tours: Fun and Educational Trips for Families',
    'religious-tours': 'Religious Tours: Sacred Sites and Spiritual Experiences',
    'luxor-day-tour': 'Luxor Day Tour: A Full Day of Ancient Egyptian Splendor'
};


export async function generateMetadata({ params }: { params: { title: string } }) {
    const slugToTile = (slug: string): string => {
        return slug.replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    const title = titleMap[params.title] || `${slugToTile(params.title)} Tours`;
    const description = descriptionMap[params.title] || 'Join us to explore stunning destinations, from historic landmarks to natural wonders. Experience the best tours customized for you.';
    const keywords = `${title}, travel, tours, destinations, attractions`;
    const url = `https://pyramidsegypttour.com/${params.title}`
    type ImageMapKey = keyof typeof imageMap;
    const imageKey = params.title as ImageMapKey;

    // Get the appropriate image URL from the image map, or default if not found
    const imageUrl = imageMap.hasOwnProperty(imageKey) ? imageMap[imageKey] : '/backgroundss/default.webp';


    return {
        title,
        description,
        keywords,
        url,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                },
            ],
            site_name: 'Pyramdis Egypt Tour',
        },
        twitter: {
            title: title,
            description: `Explore ${title} with Pyramid Egypt Tours`,
            cardType: 'summary_large_image',
        }
    }
}


export const revalidate = 1;


export default async function MenuPage({ params }: { params: { title: string } }) {
    const tours = serverTourByTag({ tag: params.title });
    const toursArray = await tours;
    type ImageMapKey = keyof typeof imageMap;


    await Promise.all(toursArray.map(async (tour: any) => {
        tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
            console.error('Failed to load base64 for image:', e);
            return '';
        });
    }));

    const imageKey = params.title as ImageMapKey;
    const backgroundImageUrl = imageMap.hasOwnProperty(imageKey) ? imageMap[imageKey] : '/backgroundss/default.webp';

    return (
        <main className={styles.menuPage}>
            <section className={styles.menuPage__upper}>
                <Image src={backgroundImageUrl} alt="search" width={1920} height={1080} />
                <div className={styles.menuPage__upper__text}>
                    <h1>{params.title.replace(/[-%20]/g, ' ')}</h1>
                </div>
            </section>
            <section className={styles.menuPage__lower}>
                {toursArray.length > 0 ?
                    <>
                        <div className={styles.menuPage__lower_tours}>
                            {toursArray.map((tour: TourType, index: number) => (
                                <TourCard key={tour._id} tour={tour} base64={tour.base64 ?? ''} priority={index < 4} />
                            ))}
                        </div>
                        <UnifiedToursComponent type="like" />
                    </>
                    : (
                        <>
                            <h2>Sorry, No Tours Found</h2>
                            <UnifiedToursComponent type="like" />
                        </>
                    )}
            </section>
        </main>
    )
}



