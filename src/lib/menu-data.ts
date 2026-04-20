import dosaImg from "@/assets/dosa.jpg";
import idliImg from "@/assets/idli.jpg";
import parottaImg from "@/assets/parotta.jpg";
import pongalImg from "@/assets/pongal.jpg";
import heroImg from "@/assets/hero-meal.jpg";

export type MenuItem = {
  id: string;
  name: string;
  tamil?: string;
  price: number;
  desc: string;
  img?: string;
  veg: boolean;
  category: "breakfast" | "lunch" | "dinner";
};

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  { id: "idli", name: "Idli (3 pcs)", tamil: "இட்லி", price: 40, desc: "Soft, steam-fluffy rice cakes with chutney & sambar", img: idliImg, veg: true, category: "breakfast" },
  { id: "masala-dosa", name: "Masala Dosa", tamil: "மசாலா தோசை", price: 70, desc: "Crispy golden crepe stuffed with potato masala", img: dosaImg, veg: true, category: "breakfast" },
  { id: "pongal", name: "Ven Pongal", tamil: "வெண் பொங்கல்", price: 60, desc: "Creamy rice & moong dal tempered with ghee, pepper, cashew", img: pongalImg, veg: true, category: "breakfast" },
  { id: "vada", name: "Medu Vada (2 pcs)", tamil: "வடை", price: 35, desc: "Crispy lentil donuts with coconut chutney", veg: true, category: "breakfast" },
  { id: "pesarattu", name: "Pesarattu", tamil: "பெசரட்டு", price: 65, desc: "Green gram dosa with ginger chutney", veg: true, category: "breakfast" },
  { id: "filter-coffee", name: "Filter Coffee", tamil: "டிகிரி காபி", price: 25, desc: "Decoction brewed strong, served in tumbler-davara", veg: true, category: "breakfast" },
  // Lunch
  { id: "full-meals", name: "Full Meals (Unlimited)", tamil: "சாப்பாடு", price: 120, desc: "Rice, sambar, rasam, 2 poriyal, kootu, appalam, curd, payasam — on banana leaf", img: heroImg, veg: true, category: "lunch" },
  { id: "mini-meals", name: "Mini Meals", tamil: "மினி மீல்ஸ்", price: 80, desc: "Limited portion thali with all the essentials", veg: true, category: "lunch" },
  { id: "curd-rice", name: "Curd Rice", tamil: "தயிர் சாதம்", price: 50, desc: "Tempered curd rice with pomegranate & curry leaves", veg: true, category: "lunch" },
  { id: "lemon-rice", name: "Lemon Rice", tamil: "எலுமிச்சை சாதம்", price: 55, desc: "Tangy turmeric rice with peanuts", veg: true, category: "lunch" },
  { id: "sambar-rice", name: "Sambar Rice", tamil: "சாம்பார் சாதம்", price: 60, desc: "Comforting bowl with ghee and appalam", veg: true, category: "lunch" },
  // Dinner
  { id: "parotta", name: "Parotta + Salna", tamil: "பரோட்டா", price: 90, desc: "Flaky layered parotta with spicy Chettinad gravy", img: parottaImg, veg: false, category: "dinner" },
  { id: "biryani", name: "Chicken Biryani", tamil: "பிரியாணி", price: 180, desc: "Seeraga samba rice biryani, slow-cooked dum style", veg: false, category: "dinner" },
  { id: "kothu", name: "Kothu Parotta", tamil: "கொத்து பரோட்டா", price: 130, desc: "Shredded parotta tossed with egg, onion & masala", veg: false, category: "dinner" },
  { id: "idiyappam", name: "Idiyappam (4 pcs)", tamil: "இடியாப்பம்", price: 70, desc: "Steamed string hoppers with coconut milk or kurma", veg: true, category: "dinner" },
  { id: "chapathi", name: "Chapathi + Kurma (2 pcs)", price: 70, desc: "Soft chapathis with vegetable kurma", veg: true, category: "dinner" },
];

export const CATEGORIES = [
  { id: "breakfast" as const, title: "Breakfast", time: "6:30 AM – 11:00 AM" },
  { id: "lunch" as const, title: "Lunch", time: "12:00 PM – 3:30 PM" },
  { id: "dinner" as const, title: "Dinner", time: "6:30 PM – 10:30 PM" },
];

export const findItem = (id: string) => MENU_ITEMS.find((m) => m.id === id);
