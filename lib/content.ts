export type Lang = "pl" | "en";

type Bi<T = string> = { pl: T; en: T };
const t = <T,>(pl: T, en: T): Bi<T> => ({ pl, en });

export const HERO_SLIDES = [
  {
    eyebrow: t("Sprzątamy z troską", "We clean with care"),
    title: t(
      "Twój dom czystszy. Bez stresu. Bez zbędnych słów.",
      "Spotless results. Reliable service. Every time.",
    ),
    body: t(
      "Profesjonalna ekipa cleaningowa z Poznania. Własny sprzęt, faktury, gwarancja poprawki — zawsze minimum 2 osoby na zleceniu.",
      "Professional cleaning crew from Poznań. Own equipment, invoices, re-do guarantee — always a minimum 2-person team.",
    ),
  },
  {
    eyebrow: t("Tam, gdzie czystość spotyka zaufanie", "Where clean meets trust"),
    title: t(
      "Doświadczona ekipa, której naprawdę zależy.",
      "Experienced, background-checked cleaners who care.",
    ),
    body: t(
      "Sprzątamy mieszkania, domy, biura i salony. Pierzemy tapicerkę, dywany i materace. Przeprowadzamy. Wszystko z jedną odpowiedzialną ekipą.",
      "We clean apartments, houses, offices and salons. Wash upholstery, rugs and mattresses. Move you. All with one responsible crew.",
    ),
  },
  {
    eyebrow: t("Bezpieczna chemia", "Safe cleaning, naturally"),
    title: t(
      "Środki bezpieczne dla domowników i zwierząt.",
      "Eco-friendly products that protect your family.",
    ),
    body: t(
      "Profesjonalna, ale bezpieczna chemia. Suszenie tapicerki w cenie — bez ryzyka wilgoci, grzybów i pleśni.",
      "Professional yet safe chemistry. Upholstery drying included — no risk of moisture, fungi or mould.",
    ),
  },
];

export const HERO = {
  eyebrow: t("Cleaning · Tapicerka · Przeprowadzki", "Cleaning · Upholstery · Moving"),
  title: t(
    "Twój dom czystszy. Przeprowadzka łatwiejsza. Meble jak nowe.",
    "Your home cleaner. Your move easier. Your furniture like new.",
  ),
  subtitle: t(
    "Profesjonalny cleaning, pranie tapicerki oraz transport przeprowadzkowy w Poznaniu.",
    "Professional cleaning, upholstery washing and moving transport in Poznań.",
  ),
  ctaPrimary: t("Zamów wycenę przez WhatsApp", "Get a quote via WhatsApp"),
  ctaSecondary: t("Sprawdź usługi", "Explore services"),
  trustLine: t(
    "Szybka wycena · Własny sprzęt · Faktury · Gwarancja satysfakcji",
    "Fast quote · Own equipment · Invoices · Satisfaction guarantee",
  ),
  badges: [
    t("Minimum 2 osoby", "Minimum 2 people"),
    t("Własny sprzęt", "Own equipment"),
    t("Faktura VAT", "VAT invoice"),
    t("Gwarancja poprawki", "Re-do guarantee"),
  ],
  ribbon: t("Sprzątanie · Poznań", "Cleaning · Poznań"),
  ribbonAlt: t("Pranie tapicerki", "Upholstery cleaning"),
  ribbonThird: t("Po remoncie", "Post-renovation"),
};

export const CATEGORIES = [
  t("Sprzątanie", "Cleaning"),
  t("Polerowanie", "Polishing"),
  t("Odkurzanie", "Dusting"),
  t("Mycie okien", "Window care"),
  t("Pranie tapicerki", "Upholstery"),
  t("Dezynfekcja", "Disinfecting"),
  t("Transport", "Moving"),
];

export const TRUST = [
  { value: "5 lat", label: t("doświadczenia na rynku Poznania", "of experience in Poznań") },
  { value: "1200+", label: t("zrealizowanych zleceń", "completed jobs") },
  { value: "24h", label: t("średni czas odpowiedzi", "average response time") },
  { value: "100%", label: t("gwarancja poprawki", "re-do guarantee") },
];

