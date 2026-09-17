/**
 * Apology & Romantic Experience Configuration
 * Centralized file for all personalized copy, messages, and memories.
 * Edit this file to customize the experience without altering React components.
 */

export const apologyConfig = {
  // Recipient and sender details (optional personalization)
  recipientName: "Madhu...",
  senderName: "Pajju",

  // Landing Hero Section
  hero: {
    badge: "A message from my heart",
    title: "I'm Sorry ❤️",
    subtitle: [
      "I know I messed up.",
      "I don't expect you to forget everything instantly.",
      "I just want one chance to make things right."
    ],
    question: "Will you forgive me?",
    yesButtonText: "YES, I FORGIVE YOU",
    noButtonText: "NO",
    accessibleRefusalText: "I really mean no",
  },

  // Playful sequential responses when trying to click the NO button
  noButtonMessages: [
    "NO",
    "Are you sure? 🥺",
    "Think again…",
    "My heart says no to this no 😭",
    "One more chance?",
    "Please? ❤️",
    "I brought flowers… 💐",
    "Okay okay… but look at me 🥹",
    "You’re really going to break my heart?",
    "You caught me 😂"
  ],

  // Step 1: The Apology Letter (Typewriter animation)
  step1Apology: {
    tag: "Step 1 of 4",
    heading: "I’m genuinely sorry.",
    paragraphs: [
      "I've replayed everything in my head, and I realize that I could have handled things differently.",
      "I'm sorry for the moments where I hurt you, for the things I said, and for making you feel anything less than valued.",
      "I can't change what happened, but I can take full responsibility for it.",
      "And I want you to know that from the bottom of my heart, I am truly sorry."
    ],
    continueButton: "Continue ❤️",
  },

  // Step 2: Things I Never Want To Take For Granted
  step2Memories: {
    tag: "Step 2 of 4",
    heading: "Things I Never Want To Take For Granted",
    subheading: "Every single moment with you is precious. Here are the things I cherish most:",
    continueButton: "Read My Heart ❤️",
    cards: [
      {
        id: 1,
        title: "Your smile",
        description: "The way it lights up even the darkest room without you even trying.",
        icon: "Sparkles",
      },
      {
        id: 2,
        title: "Your patience",
        description: "The grace and kindness you offer, even in times when I make it difficult.",
        icon: "Heart",
      },
      {
        id: 3,
        title: "The little conversations",
        description: "From our late-night thoughts to our random silly laughs over nothing.",
        icon: "MessageCircleHeart",
      },
      {
        id: 4,
        title: "Ordinary moments into magic",
        description: "How simple car rides, shared meals, and quiet walks become unforgettable memories.",
        icon: "SunMedium",
      },
      {
        id: 5,
        title: "The memories we've created",
        description: "Every story and chapter we have written together means the world to me.",
        icon: "Camera",
      },
      {
        id: 6,
        title: "Your gentle heart",
        description: "Your genuine warmth inspires me every single day to be a better person.",
        icon: "Flame",
      },
      {
        id:7,
        title:"Your Eyes",
        description:"your eyes are the most attractive!!!! i always remember the things spend with you the night we talked and many more.",
        icon:'Eyes',
      },
    ],
  },

  // Step 3: The Handwritten Love Letter
  step3Letter: {
    tag: "Step 3 of 4",
    heading: "One More Thing…",
    date: "From my heart to yours",
    paragraphs: [
      "I don't want this website to convince you of anything.",
      "I just wanted to create something that says what I sometimes fail to say properly.",
      "I'm sorry.",
      "And if you'll let me, I'd rather show you through my actions than simply promise you with words."
    ],
    closing: "With love and honesty,",
    continueButton: "One Last Question ❤️",
  },

  // Step 4: The Final Question
  step4FinalQuestion: {
    tag: "Final Question",
    heading: "So… can we start again? ❤️",
    subtext: [
      "Not by forgetting everything.",
      "Not by pretending nothing happened.",
      "But by giving me a chance to make things right."
    ],
    yesButtonText: "YES, LET'S START AGAIN",
    needsTimeButtonText: "I NEED SOME TIME",
  },

  // Response when partner selects "I NEED SOME TIME"
  needsTimeResponse: {
    heading: "I understand completely 🌸",
    messages: [
      "Take all the time you need.",
      "There is no pressure at all.",
      "I just wanted you to know that I'm genuinely sorry. ❤️"
    ],
    closing: "I will be right here whenever you are ready.",
    restartButton: "Back to Beginning",
  },

  // Grand Celebration Screen when YES is selected
  celebration: {
    heading: "Thank you. ❤️",
    promise: "I promise I'll let my actions speak louder than this website.",
    quote: "Maybe this isn't the end of our story. Maybe it's the beginning of a better chapter.",
    restartButton: "Revisit Our Journey",
  },

  // Background Music configuration
  music: {
    trackName: "romantic.mp3",
    src: "/assets/music/romantic.mp3",
    autoPlay: true,
    note: "Plays romantic.mp3 automatically when opened",
  }
};
