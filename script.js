let candlesBlown = 0;

// PAGE 1
function showSurprise() {
  document.getElementById("message").hidden = false;
  document.getElementById("surpriseButton").hidden = true;

  // Start birthday music after user clicks
  playMusic();
}

// PAGE 2
function nextPage() {
  document.getElementById("welcomePage").hidden = true;
  document.getElementById("cakePage").hidden = false;
}

// BLOW CANDLES
function blowCandle(candle) {
  const flame = candle.querySelector(".flame");

  // Prevent clicking the same candle twice
  if (!flame || flame.hidden) return;

  // Hide flame
  flame.hidden = true;

  // Create POP effect
  const pop = document.createElement("div");
  pop.className = "flame-pop";
  candle.appendChild(pop);

  // Create smoke effect
  const smoke = document.createElement("div");
  smoke.className = "candle-smoke";
  candle.appendChild(smoke);

  // Remove effects after animation
  setTimeout(() => pop.remove(), 400);
  setTimeout(() => smoke.remove(), 1300);

  candlesBlown++;

  // When all 5 candles are blown out
  if (candlesBlown === 5) {
    setTimeout(() => {
      document.getElementById("wishMessage").hidden = false;
      launchConfetti();
    }, 700);
  }
}

// CONFETTI ANIMATION
function launchConfetti() {
  const colors = ["#ff69b4", "#ffb6c1", "#ffffff", "#ffd700"];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");

    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-20px";
    piece.style.width = "9px";
    piece.style.height = "12px";
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.zIndex = "1000";
    piece.style.pointerEvents = "none";

    document.body.appendChild(piece);

    piece.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        { transform: "translateY(110vh) rotate(720deg)", opacity: 0 }
      ],
      {
        duration: 2000 + Math.random() * 2000,
        easing: "ease-in"
      }
    ).onfinish = () => piece.remove();
  }
}

// PAGE 3
function goToMemories() {
  document.getElementById("cakePage").hidden = true;
  document.getElementById("memoriesPage").hidden = false;
}
// PAGE 3: OUR MEMORIES

const memories = [
  {
    image: "images/memory1.jpeg",
    title: "Our First Memory ♡",
    description: "One of my favourite moments with you."
  },
  {
    image: "images/memory2.jpeg",
    title: "Our Happy Days ♡",
    description: "Every little moment with you makes me smile."
  },
  {
    image: "images/memory3.jpeg",
    title: "My Favourite Person ♡",
    description: "I'm so lucky to have you in my life."
  },
  {
    image: "images/memory4.jpeg",
    title: "Our Silly Moments ♡",
    description: "I love how we can laugh about anything together."
  },
  {
    image: "images/memory5.jpeg",
    title: "Always You ♡",
    description: "No matter what, you'll always be special to me."
  },
  {
    image: "images/memory6.jpeg",
    title: "Our Memory 6 ♡",
    description: "A little moment worth remembering."
  },
  {
    image: "images/memory7.jpeg",
    title: "Our Memory 7 ♡",
    description: "Another beautiful day with you."
  },
  {
    image: "images/memory8.jpeg",
    title: "Our Memory 8 ♡",
    description: "One of my favourite memories."
  },
  {
    image: "images/memory9.jpeg",
    title: "Our Memory 9 ♡",
    description: "A moment that made me smile."
  },
  {
    image: "images/memory10.jpeg",
    title: "Our Memory 10 ♡",
    description: "I'm glad we shared this moment."
  },
  {
    image: "images/memory11.jpeg",
    title: "Our Memory 11 ♡",
    date: "2 November 2026",
    description: "Here's to many more memories together."
  }
];

let currentMemory = 0;