export const SERVICES = [
  {
    slug: "mieszkania",
    title: t("Sprzątanie mieszkań", "Apartment cleaning"),
    description: t(
      "Jednorazowe i cykliczne sprzątanie mieszkań w Poznaniu. Dopasowujemy zakres do Twojego dnia.",
      "One-off and recurring apartment cleaning in Poznań. Scope tailored to your day.",
    ),
    ribbon: t("Mieszkania", "Apartments"),
  },
  {
    slug: "domy",
    title: t("Sprzątanie domów", "House cleaning"),
    description: t(
      "Sprzątanie domów jednorodzinnych — parter, piętra, garaż i taras w jednym zleceniu.",
      "Full-house cleaning — ground floor, upstairs, garage, terrace in a single job.",
    ),
    ribbon: t("Domy", "Houses"),
  },
  {
    slug: "po-remoncie",
    title: t("Sprzątanie po remoncie", "Post-renovation cleaning"),
    description: t(
      "Usuwamy pył budowlany, resztki farby, klej, tynk i gruz. Mieszkanie gotowe do wprowadzki.",
      "We remove construction dust, paint, glue, plaster and debris. Move-in ready.",
    ),
    ribbon: t("Po remoncie", "Post-reno"),
  },
  {
    slug: "biura",
    title: t("Sprzątanie biur i lokali", "Offices & commercial spaces"),
    description: t(
      "Stała współpraca dla biur, salonów kosmetycznych, gabinetów i lokali komercyjnych.",
      "Ongoing contracts for offices, beauty salons, clinics and commercial spaces.",
    ),
    ribbon: t("Biura · Lokale", "Offices · Retail"),
  },
  {
    slug: "tapicerka",
    title: t("Pranie tapicerki meblowej", "Upholstery washing"),
    description: t(
      "Sofy, narożniki, materace, fotele, krzesła. Profesjonalna chemia i suszenie w cenie.",
      "Sofas, corner sofas, mattresses, armchairs, chairs. Pro chemistry and drying included.",
    ),
    ribbon: t("Tapicerka", "Upholstery"),
  },
  {
    slug: "dywany",
    title: t("Pranie dywanów i wykładzin", "Carpet & rug washing"),
    description: t(
      "Czyścimy dywany syntetyczne i z długim włosiem. Z odbiorem i dostawą w Poznaniu.",
      "We clean synthetic and high-pile rugs. With pickup and delivery in Poznań.",
    ),
    ribbon: t("Dywany", "Carpets"),
  },
  {
    slug: "okna",
    title: t("Mycie okien", "Window cleaning"),
    description: t(
      "Okna prywatne, komercyjne, fasady i praca na wysokości z podnośnikiem. Bez smug i bez kompromisów.",
      "Private and commercial windows, façades and high-altitude work with a boom lift. Streak-free, no compromises.",
    ),
    ribbon: t("Okna", "Windows"),
  },
  {
    slug: "transport",
    title: t("Transport przeprowadzkowy", "Moving transport"),
    description: t(
      "Przewóz mebli i towarów, montaż i demontaż, materiały zabezpieczające w komplecie.",
      "Furniture and goods transport, assembly, protective materials included.",
    ),
    ribbon: t("Przeprowadzki", "Moving"),
  },
  {
    slug: "magazyn",
    title: t("Magazynowanie", "Storage"),
    description: t(
      "Obiekt strzeżony i ogrzewany — przechowywanie mebli, towarów oraz materiałów budowlanych.",
      "Guarded, heated facility — storage for furniture, goods and construction materials.",
    ),
    ribbon: t("Magazyn", "Storage"),
  },
  {
    slug: "abonament",
    title: t("Abonament dla stałych klientów", "Recurring subscription"),
    description: t(
      "Stała ekipa, ten sam jakościowy standard, korzystne stawki i pierwszeństwo terminów.",
      "Same crew, same standard, preferred rates and priority booking.",
    ),
    ribbon: t("Stała współpraca", "Subscription"),
  },
];

