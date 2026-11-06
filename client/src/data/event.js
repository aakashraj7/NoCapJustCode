// client/src/data/event.js
// Single source of truth for the LARPER OR CODER event.
// Any information not confirmed by organizers is explicitly tagged with PLACEHOLDER comments.

export const CLUB_NAME = "Celestius";

export const EVENT_YEAR = 2026;

export const SHOW_UNCONFIRMED = false;

export const PAIR_SIZE = 2;

export const PRICING = {
  perHead: 149,
  pair: 149 * 2, // compute the pair total, never hard-code it twice
};

// PLACEHOLDER: confirm with organizers
export const PAYMENT_NOTE = "PLACEHOLDER: payment instructions will be shared by the organizers";

export const eventData = {
  name: "LARPER OR CODER",
  edition: null,
  presentedBy: CLUB_NAME,
  tagline: "no larping. only coding.",
  description:
    "A battleground where resume buzzwords don't save you. Only pure logic and locked-in problem solving.",

  date: "13 November 2026",
  venue: "Pega Lab",
  connect: {
    website: "https://www.celestius.in/",
    instagram: "https://www.instagram.com/celestius_cit/",
    instagramLabel: "@celestius_cit",
  },

  // PLACEHOLDER: confirm with organizers
  fees: {
    perHead: `₹${PRICING.perHead}`,
    pair: `₹${PRICING.pair}`,
    note: "Includes The Training Arc and TLE", // PLACEHOLDER: confirm with organizers
  },

  // Neutral stat tiles requested
  stats: [
    { label: "tracks", value: "2" },
    { label: "day", value: "1" },
    { label: "presented by", value: CLUB_NAME },
  ],

  schedule: [
    {
      id: "inauguration",
      time: "10:00 AM - 10:15 AM",
      startHour: "10:00 AM",
      title: "Inauguration",
      type: "Ceremony",
      description: "Formal inauguration.",
      highlight: false,
    },
    {
      id: "workshop",
      time: "10:15 AM - 11:15 AM",
      startHour: "10:15 AM",
      title: "The Training Arc",
      type: "Workshop",
      description:
        "A hands-on workshop on competitive coding and problem-solving, conducted by Navadeep Anna, a 3rd year senior.",
      highlight: true,
      eventId: "training-arc",
    },
    {
      id: "lunch",
      time: "11:15 AM - 12:00 PM",
      startHour: "11:15 AM",
      title: "Lunch Break",
      type: "Break",
      description: "Refuel and strategize before the battle.",
      highlight: false,
    },
    {
      id: "competition",
      time: "12:00 PM - 2:30 PM",
      startHour: "12:00 PM",
      title: "TLE: Think, Lock In, Execute",
      type: "Competition",
      description:
        "DEADLOCK Coding Competition: Tug of Aura and Crack the Code.",
      highlight: true,
      eventId: "tle",
    },
    {
      id: "results",
      time: "2:30 PM - 3:00 PM",
      startHour: "2:30 PM",
      title: "Results & Prize Distribution",
      type: "Closing",
      description:
        "Winners announced, prizes handed out, concluding the day.",
      highlight: false,
    },
  ],

  events: [
    {
      id: "training-arc",
      title: "The Training Arc",
      badge: "Workshop",
      time: "10:15 AM - 11:15 AM",
      registrationType: "pair", // Single pair registration covers both tracks
      blurb:
        "A hands-on workshop on competitive coding and problem-solving, conducted by Navadeep Anna, a 3rd year senior.",
      speakers: [
        {
          name: "Navadeep Anna",
          role: "3rd year senior",
        },
      ],
      // PLACEHOLDER: confirm with organizers
      topics: [
        "Core intuition behind competitive algorithmic problem-solving", // PLACEHOLDER: confirm with organizers
        "Pattern recognition in arrays, dynamic programming & graph traversal", // PLACEHOLDER: confirm with organizers
        "Deconstructing complex constraints under strict time limits", // PLACEHOLDER: confirm with organizers
        "Common debugging traps and submission telemetry", // PLACEHOLDER: confirm with organizers
      ],
      // PLACEHOLDER: confirm with organizers
      targetAudience:
        "Coders of all experience levels looking to sharpen problem-solving intuition.", // PLACEHOLDER: confirm with organizers
      // PLACEHOLDER: confirm with organizers
      prerequisites: [
        "A charged laptop with your preferred coding environment/IDE", // PLACEHOLDER: confirm with organizers
        "Basic familiarity with any programming language (C++, Java, Python, etc.)", // PLACEHOLDER: confirm with organizers
      ],
    },
    {
      id: "tle",
      title: "TLE: Think, Lock In, Execute",
      badge: "DEADLOCK Competition",
      time: "12:00 PM - 2:30 PM",
      registrationType: "pair",
      teamSize: PAIR_SIZE,
      blurb:
        "DEADLOCK Coding Competition featuring Tug of Aura and Who's the GOAT? Crack the Code.",
      rounds: [
        {
          number: 1,
          name: "Tug of Aura",
          tag: "Digital Tug-of-War",
          description:
            "Teams Alpha and Omega (assigned by organizers from registered pairs) compete live. Every coding challenge solved pulls the rope toward their side, so speed, accuracy and teamwork control the system's Kinetic Force.",
        },
        {
          number: 2,
          name: "Who's the GOAT?",
          tag: "Crack the Code",
          description:
            "A terminal-style environment where participants get only input and output test cases and no problem statement. Teams reverse-engineer the logic and write the correct algorithm within a strict time limit.",
          // Label the terminal preview as "example"
          terminalExample: {
            isExample: true,
            title: "Black-Box Problem #04 (Example)",
            sampleInput: "[12, 5, 8, 19, 3]",
            sampleOutput: "39",
            hint: "Input constraints: O(N) required. Reverse-engineer the mapping.",
          },
        },
      ],
      // PLACEHOLDER: confirm with organizers
      rules: [
        "Teams must have between 2 and 4 members.",
        "Round 1 kinetic force is calculated based on test cases passed vs submission latency.", // PLACEHOLDER: confirm with organizers
        "Round 2 submissions are verified against hidden stress test suites.", // PLACEHOLDER: confirm with organizers
        "Results and prize distribution take place immediately following at 2:30 PM.",
      ],
      // PLACEHOLDER: confirm with organizers
      prizes: "Prizes & citations announced at 2:30 PM.", // PLACEHOLDER: confirm with organizers
    },
  ],
};