function renderMemories() {
  const container = document.getElementById("polaroidContainer");
  const dots = document.getElementById("memoryDots");

  container.innerHTML = "";
  dots.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const index = (currentMemory + i) % memories.length;
    const memory = memories[index];

    const card = document.createElement("div");
    card.className = "polaroid";

    const photo = document.createElement("img");
    photo.src = memory.image;
    photo.alt = memory.title;

    const caption = document.createElement("p");
    caption.textContent = memory.title;

    card.appendChild(photo);
    card.appendChild(caption);

    card.onclick = () => openMemory(index);

    container.appendChild(card);
  }

  memories.forEach((memory, index) => {
    const dot = document.createElement("div");
    dot.className = "memory-dot";

    if (index === currentMemory) {
      dot.classList.add("active");
    }

    dot.onclick = () => {
      currentMemory = index;
      renderMemories();
    };

    dots.appendChild(dot);
  });
}

function nextMemory() {
  currentMemory = (currentMemory + 1) % memories.length;
  renderMemories();
}

function previousMemory() {
  currentMemory =
    (currentMemory - 1 + memories.length) % memories.length;

  renderMemories();
}

function openMemory(index) {
  const memory = memories[index];

  document.getElementById("popupImage").src = memory.image;
  document.getElementById("popupTitle").textContent = memory.title;
  document.getElementById("popupDate").textContent = memory.date || "";
  document.getElementById("popupDescription").textContent =
    memory.description;

  document.getElementById("memoryPopup").hidden = false;
}

function closeMemory() {
  document.getElementById("memoryPopup").hidden = true;
}

renderMemories();

// PAGE 4: BIRTHDAY LETTER

function goToLetter() {
  document.getElementById("bouquetPage").hidden = true;
  document.getElementById("letterPage").hidden = false;
  window.scrollTo(0, 0);
}

function openLetter() {
  const envelope = document.getElementById("envelope");

  // Prevent opening twice
  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");

  // Create floating hearts
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.className = "letter-heart";
    heart.textContent = ["💗", "💕", "💖", "🤍"][i % 4];

    const rect = envelope.getBoundingClientRect();

    heart.style.left =
      (rect.left + Math.random() * rect.width) + "px";
    heart.style.top =
      (rect.top + Math.random() * rect.height) + "px";

    heart.style.animationDelay = (Math.random() * 0.5) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3200);
  }

  // Reveal birthday letter
  setTimeout(() => {
    document.getElementById("birthdayLetter").hidden = false;
    document.getElementById("tapLetter").hidden = true;
    const reveals = document.querySelectorAll("#birthdayLetter .finale-reveal");
    const finaleButton = document.getElementById("oneMoreThingButton");
    finaleButton.disabled = true;
    reveals.forEach((item, index) => {
      setTimeout(() => item.classList.add("visible"), 260 + index * 420);
    });
    setTimeout(() => { finaleButton.disabled = false; }, 260 + reveals.length * 420);
  }, 500);
}
// Final interactive birthday message. Edit its text in index.html.
function showFinalSurprise() {
  const surprise = document.getElementById("finalSurprise");
  if (!surprise || !surprise.hidden) return;
  surprise.hidden = false;
  document.getElementById("oneMoreThingButton").hidden = true;
  requestAnimationFrame(() => surprise.classList.add("visible"));
  const rect = surprise.getBoundingClientRect();
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "letter-heart";
    heart.textContent = ["💗", "💕", "🤍", "💖"][i % 4];
    heart.style.left = (rect.left + Math.random() * rect.width) + "px";
    heart.style.top = (rect.top + Math.random() * Math.min(rect.height, 110)) + "px";
    heart.style.animationDelay = (Math.random() * 0.6) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3300);
  }
}