export const PRICES = [
  {
    key: "apt",
    title: t("Sprzątanie mieszkań i domów", "Apartment & house cleaning"),
    price: t("wycena indywidualna", "individual quote"),
    note: t("dobierane do metrażu i zakresu", "tailored to area and scope"),
  },
  {
    key: "reno",
    title: t("Sprzątanie po remoncie", "Post-renovation cleaning"),
    price: t("od 7 zł/m²", "from 7 zł/m²"),
    note: t("12 zł/m² przy ciężkich zabrudzeniach", "12 zł/m² for heavy soiling"),
  },
  {
    key: "office",
    title: t("Sprzątanie biur i lokali", "Offices & commercial"),
    price: t("od 7 zł/m²", "from 7 zł/m²"),
    note: t("Premium 21–32 zł/m² (generalne + chemia)", "Premium 21–32 zł/m² (deep + chemistry)"),
  },
  {
    key: "uph",
    title: t("Pranie tapicerki", "Upholstery washing"),
    price: t("od 200 zł", "from 200 zł"),
    note: t("sofa 2-os. 200 zł · narożnik od 250 zł", "2-seat sofa 200 zł · corner from 250 zł"),
  },
  {
    key: "mattress",
    title: t("Pranie materacy", "Mattress washing"),
    price: t("od 150 zł", "from 150 zł"),
    note: t("jednoosobowy 150 zł · dwuosobowy od 250 zł", "single 150 zł · double from 250 zł"),
  },
  {
    key: "windows",
    title: t("Mycie okien", "Window cleaning"),
    price: t("od 30 zł / okno", "from 30 zł / window"),
    note: t("komercyjne od 6 zł/m²", "commercial from 6 zł/m²"),
  },
  {
    key: "transport",
    title: t("Transport przeprowadzkowy", "Moving transport"),
    price: t("wycena indywidualna", "individual quote"),
    note: t("Poznań i cała Polska", "Poznań and all of Poland"),
  },
  {
    key: "storage",
    title: t("Magazynowanie", "Storage"),
    price: t("wycena indywidualna", "individual quote"),
    note: t("obiekt strzeżony i ogrzewany", "guarded and heated facility"),
  },
  {
    key: "subscription",
    title: t("Abonament stały", "Recurring subscription"),
    price: t("oferta indywidualna", "individual offer"),
    note: t("korzystne stawki dla stałych klientów", "preferred rates for regulars"),
  },
];

export const PRICES_NOTE = t(
  "Dokładna cena zależy od zakresu, metrażu, stopnia zabrudzenia oraz terminu realizacji. Napisz do nas, a przygotujemy przejrzystą wycenę.",
  "Final price depends on scope, area, level of soiling and deadline. Message us — we'll prepare a clear quote.",
);

export const HOW_STEPS = [
  {
    title: t("Szybki kontakt i analiza potrzeb", "Quick contact and needs analysis"),
    body: t(
      "Odpowiadamy sprawnie, zbieramy szczegóły i dopasowujemy zakres usługi.",
      "We respond fast, gather details and tailor the scope of work.",
    ),
  },
  {
    title: t("Wycena i doradztwo", "Quote and consulting"),
    body: t(
      "Dobieramy najlepsze rozwiązanie i przedstawiamy przejrzystą ofertę. Dla lokali komercyjnych oraz sprzątania po remoncie oferujemy bezpłatny dojazd i wycenę na miejscu.",
      "We pick the best solution and present a clear offer. For commercial spaces and post-renovation cleaning we offer free on-site visit and quote.",
    ),
  },
  {
    title: t("Ustalenie terminu realizacji", "Scheduling"),
    body: t(
      "Rezerwujemy dogodny termin i przygotowujemy zespół oraz sprzęt.",
      "We book a convenient slot and prep the crew and equipment.",
    ),
  },
  {
    title: t("Profesjonalne wykonanie usługi", "Professional execution"),
    body: t(
      "Pracuje minimum 2-osobowa ekipa z pełnym sprzętem i chemią. Czyścimy każdy detal — od widocznych powierzchni po trudno dostępne miejsca i każdy kąt pomieszczenia.",
      "A minimum 2-person crew works with full equipment and chemistry. We clean every detail — from visible surfaces to hard-to-reach corners.",
    ),
  },
  {
    title: t("Kontrola jakości", "Quality control"),
    body: t(
      "Dokładnie sprawdzamy efekt pracy przed oddaniem obiektu.",
      "We thoroughly inspect the result before handover.",
    ),
  },
  {
    title: t("Gwarancja satysfakcji", "Satisfaction guarantee"),
    body: t(
      "W przypadku jakichkolwiek niedociągnięć wracamy bezpłatnie i poprawiamy usługę w dogodnym dla klienta terminie.",
      "If anything is off, we come back free of charge and fix it at your convenience.",
    ),
  },
  {
    title: t("Odbiór gotowej przestrzeni", "Handover of the ready space"),
    body: t(
      "Przekazujemy czyste, odświeżone i w pełni przygotowane do użytku miejsce.",
      "We hand over a clean, refreshed space, fully ready to use.",
    ),
  },
];

