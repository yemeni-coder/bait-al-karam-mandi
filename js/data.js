// ============================================================
// Bait Al Karam Mandi Rest. — Menu Data
// Transcribed from the restaurant's real printed menu.
// Prices are in AED (DHS) and include VAT.
//
// Images: each dish has a `key` (its meal name, e.g. "meat-mandi") and
// an `img` URL. Right now `img` uses a temporary internet placeholder
// seeded by that key. To use a real photo later, either:
//   (a) drop a file named <key>.jpg into assets/menu/ and we'll point
//       img to "assets/menu/<key>.jpg", or
//   (b) just give me the photo and say "this is <key>" and I'll swap it.
// The key never changes, so swaps are one-to-one and safe.
// ============================================================

const CATEGORIES = [
  { id: "meat",    ar: "الحم",      en: "Meat" },
  { id: "chicken", ar: "الدجاج",    en: "Chicken" },
  { id: "fish",    ar: "الأسماك",   en: "Fish" },
  { id: "salads",  ar: "السلطات",   en: "Salads" },
  { id: "sweets",  ar: "الحلويات",  en: "Sweets" },
  { id: "juices",  ar: "العصائر",   en: "Juices" },
];

// Temporary placeholder image for a given meal key. Replace the return
// value with `assets/menu/${key}.jpg` once real photos are in place.
function img(key) {
  return `https://picsum.photos/seed/bak-${key}/700/900`;
}