// The surprise stays closed until Fara taps the button.
// Pause birthday music during the video, and resume only if it was playing.
const loveMessageVideo = document.getElementById("loveMessageVideo");
let resumeBirthdayMusicAfterVideo = false;
if (loveMessageVideo) {
  loveMessageVideo.addEventListener("play", () => {
    resumeBirthdayMusicAfterVideo = !backgroundMusic.paused;
    if (!backgroundMusic.paused) backgroundMusic.pause();
  });
  loveMessageVideo.addEventListener("pause", () => {
    if (!loveMessageVideo.ended && resumeBirthdayMusicAfterVideo) {
      resumeBirthdayMusicAfterVideo = false;
      playMusic();
    }
  });
  loveMessageVideo.addEventListener("ended", () => {
    document.getElementById("videoEnding").hidden = false;
    if (resumeBirthdayMusicAfterVideo) playMusic();
    resumeBirthdayMusicAfterVideo = false;
  });
}

// FLOATING HEARTS BACKGROUND

function createFloatingHearts() {
  const hearts = ["💗", "💕", "🤍", "💖"];

  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 18) + "px";
    heart.style.animationDuration = (9 + Math.random() * 8) + "s";
    heart.style.animationDelay = (-Math.random() * 16) + "s";

    document.body.appendChild(heart);
  }
}

createFloatingHearts();

// BACKGROUND MUSIC CONTROLS

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

backgroundMusic.volume = 0.35;

function updateMusicButton() {
  const playing = !backgroundMusic.paused;

  musicButton.textContent = playing ? "🎵" : "🔇";
  musicButton.setAttribute(
    "aria-label",
    playing ? "Pause background music" : "Play background music"
  );
}

async function playMusic() {
  try {
    await backgroundMusic.play();
  } catch (error) {
    console.log("Music could not start:", error);
  }

  updateMusicButton();
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    playMusic();
  } else {
    backgroundMusic.pause();
    updateMusicButton();
  }
}

backgroundMusic.addEventListener("play", updateMusicButton);
backgroundMusic.addEventListener("pause", updateMusicButton);

// PAGE 0 - SECRET CODE

const secretPin = "270626";
let enteredPin = "";
let pinLocked = false;

function updatePinDots() {
  const dots = document.querySelectorAll("#pinDots span");

  dots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < enteredPin.length);
  });
}

function pressPin(number) {
  if (pinLocked || enteredPin.length >= 6) return;

  enteredPin += number;
  updatePinDots();

  if (enteredPin.length === 6) {
    checkPin();
  }
}

function clearPin() {
  if (pinLocked) return;

  enteredPin = "";
  updatePinDots();
  document.getElementById("pinMessage").textContent = "";
}

function deletePin() {
  if (pinLocked) return;

  enteredPin = enteredPin.slice(0, -1);
  updatePinDots();
  document.getElementById("pinMessage").textContent = "";
}

function checkPin() {
  const message = document.getElementById("pinMessage");
  const dots = document.getElementById("pinDots");

  pinLocked = true;

  if (enteredPin === secretPin) {
    message.textContent = "You remembered! ♡";

    setTimeout(() => {
      document.getElementById("lockPage").hidden = true;
      document.getElementById("welcomePage").hidden = false;
    }, 2000);

  } else {
    message.textContent = "Hehe, try again, sayang! 💕";

    dots.classList.remove("shake");
    void dots.offsetWidth;
    dots.classList.add("shake");

    setTimeout(() => {
      enteredPin = "";
      updatePinDots();
      pinLocked = false;
      dots.classList.remove("shake");
    }, 700);
  }
}