export const CASES_CATEGORIES = [
  { id: "mieszkanie", label: t("Mieszkanie", "Apartment") },
  { id: "po-remoncie", label: t("Po remoncie", "Post-reno") },
  { id: "tapicerka", label: t("Tapicerka", "Upholstery") },
  { id: "biuro", label: t("Biuro", "Office") },
  { id: "przeprowadzka", label: t("Przeprowadzka", "Moving") },
];

export const BENEFITS = [
  t("Szybki kontakt i dobra komunikacja", "Fast contact and clear communication"),
  t("Profesjonalne doradztwo przy każdym zleceniu", "Professional consulting on every job"),
  t("Własny sprzęt zawsze w naszym samochodzie", "Own equipment always in our van"),
  t("Chemia i sprzęt do każdego typu sprzątania", "Chemistry and tools for every cleaning type"),
  t("Minimum 2 osoby na każdym zleceniu", "Minimum 2 people on every job"),
  t("Firmowy uniform i profesjonalny wygląd", "Branded uniform and professional look"),
  t("Gwarancja satysfakcji", "Satisfaction guarantee"),
  t("Możliwość pilnych realizacji", "Urgent jobs available"),
  t("Pracujemy cały rok, również w weekendy", "Year-round, including weekends"),
  t("Wystawiamy faktury", "VAT invoices issued"),
  t("Możliwość stałej współpracy i abonamentu", "Ongoing partnership and subscription"),
];

