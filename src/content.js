/* =====================================================================
   MATEO VEGA — CONTENT
   ---------------------------------------------------------------------
   Единственный файл, который нужно менять для нового клиента:
   имя, тексты, шоу, даты, расписание, кэмп, контакты, фото и видео.
   Цвета и шрифты — в начале src/styles/global.css.

   ФОТО: положите файл в src/assets/ и впишите его имя ниже.
   pic("имя.webp", "запасное.webp") — если первого файла ещё нет,
   сайт покажет запасной.
   ВИДЕО: лежат в public/videos/ (mp4).
   ===================================================================== */

const files = import.meta.glob("./assets/*.{webp,jpg,jpeg,png,avif}", {
  eager: true,
  import: "default",
});

function pic(name, fallback) {
  return files[`./assets/${name}`] ?? files[`./assets/${fallback}`];
}

/* ---------- Артист и контакты ---------- */

export const artist = {
  first: "Mateo",
  last: "Vega",
  logo: "VEGA",
  role: "Salsa / Mambo dancer & choreographer",
  base: "Madrid",
  reach: "Worldwide",
  email: "booking@mateovega.com",
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "YouTube", url: "https://youtube.com/" },
    { label: "TikTok", url: "https://tiktok.com/" },
  ],
  year: new Date().getFullYear(),
};

export const nav = [
  { label: "Shows", href: "#shows" },
  { label: "Dates", href: "#dates" },
  { label: "Classes", href: "#classes" },
  { label: "Camp", href: "#camp" },
];

/* Заставка: счёт, как в сальсе перед началом танца */
export const preloader = { count: ["5", "6", "7", "8"] };

/* ---------- 1. Первый экран ---------- */

export const hero = {
  video: "/videos/showreel.mp4",
  poster: pic("showreel-poster.jpg"),
  meta: ["Salsa / Mambo dancer & choreographer", "Madrid — Worldwide"],
  buttons: [
    { label: "Watch showreel", href: "#showreel" },
    { label: "Book Mateo", href: "#booking" },
  ],
};

/* Бегущая строка — едет быстрее, когда листаешь */
export const marquee = ["Salsa", "Mambo", "On2", "Shines", "Partnerwork", "Musicality", "Stage", "Social"];

/* ---------- 2. Артист ---------- */

export const intro = {
  label: "The Artist",
  title: ["Rhythm is where", "it all starts"],
  image: pic("artist-stage.webp"),
  text: [
    "Mateo Vega is a Latin dancer, choreographer and teacher rooted in Salsa and Mambo.",
    "From international stages and festivals to regular classes and movement camps, his work connects performance, musicality and social dance.",
  ],
  stats: [
    { value: 20, suffix: "+", label: "Years in movement" },
    { value: 15, suffix: "+", label: "Years on stage" },
    { value: 10, suffix: "+", label: "Years teaching" },
  ],
};

/* ---------- 3. Шоу (горизонтальная галерея) ---------- */

export const shows = {
  label: "Performances",
  title: ["Made for", "the stage"],
  text: "Dynamic Latin performances for festivals, events, theatres and special productions — from intimate solo pieces to full group shows.",
  items: [
    { title: "Solo Shows", text: "High-energy solo performances built around musicality, precision and stage presence.", image: pic("performance-solo.webp") },
    { title: "Couple Shows", text: "Partner performances combining connection, rhythm and expressive choreography.", image: pic("performance-couple.webp") },
    { title: "Group Shows", text: "Larger productions designed for festivals, stages and special events.", image: pic("performance-group.webp") },
    { title: "Choreography", text: "Original choreography for dancers, teams and productions — from first count to final bow.", image: pic("performance-choreography.webp") },
  ],
};

/* ---------- 4. Шоурил ---------- */

export const showreel = {
  label: "Showreel",
  title: "In motion",
  text: "Selected moments from live performances, solo work and partner choreography.",
  video: "/videos/showreel.mp4",
  poster: pic("showreel-poster.jpg"),
};

/* ---------- 5. Даты фестивалей ---------- */