// PAGE 4: BUILD YOUR OWN BOUQUET
const flowerData = {
  rose: {emoji:"🌹", name:"Red Rose", meaning:"Deep Love", note:"My heart will always have a special place for you.", color:"#e86183", shape:"rose"},
  tulip: {emoji:"🌷", name:"Pink Tulip", meaning:"Affection", note:"Loving you feels like the sweetest part of my day.", color:"#fa91b3", shape:"tulip"},
  sunflower: {emoji:"🌻", name:"Sunflower", meaning:"Happiness & Loyalty", note:"You bring sunshine into my ordinary days.", color:"#f8bc54", shape:"sunflower"},
  blossom: {emoji:"🌸", name:"Cherry Blossom", meaning:"Beautiful Moments", note:"Even the smallest moments with you mean so much to me.", color:"#f8b7cf", shape:"blossom"},
  daisy: {emoji:"🌼", name:"Daisy", meaning:"Sincerity", note:"With you, even the simplest things feel special.", color:"#fff3e9", shape:"daisy"},
  lavender: {emoji:"🪻", name:"Lavender", meaning:"Devotion & Peace", note:"I hope I can always be someone who brings you peace.", color:"#ac8bcf", shape:"lavender"}
};
let selectedFlowers = [];
let selectedBouquetMemory = null;
let pendingFlower = null;

function goToBouquet() {
  document.getElementById("memoriesPage").hidden = true;
  document.getElementById("bouquetPage").hidden = false;
  window.scrollTo(0, 0);
}

function showFlowerMeaning(type) {
  if (selectedFlowers.length >= 5) return;
  pendingFlower = type;
  const flower = flowerData[type];
  document.getElementById("flowerMeaningEmoji").textContent = flower.emoji;
  document.getElementById("flowerMeaningTitle").textContent = flower.name + " — " + flower.meaning;
  document.getElementById("flowerMeaningText").textContent = "This flower represents " + flower.meaning.toLowerCase() + ".";
  document.getElementById("flowerLoveNote").textContent = '“' + flower.note + '”';
  document.getElementById("flowerMeaningCard").hidden = false;
  document.getElementById("flowerMeaningCard").scrollIntoView({behavior:"smooth", block:"nearest"});
}

function confirmFlower() {
  if (!pendingFlower || selectedFlowers.length >= 5) return;
  selectedFlowers.push(pendingFlower);
  pendingFlower = null;
  document.getElementById("flowerMeaningCard").hidden = true;
  renderBouquet();
}