export const QUIZ = {
  title: t(
    "Sprawdź, jakiej usługi potrzebujesz i otrzymaj szybką wycenę",
    "Find out which service you need and get a fast quote",
  ),
  subtitle: t(
    "5 prostych pytań · 60 sekund · odpowiedź na WhatsApp",
    "5 simple questions · 60 seconds · reply on WhatsApp",
  ),
  start: t("Rozpocznij quiz", "Start the quiz"),
  next: t("Dalej", "Next"),
  back: t("Wstecz", "Back"),
  submit: t("Wyślij na WhatsApp", "Send to WhatsApp"),
  emailFallback: t("Wyślij e-mailem", "Send by email"),
  step: t("Krok", "Step"),
  of: t("z", "of"),
  steps: [
    {
      q: t("Jakiej usługi potrzebujesz?", "Which service do you need?"),
      options: [
        t("Sprzątanie mieszkania", "Apartment cleaning"),
        t("Sprzątanie domu", "House cleaning"),
        t("Sprzątanie po remoncie", "Post-renovation cleaning"),
        t("Sprzątanie biura / lokalu", "Office / commercial cleaning"),
        t("Pranie tapicerki", "Upholstery washing"),
        t("Mycie okien", "Window cleaning"),
        t("Transport przeprowadzkowy", "Moving transport"),
        t("Magazynowanie", "Storage"),
        t("Inne", "Other"),
      ],
    },
    {
      q: t("Jaki to obiekt?", "What kind of property?"),
      options: [
        t("Kawalerka", "Studio"),
        t("Mieszkanie", "Apartment"),
        t("Dom", "House"),
        t("Biuro", "Office"),
        t("Lokal usługowy", "Commercial unit"),
        t("Mebel / tapicerka", "Furniture / upholstery"),
        t("Inne", "Other"),
      ],
    },
    {
      q: t("Jaka jest powierzchnia lub zakres?", "What's the area or scope?"),
      options: [
        t("do 40 m²", "up to 40 m²"),
        t("40–70 m²", "40–70 m²"),
        t("70–120 m²", "70–120 m²"),
        t("120+ m²", "120+ m²"),
        t("Nie wiem / potrzebuję doradztwa", "I don't know / need advice"),
      ],
    },
    {
      q: t("Kiedy potrzebujesz realizacji?", "When do you need it?"),
      options: [
        t("Jak najszybciej", "ASAP"),
        t("W tym tygodniu", "This week"),
        t("W wybranym terminie", "On a chosen date"),
        t("Regularnie", "Regularly"),
      ],
    },
    {
      q: t("Czy potrzebujesz dodatkowych usług?", "Any additional services?"),
      multi: true,
      options: [
        t("Mycie okien", "Window cleaning"),
        t("Pranie tapicerki", "Upholstery washing"),
        t("Transport", "Transport"),
        t("Sprzątanie po remoncie", "Post-renovation cleaning"),
        t("Nie", "No"),
      ],
    },
  ],
  contact: {
    title: t("Dane kontaktowe", "Contact details"),
    name: t("Imię", "Name"),
    phone: t("Telefon / WhatsApp", "Phone / WhatsApp"),
    email: t("Email (opcjonalnie)", "Email (optional)"),
    message: t("Wiadomość (opcjonalnie)", "Message (optional)"),
    rodo: t(
      "Akceptuję politykę prywatności i wyrażam zgodę na kontakt w celu obsługi zapytania.",
      "I accept the privacy policy and consent to contact regarding this enquiry.",
    ),
  },
};

export const FAQ = [
  {
    q: t("Czy wystawiacie faktury?", "Do you issue VAT invoices?"),
    a: t("Tak, wystawiamy faktury.", "Yes, we issue invoices."),
  },
  {
    q: t("Na kiedy można umówić termin?", "When can we book a date?"),
    a: t(
      "Dobieramy możliwie najwygodniejszy termin dla klienta. Mamy większy zespół, dlatego możemy obsługiwać wiele zleceń.",
      "We pick the most convenient date for the client. We have a larger team and can handle multiple jobs.",
    ),
  },
  {
    q: t("Czy można zamówić usługę pilnie?", "Can the service be ordered urgently?"),
    a: t(
      "Tak, oczywiście. Przy pilnych realizacjach prosimy o szybki kontakt przez WhatsApp.",
      "Yes, of course. For urgent jobs please contact us via WhatsApp.",
    ),
  },
  {
    q: t(
      "Czy muszę przygotować własny sprzęt albo chemię?",
      "Do I need to provide equipment or chemistry?",
    ),
    a: t(
      "Nie. Przyjeżdżamy z własnym sprzętem, chemią, ścierkami, parownicą i wszystkim, co potrzebne do wykonania usługi.",
      "No. We bring our own equipment, chemistry, cloths, steam cleaner and everything needed.",
    ),
  },
  {
    q: t(
      "Czy można podpisać umowę o stałej współpracy?",
      "Can we sign an ongoing cooperation contract?",
    ),
    a: t(
      "Tak, przygotowujemy korzystną umowę dla obu stron.",
      "Yes, we prepare a contract that's beneficial for both sides.",
    ),
  },
  {
    q: t("Jak długo trwa sprzątanie?", "How long does cleaning take?"),
    a: t(
      "Czas zależy od rodzaju usługi, powierzchni i stopnia zabrudzenia. Każde zlecenie oceniamy indywidualnie.",
      "Time depends on service type, area and level of soiling. We evaluate each job individually.",
    ),
  },
  {
    q: t(
      "Czy suszycie meble po praniu tapicerki?",
      "Do you dry furniture after upholstery washing?",
    ),
    a: t(
      "Tak. Suszenie jest w cenie usługi, aby ograniczyć ryzyko powstawania wilgoci, grzybów i pleśni.",
      "Yes. Drying is included to reduce risk of moisture, fungi and mould.",
    ),
  },
  {
    q: t(
      "Czy przy przeprowadzkach zapewniacie folię, kartony i zabezpieczenia?",
      "Do you provide film, boxes and protections for moves?",
    ),
    a: t(
      "Tak, zapewniamy odpowiednie materiały, aby transport był bezpieczny i uporządkowany.",
      "Yes, we provide proper materials to make transport safe and orderly.",
    ),
  },
  {
    q: t("Czy pracujecie rano i w weekendy?", "Do you work early mornings and weekends?"),
    a: t(
      "Tak, pracujemy przez cały rok, również w weekendy.",
      "Yes, we work year-round, including weekends.",
    ),
  },
  {
    q: t("Czy można kupić abonament?", "Can I purchase a subscription?"),
    a: t(
      "Tak, mamy korzystne abonamenty dla stałych klientów.",
      "Yes, we have favourable subscriptions for regular clients.",
    ),
  },
];