const MENU = [
  // ---------------- MEAT ----------------
  { id: "m1",  cat: "meat", ar: "لحم كتف حنيذ", en: "Haneeth Shoulder", price: "AED 90", key: "haneeth-shoulder", img: img("haneeth-shoulder"),
    descAr: "كتف لحم غنم يُطهى ببطء على طريقة الحنيذ حتى يصبح طريًا للغاية.",
    descEn: "Lamb shoulder slow-cooked haneeth-style until exceptionally tender." },
  { id: "m2",  cat: "meat", ar: "لحم جنب حنيذ", en: "Haneeth Janb", price: "AED 90", key: "haneeth-janb", img: img("haneeth-janb"),
    descAr: "جنب لحم غنم حنيذ، متبّل ومطهو ببطء حتى النضج الكامل.",
    descEn: "Haneeth lamb side (janb), spiced and slow-cooked to full tenderness." },
  { id: "m3",  cat: "meat", ar: "جنب مندي", en: "Janb Mandi", price: "AED 90", key: "janb-mandi", img: img("janb-mandi"),
    descAr: "جنب لحم غنم يُقدَّم فوق أرز المندي العطري.",
    descEn: "Lamb side served over fragrant mandi rice." },
  { id: "m4",  cat: "meat", ar: "كتف مندي", en: "Shoulder Mandi", price: "AED 90", key: "shoulder-mandi", img: img("shoulder-mandi"),
    descAr: "كتف لحم غنم فوق أرز المندي على الطريقة التقليدية.",
    descEn: "Lamb shoulder over traditional mandi rice." },
  { id: "m5",  cat: "meat", ar: "لحم مندي", en: "Meat Mandi", price: "AED 60", key: "meat-mandi", img: img("meat-mandi"),
    descAr: "لحم غنم يُطهى في التنور ويُقدَّم فوق أرز المندي العطري.",
    descEn: "Lamb cooked in the tandoor, served over fragrant mandi rice." },
  { id: "m6",  cat: "meat", ar: "لحم مدفون", en: "Meat Madfoon", price: "AED 60", key: "meat-madfoon", img: img("meat-madfoon"),
    descAr: "لحم غنم مغلّف يُطهى تحت الجمر حتى يتشرّب النكهات.",
    descEn: "Wrapped lamb cooked under embers until it soaks in the flavor." },
  { id: "m7",  cat: "meat", ar: "لحم مظبي", en: "Meat Madbi", price: "AED 65", key: "meat-madbi", img: img("meat-madbi"),
    descAr: "لحم غنم مشوي على الحجر الساخن بطريقة المظبي.",
    descEn: "Lamb grilled madbi-style over hot stone." },
  { id: "m8",  cat: "meat", ar: "لحم وصلة", en: "Meat Waslah", price: "AED 40", key: "meat-waslah", img: img("meat-waslah"),
    descAr: "قطعة لحم غنم مع الأرز، حصة مناسبة للفرد.",
    descEn: "A portion of lamb with rice — a good single serving." },
  { id: "m9",  cat: "meat", ar: "لحم برمة", en: "Meat Burma", price: "AED 60", key: "meat-burma", img: img("meat-burma"),
    descAr: "لحم غنم يُطهى ببطء في البرمة الفخارية.",
    descEn: "Lamb slow-cooked in a traditional clay pot (burma)." },
  { id: "m10", cat: "meat", ar: "لحم بلدي", en: "Local Meat", price: "AED 90", key: "local-meat", img: img("local-meat"),
    descAr: "لحم غنم بلدي طازج فوق أرز المندي.",
    descEn: "Fresh local lamb over mandi rice." },

  // ---------------- CHICKEN ----------------
  { id: "c1", cat: "chicken", ar: "دجاج مندي", en: "Chicken Mandi", price: "AED 33", key: "chicken-mandi", img: "assets/menu/chicken-mandi.jpg",
    descAr: "نصف دجاجة محضّرة ببهارات المندي، تُطهى في التنور وتُقدَّم مع الأرز والسلطة والشوربة والروب والشطني.",
    descEn: "Half a chicken prepared with mandi spices, cooked in the tandoor and served with rice, salad, soup, yogurt and shitni." },
  { id: "c2", cat: "chicken", ar: "دجاج مظبي", en: "Chicken Madbi", price: "AED 35", key: "chicken-madbi", img: "assets/menu/chicken-madbi.jpg",
    descAr: "نصف دجاجة مشوية على الفحم، تُقدَّم مع الأرز والسلطة والشوربة والروب والشطني.",
    descEn: "Half a chicken grilled over charcoal, served with rice, salad, soup, yogurt and shitni." },
  { id: "c3", cat: "chicken", ar: "دجاج مدفون", en: "Chicken Madfoon", price: "AED 35", key: "chicken-madfoon", img: "assets/menu/chicken-madfoon.jpg",
    descAr: "نصف دجاجة مدفونة في التنور مع بهارات خاصة، تُقدَّم مع الأرز والسلطة والشوربة والروب والشطني.",
    descEn: "Half a chicken buried and baked in the oven with special spices, served with rice, salad, soup, yogurt and shitni." },
  { id: "c4", cat: "chicken", ar: "دجاج مظغوط", en: "Chicken Madghot", price: "AED 35", key: "chicken-madghot", img: img("chicken-madghot"),
    descAr: "دجاج مضغوط متبّل بخلطة توابل بيتية.",
    descEn: "Pressure-cooked chicken in a house spice blend." },
  { id: "c5", cat: "chicken", ar: "دجاج كبسة", en: "Chicken Kabsa", price: "AED 35", key: "chicken-kabsa", img: img("chicken-kabsa"),
    descAr: "دجاج مع أرز الكبسة المتبّل على الطريقة الخليجية.",
    descEn: "Chicken with spiced kabsa rice, Gulf-style." },
  { id: "c6", cat: "chicken", ar: "دجاج زربيان", en: "Chicken Zorbian", price: "AED 35", key: "chicken-zorbian", img: img("chicken-zorbian"),
    descAr: "دجاج مع أرز الزربيان الغني بالتوابل والزعفران.",
    descEn: "Chicken with zorbian rice, rich in spices and saffron." },
  { id: "c7", cat: "chicken", ar: "دجاج برياني", en: "Chicken Beryani", price: "AED 30", key: "chicken-beryani", img: "assets/menu/chicken-beryani.jpg",
    descAr: "دجاج مطهو مع أرز البرياني الغني بالبهارات والزعفران، ويُقدَّم مع مرافقاته.",
    descEn: "Chicken cooked with fragrant biryani rice, rich in spices and saffron, served with its sides." },

  // ---------------- FISH ----------------
  { id: "f1", cat: "fish", ar: "سمك شعري", en: "Sherry Fish", price: "AED 55", key: "sherry-fish", img: img("sherry-fish"),
    descAr: "سمك شعري طازج، مشوي أو مقلي حسب الرغبة.",
    descEn: "Fresh sherry fish, grilled or fried to preference." },
  { id: "f2", cat: "fish", ar: "سمك كنعد", en: "King Fish", price: "AED 55", key: "king-fish", img: img("king-fish"),
    descAr: "شرائح سمك الكنعد الطازج.",
    descEn: "Fresh king fish (kingfish) fillets." },
  { id: "f3", cat: "fish", ar: "سمك هامور", en: "Hamor Fish", price: "AED 55", key: "hamor-fish", img: img("hamor-fish"),
    descAr: "سمك الهامور الطازج، من أجود أنواع السمك الخليجي.",
    descEn: "Fresh hamour — one of the finest Gulf fish." },
  { id: "f4", cat: "fish", ar: "سمك سبريم", en: "Supreme Fish", price: "AED 55", key: "supreme-fish", img: img("supreme-fish"),
    descAr: "سمك سبريم طازج بنكهة مميزة.",
    descEn: "Fresh supreme fish with a distinctive flavor." },
  { id: "f5", cat: "fish", ar: "سمك سلمون", en: "Salmon Fish", price: "AED 55", key: "salmon-fish", img: img("salmon-fish"),
    descAr: "سمك السلمون الطازج، غني ولذيذ.",
    descEn: "Fresh salmon — rich and delicious." },
  { id: "f6", cat: "fish", ar: "فرش مشوي", en: "Farsh Grilled", price: "AED 60", key: "farsh-grilled", img: img("farsh-grilled"),
    descAr: "سمك فرش مشوي على الفحم.",
    descEn: "Charcoal-grilled farsh fish." },

  // ---------------- SALADS ----------------
  { id: "s1", cat: "salads", ar: "سلطة عربية", en: "Arabic Salad", price: "AED 18", key: "arabic-salad", img: img("arabic-salad"),
    descAr: "خضار طازجة مفرومة بخلطة زيت وليمون.",
    descEn: "Fresh chopped vegetables in a lemon-oil dressing." },
  { id: "s2", cat: "salads", ar: "سلطة جرجير", en: "Gergir Salad", price: "AED 15", key: "gergir-salad", img: img("gergir-salad"),
    descAr: "سلطة الجرجير الطازج بنكهة منعشة.",
    descEn: "Fresh rocket (arugula) salad with a peppery bite." },
  { id: "s3", cat: "salads", ar: "روب بالخيار", en: "Yoghurt Cucumber", price: "AED 15", key: "yoghurt-cucumber", img: img("yoghurt-cucumber"),
    descAr: "لبن زبادي بارد مع الخيار والنعناع.",
    descEn: "Cool yoghurt with cucumber and mint." },
  { id: "s4", cat: "salads", ar: "شفوت", en: "Shafoot", price: "AED 10", key: "shafoot", img: img("shafoot"),
    descAr: "طبق يمني تقليدي من خبز مبلّل باللبن والأعشاب.",
    descEn: "A traditional Yemeni dish of flatbread soaked in herbed yoghurt." },
  { id: "s5", cat: "salads", ar: "حمص", en: "Hommus", price: "AED 15", key: "hommus", img: img("hommus"),
    descAr: "حمص مهروس بالطحينة وزيت الزيتون.",
    descEn: "Creamy chickpea hummus with tahini and olive oil." },
  { id: "s6", cat: "salads", ar: "فتوش", en: "Fattoush", price: "AED 20", key: "fattoush", img: img("fattoush"),
    descAr: "سلطة فتوش بالخضار والخبز المحمّص ودبس الرمان.",
    descEn: "Fattoush with vegetables, toasted bread, and pomegranate molasses." },
  { id: "s7", cat: "salads", ar: "سلطة يونانية", en: "Greek Salad", price: "AED 20", key: "greek-salad", img: img("greek-salad"),
    descAr: "سلطة يونانية بالجبن والزيتون والخضار.",
    descEn: "Greek salad with feta, olives, and vegetables." },
  { id: "s8", cat: "salads", ar: "تبولة", en: "Tabboulah", price: "AED 20", key: "tabboulah", img: img("tabboulah"),
    descAr: "تبولة بالبقدونس والبرغل والطماطم والليمون.",
    descEn: "Tabbouleh with parsley, bulgur, tomato, and lemon." },

  // ---------------- SWEETS ----------------
  { id: "w1", cat: "sweets", ar: "كنافة قشطة", en: "Kunafa Cream", price: "AED 15", key: "kunafa-cream", img: img("kunafa-cream"),
    descAr: "كنافة دافئة محشوة بالقشطة وتُقدَّم مع القطر.",
    descEn: "Warm kunafa filled with cream and finished with syrup." },
  { id: "w2", cat: "sweets", ar: "كنافة نوتيلا", en: "Kunafa Nutella", price: "AED 20", key: "kunafa-nutella", img: img("kunafa-nutella"),
    descAr: "كنافة مقرمشة محشوة بالنوتيلا.",
    descEn: "Crisp kunafa filled with Nutella." },
  { id: "w3", cat: "sweets", ar: "كنافة بلجبن", en: "Kunafa Cheese", price: "AED 15", key: "kunafa-cheese", img: img("kunafa-cheese"),
    descAr: "كنافة بالجبن الذائب، الطريقة الكلاسيكية.",
    descEn: "Kunafa with melted cheese — the classic way." },
  { id: "w4", cat: "sweets", ar: "فتة تمر عادي", en: "Date Fatta", price: "AED 12", key: "date-fatta", img: img("date-fatta"),
    descAr: "فتة التمر بالخبز والسمن والعسل.",
    descEn: "Date fatta with bread, ghee, and honey." },
  { id: "w5", cat: "sweets", ar: "بسبوسة", en: "Basbousa", price: "AED 7/10", key: "basbousa", img: img("basbousa"),
    descAr: "بسبوسة السميد المحلّاة بالقطر.",
    descEn: "Semolina basbousa sweetened with syrup." },
  { id: "w6", cat: "sweets", ar: "حلوى عمان", en: "Oman Sweets", price: "AED 10", key: "oman-sweets", img: img("oman-sweets"),
    descAr: "حلوى عمانية تقليدية طرية وعطرية.",
    descEn: "Traditional Omani halwa — soft and aromatic." },

  // ---------------- JUICES ----------------
  { id: "j1",  cat: "juices", ar: "برتقال", en: "Orange", price: "AED 18", key: "orange-juice", img: img("orange-juice"),
    descAr: "عصير برتقال طازج.", descEn: "Fresh orange juice." },
  { id: "j2",  cat: "juices", ar: "مانجو", en: "Mango", price: "AED 18", key: "mango-juice", img: img("mango-juice"),
    descAr: "عصير مانجو طازج.", descEn: "Fresh mango juice." },
  { id: "j3",  cat: "juices", ar: "زبيب", en: "Raisin", price: "AED 10", key: "raisin-juice", img: img("raisin-juice"),
    descAr: "عصير الزبيب التقليدي.", descEn: "Traditional raisin juice." },
  { id: "j4",  cat: "juices", ar: "تفاح", en: "Apple", price: "AED 18", key: "apple-juice", img: img("apple-juice"),
    descAr: "عصير تفاح طازج.", descEn: "Fresh apple juice." },
  { id: "j5",  cat: "juices", ar: "بطيخ", en: "Water Melon", price: "AED 18", key: "watermelon-juice", img: img("watermelon-juice"),
    descAr: "عصير بطيخ منعش.", descEn: "Refreshing watermelon juice." },
  { id: "j6",  cat: "juices", ar: "أناناس", en: "Pine Apple", price: "AED 18", key: "pineapple-juice", img: img("pineapple-juice"),
    descAr: "عصير أناناس طازج.", descEn: "Fresh pineapple juice." },
  { id: "j7",  cat: "juices", ar: "أفوكادو", en: "Avocado", price: "AED 18", key: "avocado-juice", img: img("avocado-juice"),
    descAr: "عصير أفوكادو كريمي.", descEn: "Creamy avocado juice." },
  { id: "j8",  cat: "juices", ar: "ليمون", en: "Lemon", price: "AED 15", key: "lemon-juice", img: img("lemon-juice"),
    descAr: "عصير ليمون منعش.", descEn: "Refreshing lemon juice." },
  { id: "j9",  cat: "juices", ar: "حليب موز", en: "Banana Milk Shake", price: "AED 15", key: "banana-shake", img: img("banana-shake"),
    descAr: "ميلك شيك الموز بالحليب.", descEn: "Banana milkshake." },
  { id: "j10", cat: "juices", ar: "عنب", en: "Grape", price: "AED 10", key: "grape-juice", img: img("grape-juice"),
    descAr: "عصير عنب طازج.", descEn: "Fresh grape juice." },
  { id: "j11", cat: "juices", ar: "مشروب بارد", en: "Cold Drinks", price: "AED 4/10", key: "cold-drinks", img: img("cold-drinks"),
    descAr: "مشروبات غازية باردة.", descEn: "Chilled soft drinks." },
  { id: "j12", cat: "juices", ar: "ماء", en: "Water", price: "AED 2/4", key: "water", img: img("water"),
    descAr: "مياه معدنية.", descEn: "Bottled water." },
];