export const dates = {
  label: "On the road",
  title: ["Upcoming", "dates"],
  text: "Meet Mateo at festivals, congresses and dance events around the world.",
  image: pic("dates-teaching.webp"),
  items: [
    { date: "18–20 Oct", city: "Paris", country: "France", event: "Paris Mambo Weekend", type: "Shows / Workshops" },
    { date: "08–10 Nov", city: "Berlin", country: "Germany", event: "Berlin Salsa Congress", type: "Shows / Workshops" },
    { date: "29 Nov–01 Dec", city: "Milan", country: "Italy", event: "Mambo City Festival", type: "Workshops / Social" },
    { date: "17–19 Jan", city: "London", country: "United Kingdom", event: "London Latin Weekender", type: "Shows / Workshops" },
    { date: "13–15 Feb", city: "Lisbon", country: "Portugal", event: "Lisbon Salsa Festival", type: "Shows / Workshops" },
  ],
};

/* ---------- 6. Студия ---------- */

export const studio = {
  label: "The Studio",
  title: ["Move.", "Learn.", "Connect."],
  text: "Regular Salsa and Mambo classes focused on musicality, technique, movement and connection.",
  video: "/videos/studio-class.mp4",
  poster: pic("studio-class-poster.jpg"),
  photos: [
    { image: pic("class-01.webp"), caption: "Partnerwork" },
    { image: pic("class-02.webp"), caption: "Technique & musicality" },
    { image: pic("class-03.webp"), caption: "Community" },
  ],
};

/* ---------- 7. Расписание ---------- */

export const schedule = {
  label: "Weekly classes",
  title: ["This week", "in the studio"],
  text: "Weekly Salsa and Mambo training in Madrid. Drop in for a class or train regularly with the studio.",
  note: "Small groups with focus on technique, musicality and individual development.",
  button: "Book a class",
  items: [
    { day: "Mon", time: "19:00", title: "Mambo Fundamentals", level: "Open Level" },
    { day: "Tue", time: "20:30", title: "Salsa Partnerwork", level: "Intermediate" },
    { day: "Wed", time: "19:00", title: "Mambo Shines", level: "Open Level" },
    { day: "Thu", time: "20:30", title: "Salsa Technique", level: "Intermediate" },
    { day: "Sat", time: "12:00", title: "Weekend Training", level: "All Levels" },
  ],
};

/* ---------- 8. Кэмп (светлая часть сайта, цвет яичной скорлупы) ----------
   day — «день на кэмпе»: видео сменяют друг друга при прокрутке.
   Видео лежат в public/videos/, фото — в src/assets/. */

export const camp = {
  label: "Vega Movement Camp",
  title: ["Move", "beyond", "the studio."],
  hero: pic("camp-hero.webp"),
  intro: "A few days of movement, music, nature, food, conversation — and dancing together until the stars come out.",
  dayLabel: "A day at camp",
  day: [
    { time: "08:00", title: "Morning movement", text: "Barefoot on the grass under the olive trees: mobility, body rhythm and the first shines of the day.", video: "/videos/camp-morning.mp4", poster: pic("camp-morning.webp") },
    { time: "11:30", title: "Circle & conversation", text: "We sit together and talk about music, connection and what it means to really listen to a partner.", video: "/videos/camp-circle.mp4", poster: pic("camp-circle.webp") },
    { time: "14:00", title: "The long table", text: "Slow lunches in the shade with local food, long conversations and plenty of laughter.", video: "/videos/camp-dinner.mp4", poster: pic("camp-dinner.webp") },
    { time: "20:00", title: "Sunset social", text: "Lights in the trees, the hills turning pink — and everyone dancing what they learned that day.", video: "/videos/camp-evening.mp4", poster: pic("camp-evening.webp") },
  ],
  quote: "Dance is how we listen to each other.",
  people: [
    { image: pic("camp-teaching.webp"), caption: "Partnerwork in the park" },
    { image: pic("camp-portrait-2.webp"), caption: "Golden hour" },
  ],
  next: {
    label: "Next camp",
    date: "2027-06-18", // дата начала — по ней идёт обратный отсчёт
    title: ["June", "18—22"],
    place: "Spain · Summer 2027",
    facts: ["5 days", "20 dancers", "All levels"],
    button: "Discover the camp",
    image: pic("camp-portrait.webp"),
  },
};

/* ---------- 9. Бронирование ---------- */

export const booking = {
  label: "Booking",
  title: ["Let's", "make", "something", "move."], // последняя строка — красным
  options: ["Book a show", "Invite to teach", "Collaborate", "Private lesson"],
  fields: { name: "Name", email: "Email", message: "Message" },
  button: "Send inquiry",
  sent: "Thank you — Mateo will get back to you soon.",
};