export const HEADINGS = {
  about: t("O nas", "About"),
  aboutSub: t("Lokalna firma cleaningowa z Poznania", "Local cleaning company from Poznań"),
  reviews: t("Opinie", "Reviews"),
  reviewsSub: t("Realne efekty z Instagrama i opinie klientów", "Real results from Instagram and client opinions"),
  services: t("Usługi", "Services"),
  servicesSub: t("Od podłóg po sufity — czyścimy wszystko", "From floors to ceilings — we clean it all"),
  prices: t("Cennik", "Pricing"),
  pricesSub: t("Stawki orientacyjne — finalna wycena jest indywidualna", "Indicative rates — final quote is individual"),
  how: t("Jak pracujemy", "How we work"),
  howSub: t("7 prostych kroków od kontaktu do oddania czystej przestrzeni", "7 simple steps from contact to handover"),
  cases: t("Efekty", "Cases"),
  casesSub: t("Zobacz prawdziwe efekty naszych usług", "See real outcomes of our work"),
  benefits: t("Dlaczego my", "Why us"),
  benefitsSub: t("4 powody, dla których wybierają nas klienci w Poznaniu", "4 reasons clients in Poznań pick us"),
  plans: t("Wybierz pakiet", "Find the perfect plan"),
  plansSub: t("Trzy gotowe pakiety + zawsze indywidualna wycena", "Three ready packages — always an individual quote"),
  quiz: t("Quiz wyceny", "Quote quiz"),
  faq: t("FAQ", "FAQ"),
  faqSub: t("Najczęstsze pytania i odpowiedzi", "Most common questions and answers"),
  contact: t("Kontakt", "Contact"),
  contactSub: t("Napisz lub zadzwoń — odpowiadamy w ten sam dzień", "Write or call — we reply the same day"),
};

export const REVIEWS_TABS = {
  photos: t("Opinie zdjęciowe", "Photo reviews"),
  videos: t("Video opinie", "Video reviews"),
};

export const CTA_BANNERS = {
  weekend: {
    title: t("Nie trać weekendu na sprzątanie", "Don't waste your weekend cleaning"),
    sub: t(
      "Zostaw brud nam — odbierz czystą przestrzeń bez stresu.",
      "Leave the dirt to us — pick up a clean space, stress-free.",
    ),
    cta: t("Szybka wycena przez WhatsApp", "Fast quote via WhatsApp"),
  },
  yearRound: {
    title: t("Pracujemy cały rok, również w weekendy", "Year-round, weekends included"),
    sub: t(
      "Wolny termin w tym tygodniu — napisz teraz.",
      "Free slots this week — message now.",
    ),
    cta: t("Sprawdź wolny termin", "Check availability"),
  },
};