// ============================================================
// "Take a Look" media — videos and photos, each with a short
// description shown when opened. Temporary placeholders for now.
//
// VIDEOS: put files in assets/videos/ and set `src` to e.g.
//   "assets/videos/mandi-making.mp4". Leave src:null to show a
//   labeled placeholder tile.
// PHOTOS: set `src` to an image URL or "assets/photos/xxx.jpg".
//   Leave src:null for a labeled placeholder tile.
// ============================================================

const VIDEOS = [
  { key: "kitchen-mandi",   src: null, ar: "كيف نحضّر المندي على الطريقة التقليدية.", en: "How we prepare mandi the traditional way." },
  { key: "charcoal-grill",  src: null, ar: "شواء المضبي على الفحم مباشرة.", en: "Madbi grilling live over charcoal." },
  { key: "haneeth-oven",    src: null, ar: "إخراج الحنيذ من التنور بعد ساعات من الطهي.", en: "Pulling haneeth from the tandoor after hours of cooking." },
  { key: "dining-view",     src: null, ar: "جولة داخل المطعم وأجواء الجلسات.", en: "A tour inside the restaurant and its seating." },
  { key: "kunafa-making",   src: null, ar: "تحضير الكنافة الطازجة أمامك.", en: "Fresh kunafa made right in front of you." },
  { key: "tea-service",     src: null, ar: "تقديم شاي الهيل والقرنفل التقليدي.", en: "Serving traditional cardamom-clove tea." },
];

function photoImg(key) {
  return `https://picsum.photos/seed/bakphoto-${key}/800/600`;
}

const PHOTOS = [
  { key: "platter-closeup", src: photoImg("platter"),  ar: "طبق مندي لحم كامل جاهز للتقديم.", en: "A full lamb mandi platter, ready to serve." },
  { key: "dining-room",     src: photoImg("dining"),   ar: "قاعة الطعام بأجوائها العائلية الدافئة.", en: "Our warm, family-friendly dining room." },
  { key: "floor-seating",   src: photoImg("majlis"),   ar: "الجلسة الأرضية على الطراز اليمني.", en: "Traditional Yemeni-style floor seating." },
  { key: "haneeth-plate",   src: photoImg("haneeth"),  ar: "كتف حنيذ طري يتفكك عن العظم.", en: "Tender haneeth shoulder falling off the bone." },
  { key: "fresh-juices",    src: photoImg("juices"),   ar: "تشكيلة من عصائرنا الطازجة.", en: "A selection of our fresh juices." },
  { key: "storefront",      src: photoImg("front"),    ar: "واجهة المطعم في ديسكفري غاردنز.", en: "Our storefront in Discovery Gardens." },
];
