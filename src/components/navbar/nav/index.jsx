import Body from './Body';
import Footer from './Footer';

const Data = [
  { id: 0, title: "Home", href: "/", expandable: false },
  { id: 32, title: "All Tours", href: "/tours", expandable: false },
  { id: 10, title: "Top Rated Tours", href: "/top-rated-tours", expandable: false },
  { id: 5, title: "Cairo Day Tours", href: "/cairo-day-tours", expandable: false },
  { id: 6, title: "Luxor Day Tours", href: "/luxor-day-tours", expandable: false },
  { id: 7, title: "Aswan Day Tours", href: "/aswan-day-tours", expandable: false },
  { id: 12, title: "Giza Day Tours", href: "/giza-day-tours", expandable: false },
  { id: 13, title: "Alexandria Day Tours", href: "/alexandria-day-tours", expandable: false },
  { id: 14, title: "Hurghada Tours", href: "/hurghada-tours", expandable: false },
  { id: 15, title: "Sharm El Sheikh Tours", href: "/sharm-el-sheikh-tours", expandable: false },
  { id: 16, title: "Dahab Tours", href: "/dahab-tours", expandable: false },
  { id: 17, title: "Taba Tours", href: "/taba-tours", expandable: false },
  {
    id: 3,
    title: "Egypt Travel Packages",
    href: "/packages",
    expandable: true,
    desc: [
      { title: "3 Days 2 Nights", href: "/3-days-2-nights" },
      { title: "4 Days 3 Nights", href: "/4-days-3-nights" },
      { title: "5 Days 4 Nights", href: "/5-days-4-nights" },
      { title: "6 Days 5 Nights", href: "/6-days-5-nights" },
      { title: "7 Days 6 Nights", href: "/7-days-6-nights" },
      { title: "8 Days 7 Nights", href: "/8-days-7-nights" },
      { title: "10 Days 9 Nights", href: "/10-days-9-nights" },
      { title: "12 Days 11 Nights", href: "/12-days-11-nights" },
    ]
  },
  {
    id: 4,
    title: "Airport Transfers",
    href: "/airport-transfers",
    expandable: true,
    desc: [
      { title: "Cairo Airport Transfers", href: "/cairo-airport-transfers" },
      { title: "Luxor Airport Transfers", href: "/luxor-airport-transfers" },
    ]
  },

  { id: 8, title: "Nile Cruise Trips", href: "/nile-cruises", expandable: false },
  { id: 9, title: "Shore Excursions", href: "/shore-excursions", expandable: false },
  { id: 11, title: "Payment Policy", href: "/payment-policy", expandable: false },
  { id: 11, title: "Privacy Policy", href: "/privacy", expandable: false },
  { id: 1, title: "About Us", href: "/about", expandable: false },
  { id: 2, title: "Contact Us", href: "/contact", expandable: false },
];


export default function Index() {


  return (
    <>
      <Body Data={Data} />
      <Footer />
    </ >
  )
}