export const ABOUT = {
  yearsValue: "5+",
  yearsLabel: t("Lat doświadczenia", "Years of experience"),
  title: t(
    "Sprzątamy z troską. Działamy na zaufaniu.",
    "Cleaning with care. Built on trust.",
  ),
  body: t(
    "Lokalna ekipa Elart Cleaning od kilku lat dba o mieszkania, biura i salony w Poznaniu. Zawsze minimum dwie osoby, własna chemia i sprzęt, faktury, gwarancja poprawki. Pracujemy spokojnie i dokładnie — tak, by oddany obiekt po prostu zachwycał.",
    "The local Elart Cleaning crew has been caring for apartments, offices and salons in Poznań for several years. Always two-person teams, own chemistry and tools, invoices, re-do guarantee. We work calmly and meticulously — so the handed-over space simply delights.",
  ),
  mission: {
    title: t("Nasza misja", "Our mission"),
    body: t(
      "Dostarczać premium standard sprzątania w przystępnej cenie — tak, by każdy klient odbierał obiekt gotowy do natychmiastowego użytku.",
      "Deliver a premium cleaning standard at an accessible price — so every client receives a space ready for immediate use.",
    ),
  },
  vision: {
    title: t("Nasza wizja", "Our vision"),
    body: t(
      "Być najbardziej polecaną firmą cleaningową w Poznaniu — dzięki zaufaniu, powtarzalnej jakości i opiece nad każdym detalem.",
      "Become Poznań's most recommended cleaning company — through trust, repeatable quality and care for every detail.",
    ),
  },
};

export const WHY_US = [
  {
    no: "01",
    title: t("Zaufani specjaliści", "Trusted experts"),
    body: t(
      "Stała ekipa z własnym sprzętem i pełną chemią. Minimum 2 osoby na każdym zleceniu — szybko, dokładnie, dyskretnie.",
      "A regular crew with own equipment and full chemistry. Minimum 2 people per job — fast, thorough, discreet.",
    ),
  },
  {
    no: "02",
    title: t("Bezpieczna chemia", "Safe chemistry"),
    body: t(
      "Profesjonalne, ale bezpieczne dla domowników i zwierząt środki. Suszenie tapicerki w cenie — bez ryzyka wilgoci.",
      "Professional yet safe products for household and pets. Upholstery drying included — no moisture risk.",
    ),
  },
  {
    no: "03",
    title: t("Elastyczny grafik", "Flexible schedule"),
    body: t(
      "Pracujemy cały rok, również w weekendy. Pilne realizacje, stała współpraca i wygodne terminy poranne czy wieczorne.",
      "We work year-round, weekends included. Urgent jobs, recurring partnership and convenient early/late slots.",
    ),
  },
  {
    no: "04",
    title: t("Gwarancja satysfakcji", "Satisfaction guarantee"),
    body: t(
      "W przypadku jakichkolwiek niedociągnięć wracamy bezpłatnie i poprawiamy — w terminie wygodnym dla Ciebie.",
      "If anything is off, we come back free of charge and fix it — at a time convenient for you.",
    ),
  },
];

export const PLAN_TIERS = [
  {
    key: "ekspres",
    title: t("Ekspres", "Express"),
    price: t("od 7 zł/m²", "from 7 zł/m²"),
    summary: t("Szybkie odświeżenie obiektu", "Quick refresh of the space"),
    features: [
      t("Strefy robocze i podłogi", "Work zones and floors"),
      t("Odkurzanie i mycie podłóg", "Vacuuming and floor mopping"),
      t("Wywóz śmieci, dezynfekcja klamek", "Trash, doorknob disinfection"),
      t("Toaleta — szybki standard", "Toilet — quick standard"),
    ],
  },
  {
    key: "standard",
    title: t("Standard", "Standard"),
    price: t("13,50–20 zł/m²", "13,50–20 zł/m²"),
    summary: t("Najczęściej wybierany pakiet", "Most popular package"),
    features: [
      t("Generalne sprzątanie obiektu", "Deep cleaning of the space"),
      t("Mycie okien i cokołów", "Window and baseboard cleaning"),
      t("Dezynfekcja strefy kuchennej", "Kitchen zone disinfection"),
      t("Sanitariaty — pełen standard", "Sanitary — full standard"),
      t("Suszenie i kontrola jakości", "Drying and QC"),
    ],
    highlight: true,
  },
  {
    key: "premium",
    title: t("Premium", "Premium"),
    price: t("21–32 zł/m²", "21–32 zł/m²"),
    summary: t("Generalne + chemia tapicerki", "Deep + upholstery chemistry"),
    features: [
      t("Wszystko z pakietu Standard", "Everything in Standard"),
      t("Pranie tapicerki i wykładzin", "Upholstery & carpet washing"),
      t("Mycie ścian i fug", "Wall and grout cleaning"),
      t("Mycie szafek i sprzętów AGD", "Cabinets and appliances"),
      t("Priorytet w grafiku terminów", "Priority booking"),
    ],
  },
];

