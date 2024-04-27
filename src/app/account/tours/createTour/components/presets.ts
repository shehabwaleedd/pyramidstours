import { GroupSize } from "@/types/createTour";

export const presetOptionNames = [
    { name: "Ticket for great pyramids" },
    { name: "Ticket for sphinx" },
    { name: "Ticket for egyptian museum" },
    { name: "Ticket for khan el khalili" },
    { name: "Ticket for citadel" },
    { name: "Ticket for mohamed ali mosque" },
    { name: "Ticket for coptic cairo" },
    { name: "Ticket for islamic cairo" },
    { name: "Ticket for al azhar park" },
    { name: "Ticket for al azhar mosque" },
    { name: "Ticket for cairo tower" },
    { name: "Ticket for nile cruise" },
    { name: "Ticket for felucca ride" },
    { name: "Ticket for sound and light show" },
    { name: "Ticket for sandboarding" },
    { name: "Desert safari" },
    { name: "Bedouin dinner" },
    { name: "Belly dance show" },
    { name: "Ticket for tanoura show" },
    { name: "Feluka ride" },
    { name: "Quad bike" },
    { name: "Hot air balloon" },
    { name: "Snorkeling" },
    { name: "Diving" },
    { name: "Parasailing" },
    { name: "Banana boat" },
    { name: "Glass boat" },
    { name: "Submarine" },
    { name: "Horse carriage" },
    { name: "Horse ride" },
    { name: "Buggy ride" },
    { name: "Sandboarding" },
    { name: "Desert safari" },
    { name: "Bedouin dinner" },
    { name: "Belly dance show" },
    { name: "Tanoura show" },
    { name: "Alabaster factory" },
    { name: "Papyrus institute" },
    { name: "Perfume factory" },
    { name: "Cotton shop" },
    { name: "Gold shop" },
    { name: "Silver shop" },
    { name: "Spice shop" },
    { name: "Camel ride" },
    { name: "Sound and light show" },
    { name: "Mohamed ali mosque" },
    { name: "Coptic cairo" },
    { name: "Islamic cairo" },
    { name: "Al azhar park" },
    { name: "Al azhar mosque" },
    { name: "Cairo tower" },
    { name: "Nile cruise" },
    { name: "Felucca ride" },
    { name: "Great pyramids" },
    { name: "Sphinx" },
    { name: "Egyptian museum" },
    { name: "Khan el khalili" },
    { name: "Citadel" },
    { name: "Luxor temple" },
    { name: "Inside King Tutankhmen Tomb" },
    { name: "Karnak temple" },
    { name: "Baloon" },
    { name: "Valley of the kings" },
    { name: "Hatshepsut temple" },
    { name: "Colossi of memnon" },
    { name: "Edfu temple" },
    { name: "Kom ombo temple" },
    { name: "Philae temple" },
    { name: "High dam" },
    { name: "Unfinished obelisk" },
    { name: "Private Beach" },
    { name: "German Guide" },
    { name: "Spanish Guide" },
    { name: "Italian Guide" },
    { name: "French Guide" },
    { name: "Russian Guide" },
    { name: "Chinese Guide" },
    { name: "Japanese Guide" },
    { name: "Korean Guide" },
    { name: "Arabic Guide" },
    { name: "Dutch Guide" },
    { name: "Portuguese Guide" },
    { name: "Turkish Guide" },
    { name: "Greek Guide" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Breakfast" },
    { name: "Snacks" },
    { name: "Soft Drinks" },
    { name: "Alcoholic Drinks" },
    { name: "Water" },
    { name: "Accommodation" },
    { name: "Local Transportation" },
    { name: "Entrance Fees" },
    { name: "Guided Tour" },
    { name: "Welcome Drink" },
    { name: "Airport Transfers" },
    { name: "Tipping" },
    { name: "Travel Insurance" },
    { name: "Welcome Drink" },
    { name: "Pickup & Dropoff from Cairo Airport or Hotel" },
    { name: "Pickup & Dropoff from Luxor Airport or Hotel" },
    { name: "Pickup & Dropoff from Aswan Airport or Hotel" },
    { name: "Pickup & Dropoff from Hurghada Airport or Hotel" },
    { name: "Pickup & Dropoff from Sharm El Sheikh Airport or Hotel" },
    { name: "Pickup & Dropoff from Alexandria Airport or Hotel" },
    { name: "3 Stars Hotel" },
    { name: "4 Stars Hotel" },
    { name: "5 Stars Hotel" },
    { name: "Admission to go inside the Great Pyramid (King chamber room) " },
    { name: "entry admissions inside Chephren Pyramid" },
    { name: "Extra Sleep Train Ticket" },
    { name: "Extra Flight Ticket" },
];

export const presetInclusions = [
    "An English-Speaking Egyptologist",
    "An English-Speaking Tour Guide",
    "All Our Transfers Are Arranged By Private A/C Vehicle.",
    "Tasty Lunch In A Local Restaurant.",
    "Complimentary breakfast.",
    "Airport transfers.",
    "Welcome drink.",
    "Guided tour.",
    "Entrance fees to all the mentioned sitesd",
    "Local transportation.",
    "Accommodation.",
    "All service charges & taxes.",
    "A Bottle Of Water",
    "Hotel pickup and drop-off",
    "Qualified Egyptologist guide",
    "Private tour",
    "Egyptian Karkade (Hibiscus tea)",
    "Cruise cabin with all facilities",
    "Qualified licensed drivers.",
    "Meals start with lunch first day end with breakfast last day.",
    "3 nights on 5 stars Nile cruise board",
    "Door to door transfers from and to your hotel in Cairo or Giza",
    "Dinner",
    "Breakfast",
    "Lunch",
    "Abu Simbel trip.",
    "West and east banks in Luxor.",
    "Edfu temple and Kom Ombo temples",
    "All the sites which mentioned in itinerary.",
    "First class A/C seated train tickets(sleeping train or flight available with extra 150$ p.p)",
    "2-night stay in an all-inclusive resort in Hurghada",
    "Entry/Admission - Pyramids of Giza",
    "Accommodation for 3 nights in a Nile Cruise from Aswan to Luxor",
    "Entry/Admission - Khan Al-Khalili",
    "Riding camel for 30 minutes during the tour",
    "Entry/Admission - Saqqara (Sakkara) Pyramids",

];

export const presetExclusions = [
    "Entry Fees not included.",
    "Dinner not included.",
    "Personal expenses not covered.",
    "Tipping not included.",
    "Travel insurance not included.",
    "Tickets not included.",
    "Beverages not included.",
    "Alcoholic drinks not included.",
    "Accommodation not included.",
    "Local transportation not included.",
    "Guided tour not included.",
    "Welcome drink not included.",
    "Airport Pickup and drop off (will be for an additional charge)",
    "Motorboat to Philae Temple.",
    "entry admissions inside Chephren Pyramid",
    "Admission to go inside the Great Pyramid (King chamber room)",
    "Wifi on The cruise (with extra charge on the cruise)",
    "Water or Drinks on the cruise."

];

export const presetWeekDays = [
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
]

export const adultGroupSizes: GroupSize[] = [
    { label: "1 adult", value: 1 },
    { label: "2 adults", value: 2 },
    { label: "3 adults", value: 3 },
    { label: "4 adults", value: 4 },
    { label: "5 adults", value: 5 },
    { label: "6 adults", value: 6 },
    { label: "7 adults", value: 7 },
    { label: "8 adults", value: 8 },
    { label: "9 adults", value: 9 },
    { label: "10 adults", value: 10 }
];

export const childrenGroupSizes: GroupSize[] = [
    { label: "1 child", value: 1 },
    { label: "2 children", value: 2 },
    { label: "3 children", value: 3 },
    { label: "4 children", value: 4 },
    { label: "5 children", value: 5 },
    { label: "6 children", value: 6 },
    { label: "7 children", value: 7 },
    { label: "8 children", value: 8 },
    { label: "9 children", value: 9 },
    { label: "10 children", value: 10 }
];


export const repeatedTimes = [
    { label: "06:00", value: "6" },
    { label: "07:00", value: "7" },
    { label: "08:00", value: "8" },
    { label: "09:00", value: "9" },
    { label: "10:00", value: "10" },
    { label: "11:00", value: "11" },
    { label: "12:00", value: "12" },
    { label: "13:00", value: "13" },
    { label: "14:00", value: "14" },
    { label: "15:00", value: "15" },
    { label: "16:00", value: "16" },
    { label: "17:00", value: "17" },
    { label: "18:00", value: "18" },
    { label: "19:00", value: "19" },
    { label: "20:00", value: "20" },
    { label: "21:00", value: "21" },
    { label: "22:00", value: "22" },

]


export const duration = [
    "1 hour",
    "2 hours",
    "3 hours",
    "4 hours",
    "5 hours",
    "6 hours",
    "7 hours",
    "8 hours",
    "9 hours",
    "10 hours",
    "11 hours",
    "12 hours",
    "13 hours",
    "14 hours",
    "15 hours",
    "16 hours",
    "17 hours",
    "18 hours",
    "19 hours",
    "20 hours",
    "21 hours",
    "22 hours",
    "23 hours",
    "24 hours",
    "2 Days",
    "3 Days",
    "4 Days",
    "5 Days",
    "6 Days",
    "7 Days",
    "8 Days",
    "9 Days",
    "10 Days",
    "11 Days",
    "12 Days",
]

export const presetLocations = [
    { label: "Cairo", value: "Cairo" },
    { label: "Giza", value: "Giza" },
    { label: "Alexandria", value: "Alexandria" },
    { label: "Luxor", value: "Luxor" },
    { label: "Aswan", value: "Aswan" },
    { label: "Hurghada", value: "Hurghada" },
    { label: "Sharm El Sheikh", value: "Sharm El Sheikh" },
    { label: "Fayioum", value: "Fayioum" },
    { label: "Siwa", value: "Siwa" },
    { label: "Bahariya", value: "Bahariya" },
    { label: "Farafra", value: "Farafra" },
    { label: "Dakhla", value: "Dakhla" },
    { label: "Kharga", value: "Kharga" },
    { label: "Baris Oasis", value: "Baris Oasis" },
    { label: "Marsa Matrouh", value: "Marsa Matrouh" },
    { label: "El Alamein", value: "El Alamein" },
    { label: "Ras Sudr", value: "Ras Sudr" },
    { label: "Ras Shitan", value: "Ras Shitan" },
    { label: "Ras Abu Galum", value: "Ras Abu Galum" },
    { label: "Saint Catherine", value: "Saint Catherine" },
    { label: "Dahab", value: "Dahab" },
    { label: "Nuweiba", value: "Nuweiba" },
    { label: "Taba", value: "Taba" },
    { label: "Marsa Alam", value: "Marsa Alam" },
    { label: "El Gouna", value: "El Gouna" },
    { label: "Sahl Hasheesh", value: "Sahl Hasheesh" },
    { label: "Safaga", value: "Safaga" },
    { label: "Marsa Alam", value: "Marsa Alam" },
    { label: "Giza Pyramids", value: "Giza Pyramids" },
    { label: "Saqqara", value: "Saqqara" },
    { label: "Old Cairo", value: "Old Cairo" },
    { label: "Dahshur", value: "Dahshur" },
    { label: "Memphis", value: "Memphis" },
    { label: "Cairo Citadel", value: "Cairo Citadel" },
    { label: "Cairo Tower", value: "Cairo Tower" },
    { label: "Khan El Khalili", value: "Khan El Khalili" },
    { label: "Al Azhar Mosque", value: "Al Azhar Mosque" },
    { label: "Dahab", value: "Dahab" },
    { label: "Nuweiba", value: "Nuweiba" },
    { label: "Taba", value: "Taba" },
    { label: "Marsa Alam", value: "Marsa Alam" },
    { label: "El Gouna", value: "El Gouna" },
    { label: "Sahl Hasheesh", value: "Sahl Hasheesh" },
    { label: "Safaga", value: "Safaga" },
    { label: "Marsa Alam", value: "Marsa Alam" },
    { label: "Giza Pyramids", value: "Giza Pyramids" },
    { label: "Saqqara", value: "Saqqara" },
    { label: "Dahshur", value: "Dahshur" },
    { label: "Memphis", value: "Memphis" },
    { label: "Cairo Citadel", value: "Cairo Citadel" },
    { label: "Cairo Tower", value: "Cairo Tower" },
    { label: "Khan El Khalili", value: "Khan El Khalili" },
    { label: "Al Azhar Mosque", value: "Al Azhar Mosque" },
    { label: "Al Azhar Park", value: "Al Azhar Park" },
    { label: "Islamic Cairo", value: "Islamic Cairo" },
    { label: "Coptic Cairo", value: "Coptic Cairo" },
    { label: "Tahrir Square", value: "Tahrir Square" },
]

export const categoryOptions = [
    { label: "Cultural Tours", value: "cultural-tours" },
    { label: "Historical Tours", value: "historical-tours" },
    { label: "Adventure Tours", value: "adventure-tours" },
    { label: "Religious Tours", value: "religious-tours" },
    { label: "Safari Tours", value: "safari-tours" },
    { label: "Desert Tours", value: "desert-tours" },
    { label: "Beach Tours", value: "beach-tours" },
    { label: "City Tours", value: "city-tours" },
    { label: "Shopping Tours", value: "shopping-tours" },
    { label: "Family Tours", value: "family-tours" },
    { label: "Honeymoon Tours", value: "honeymoon-tours" },
    { label: "Luxury Tours", value: "luxury-tours" },
    { label: "Budget Tours", value: "budget-tours" },
    { label: "Group Tours", value: "group-tours" },
    { label: "Private Tours", value: "private-tours" },
    { label: "Custom Tours", value: "custom-tours" },
    { label: "Educational Tours", value: "educational-tours" },
    { label: "Photography Tours", value: "photography-tours" },
    { label: "Food Tours", value: "food-tours" },
    { label: "Wine Tours", value: "wine-tours" },
    { label: "Beer Tours", value: "beer-tours" },
    { label: "Spiritual Tours", value: "spiritual-tours" },
    { label: "Health Tours", value: "health-tours" },
    { label: "Yoga Tours", value: "yoga-tours" },
    { label: "Meditation Tours", value: "meditation-tours" },
    { label: "Pilgrimage Tours", value: "pilgrimage-tours" },
    { label: "Cruise Tours", value: "cruise-tours" },
    { label: "Fishing Tours", value: "fishing-tours" },
    { label: "Golf Tours", value: "golf-tours" },
    { label: "Hiking Tours", value: "hiking-tours" },
    { label: "Cairo Day Tours", value: "cairo-day-tours" },
    { label: "Giza Day Tours", value: "giza-day-tours" },
    { label: "Alexandria Day Tours", value: "alexandria-day-tours" },
    { label: "Luxor Day Tours", value: "luxor-day-tours" },
    { label: "Aswan Day Tours", value: "aswan-day-tours" },
    { label: "Hurghada Day Tours", value: "hurghada-day-tours" },
    { label: "Sharm El Sheikh Day Tours", value: "sharm-el-sheikh-day-tours" },
    { label: "Fayoum Day Tours", value: "fayoum-day-tours" },
    { label: "Siwa Day Tours", value: "siwa-day-tours" },
    { label: "Bahariya Day Tours", value: "bahariya-day-tours" },
    { label: "Farafra Day Tours", value: "farafra-day-tours" },
    { label: "Dakhla Day Tours", value: "dakhla-day-tours" },
    { label: "Kharga Day Tours", value: "kharga-day-tours" },
    { label: "Baris Oasis Day Tours", value: "baris-oasis-day-tours" },
    { label: "Marsa Matrouh Day Tours", value: "marsa-matrouh-day-tours" },
    { label: "El Alamein Day Tours", value: "el-alamein-day-tours" },
    { label: "Ras Sudr Day Tours", value: "ras-sudr-day-tours" },
    { label: "Ras Shitan Day Tours", value: "ras-shitan-day-tours" },
    { label: "Ras Abu Galum Day Tours", value: "ras-abu-galum-day-tours" },
    { label: "Saint Catherine Day Tours", value: "saint-catherine-day-tours" },
    { label: "Dahab Day Tours", value: "dahab-day-tours" },
    { label: "Nuweiba Day Tours", value: "nuweiba-day-tours" },
    { label: "Taba Day Tours", value: "taba-day-tours" },
    { label: "Marsa Alam Day Tours", value: "marsa-alam-day-tours" },
    { label: "El Gouna Day Tours", value: "el-gouna-day-tours" },
    { label: "Sahl Hasheesh Day Tours", value: "sahl-hasheesh-day-tours" },
    { label: "1 Day Tours", value: "1-day-tours" },
    { label: "2 Days 1 Nights Tours", value: "2-days-1-nights-tours" },
    { label: "3 Days 2 Nights Tours", value: "3-days-2-nights-tours" },
    { label: "4 Days 3 Nights Tours", value: "4-days-3-nights-tours" },
    { label: "5 Days 4 Nights Tours", value: "5-days-4-nights-tours" },
    { label: "6 Days 5 Nights Tours", value: "6-days-5-nights-tours" },
    { label: "7 Days 6 Nights Tours", value: "7-days-6-nights-tours" },
    { label: "8 Days 7 Nights Tours", value: "8-days-7-nights-tours" },
    { label: "9 Days 8 Nights Tours", value: "9-days-8-nights-tours" },
    { label: "10 Days 9 Nights Tours", value: "10-days-9-nights-tours" },
    { label: "11 Days 10 Nights Tours", value: "11-days-10-nights-tours" },
    { label: "12 Days 11 Nights Tours", value: "12-days-11-nights-tours" },
    { label: "Top Rated Tours", value: "top-rated-tours" },
    { label: "Nile Cruise Tours", value: "nile-cruise-tours" },
    { label: "Shore Excursions", value: "shore-excursions" },
    { label: "Cairo Airport Transfers", value: "cairo-airport-transfers" },
    { label: "Luxor Airport Transfers", value: "luxor-airport-transfers" },
    { label: "Aswan Airport Transfers", value: "aswan-airport-transfers" },
    { label: "Hurghada Airport Transfers", value: "hurghada-airport-transfers" },
    { label: "Sharm El Sheikh Airport Transfers", value: "sharm-el-sheikh-airport-transfers" },
    { label: "Giza Tours", value: "giza-tours" },
    { label: "Cairo Tours", value: "cairo-tours" },
    { label: "Luxor Tours", value: "luxor-tours" },
    { label: "Aswan Tours", value: "aswan-tours" },
    { label: "Hurghada Tours", value: "hurghada-tours" },
    { label: "Sharm El Sheikh Tours", value: "sharm-el-sheikh-tours" },
    { label: "Alexandria Tours", value: "alexandria-tours" },
    { label: "Fayoum Tours", value: "fayoum-tours" },
    { label: "Siwa Tours", value: "siwa-tours" },
    { label: "Bahariya Tours", value: "bahariya-tours" },
    { label: "Farafra Tours", value: "farafra-tours" },
    { label: "Dakhla Tours", value: "dakhla-tours" },
    { label: "Kharga Tours", value: "kharga-tours" },
    { label: "Baris Oasis Tours", value: "baris-oasis-tours" },
    { label: "Marsa Matrouh Tours", value: "marsa-matrouh-tours" },
    { label: "Dahab Tours", value: "dahab-tours" },

];