function makeFlowerSVG(type) {
  const flower = flowerData[type];
  const color = flower.color;
  let head = "";
  if (flower.shape === "tulip") {
    head = `<path d="M30 67 Q11 48 17 21 L31 32 L42 12 L54 32 L68 21 Q74 51 53 67 Z" fill="${color}" stroke="#d9789b" stroke-width="1.5"/><path d="M42 13 Q35 36 42 62 Q50 36 42 13" fill="#ffd1df" opacity=".55"/>`;
  } else if (flower.shape === "lavender") {
    head = Array.from({length:10},(_,i)=>`<ellipse cx="${i%2?48:36}" cy="${18+i*5}" rx="9" ry="6" fill="${i%3===0?'#c8a6e8':color}" transform="rotate(${i%2?30:-30} ${i%2?48:36} ${18+i*5})"/>`).join("");
  } else if (flower.shape === "rose") {
    head = `<circle cx="42" cy="43" r="28" fill="${color}"/><path d="M42 20 C15 17 17 50 37 55 C56 61 64 36 45 32 C31 29 30 47 43 46 C53 45 51 36 43 39" fill="none" stroke="#b53f63" stroke-width="5" stroke-linecap="round"/><path d="M18 48 Q26 67 43 64 M65 43 Q61 61 49 64" fill="none" stroke="#ffb2c8" stroke-width="4" opacity=".75"/>`;
  } else {
    const count = flower.shape === "sunflower" ? 12 : flower.shape === "daisy" ? 10 : 5;
    const rx = flower.shape === "sunflower" ? 10 : 12;
    head = Array.from({length:count},(_,i)=>`<ellipse cx="42" cy="20" rx="${rx}" ry="21" fill="${color}" stroke="${flower.shape==='daisy'?'#eed9d5':'#ffffff44'}" stroke-width="1" transform="rotate(${i*360/count} 42 43)"/>`).join("");
    head += `<circle cx="42" cy="43" r="${flower.shape==='sunflower'?16:10}" fill="${flower.shape==='sunflower'?'#78503c':'#f8c45e'}"/>`;
    if (flower.shape === "sunflower") head += `<circle cx="42" cy="43" r="9" fill="#a96a39" stroke="#f6ce7c" stroke-dasharray="2 3" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 84 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M42 70 Q37 124 42 187" stroke="#56876d" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M41 126 Q13 97 13 123 Q19 145 42 137" fill="#75a887"/><path d="M41 148 Q70 114 73 135 Q67 155 42 156" fill="#629879"/>${head}</svg>`;
}

function renderBouquet() {
  const container = document.getElementById("bouquetFlowers");
  container.innerHTML = "";
  // Tightly grouped flower heads, centered above the wrapping paper.
  const spots = [
    {left:5, top:0, angle:-7},
    {left:38, top:0, angle:0},
    {left:71, top:0, angle:7},
    {left:21, top:24, angle:-5},
    {left:55, top:24, angle:5}
  ];
  selectedFlowers.forEach((type,index)=>{
    const el = document.createElement("div");
    el.className = "bouquet-flower-stem";
    el.style.left = spots[index].left + "%";
    el.style.top = spots[index].top + "%";
    el.style.transform = `rotate(${spots[index].angle}deg)`;
    el.innerHTML = makeFlowerSVG(type);
    container.appendChild(el);
  });
  document.getElementById("bouquetCount").textContent = `${selectedFlowers.length} / 5 flowers picked`;
  const complete = selectedFlowers.length === 5;
  document.getElementById("bouquetComplete").hidden = !complete;
  document.getElementById("bouquetControls").hidden = complete;
  if (!complete) {
    document.getElementById("bouquetCapture").classList.remove("photo-mode");
    document.getElementById("bouquetPhotoButton").textContent = "Show My Bouquet 📸";
  }
}

function resetBouquet() {
  selectedFlowers = [];
  pendingFlower = null;
  selectedBouquetMemory = null;
  document.getElementById("bouquetPolaroid").hidden = true;
  document.getElementById("chooseMemoryButton").textContent = "Add Our Little Memory 📸";
  closeBouquetMemories();
  document.getElementById("flowerMeaningCard").hidden = true;
  renderBouquet();
}

function toggleBouquetPhoto() {
  const capture = document.getElementById("bouquetCapture");
  const photoMode = capture.classList.toggle("photo-mode");
  document.getElementById("bouquetPhotoButton").textContent = photoMode ? "Back to Bouquet ♡" : "Show My Bouquet 📸";
  if (photoMode) capture.scrollIntoView({behavior:"smooth",block:"center"});
}

// Pick one of the existing 11 scrapbook photos for a tiny bouquet polaroid.
function openBouquetMemories() {
  const picker = document.getElementById("bouquetMemoryPicker");
  const grid = document.getElementById("bouquetMemoryGrid");
  grid.replaceChildren();
  memories.forEach((memory, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bouquet-memory-option";
    if (selectedBouquetMemory === index) button.classList.add("selected");
    const img = document.createElement("img");
    img.src = memory.image;
    img.alt = memory.title;
    img.loading = "lazy";
    const label = document.createElement("span");
    label.textContent = memory.title;
    button.append(img, label);
    button.addEventListener("click", () => selectBouquetMemory(index));
    grid.appendChild(button);
  });
  picker.hidden = false;
  picker.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function selectBouquetMemory(index) {
  if (!memories[index]) return;
  selectedBouquetMemory = index;
  document.getElementById("bouquetPolaroidImage").src = memories[index].image;
  document.getElementById("bouquetPolaroid").hidden = false;
  document.getElementById("chooseMemoryButton").textContent = "Change Memory ♡";
  closeBouquetMemories();
  document.getElementById("bouquetCapture").scrollIntoView({behavior:"smooth",block:"center"});
}
function closeBouquetMemories() {
  document.getElementById("bouquetMemoryPicker").hidden = true;
}