export const FOOTER = {
  description: t(
    "Lokalna firma cleaningowa z Poznania. Sprzątamy, pierzemy tapicerkę i przeprowadzamy — z gwarancją satysfakcji.",
    "Local cleaning company from Poznań. We clean, wash upholstery and move — with a satisfaction guarantee.",
  ),
  cta: t(
    "Napisz do nas i odbierz czystą przestrzeń bez stresu.",
    "Write to us and get a clean space, stress-free.",
  ),
  rights: t("Wszelkie prawa zastrzeżone", "All rights reserved"),
  docs: [
    t("Polityka prywatności", "Privacy policy"),
    t("Regulamin", "Terms"),
    t("RODO", "GDPR"),
  ],
  contactHead: t("Kontakt", "Contact"),
  navHead: t("Nawigacja", "Navigation"),
  legalHead: t("Dokumenty", "Documents"),
};

export const FORM = {
  name: t("Imię", "Name"),
  phone: t("Telefon / WhatsApp", "Phone / WhatsApp"),
  email: t("Email", "Email"),
  service: t("Rodzaj usługi", "Service type"),
  message: t("Wiadomość", "Message"),
  rodo: t(
    "Akceptuję politykę prywatności i wyrażam zgodę na kontakt w celu obsługi zapytania.",
    "I accept the privacy policy and consent to contact regarding this enquiry.",
  ),
  submit: t("Wyślij zapytanie", "Send enquiry"),
  success: t(
    "Dziękujemy! Skontaktujemy się z Tobą tak szybko, jak to możliwe.",
    "Thank you! We'll get back to you as soon as possible.",
  ),
  error: t(
    "Sprawdź poprawność danych i spróbuj ponownie.",
    "Please check the data and try again.",
  ),
  required: t("Pole wymagane", "Required field"),
  invalidEmail: t("Niepoprawny adres e-mail", "Invalid email"),
  invalidPhone: t("Niepoprawny numer telefonu", "Invalid phone number"),
};

export const POPUP = {
  title: t("Szybka wycena", "Fast quote"),
  subtitle: t(
    "Zostaw kontakt — oddzwonimy w ciągu kilkunastu minut.",
    "Leave your contact — we'll call back within minutes.",
  ),
  whatsappAlt: t("Lub napisz teraz na WhatsApp", "Or message us on WhatsApp now"),
};

export const UI = {
  whatsapp: t("WhatsApp", "WhatsApp"),
  call: t("Zadzwoń", "Call"),
  email: t("E-mail", "Email"),
  instagram: "Instagram",
  menu: t("Menu", "Menu"),
  close: t("Zamknij", "Close"),
  orderQuote: t("Zamów wycenę", "Order a quote"),
  fastQuote: t("Szybka wycena", "Fast quote"),
  langSwitch: t("Język", "Language"),
  before: t("PRZED", "BEFORE"),
  after: t("PO", "AFTER"),
  playVideo: t("Odtwórz video", "Play video"),
  watchOnYt: t("Otwórz na YouTube", "Open on YouTube"),
  allCases: t("Wszystkie efekty", "All cases"),
  iWantThis: t("Chcę taki efekt", "I want this result"),
};
