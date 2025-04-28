

export const buttonEvents = [
    {
        label: "Get a Beer?",
        cost: 5,
        outcomes: [
            { chance: 0.6, effect: { hype: +3 } },
            { chance: 0.4, effect: { hype: -10 } },
        ],
    },
    {
        label: "Buy Nachos?",
        cost: 5,
        outcomes: [
            { chance: 0.7, effect: { hype: +3 } },
            { chance: 0.3, effect: { regret: +5 } },
        ],
    },
    {
        label: "Take a Selfie with Celebrity!",
        outcomes: [
            { chance: 0.9, effect: { regret: -10 } },
            { chance: 0.1, effect: { regret: +5 } },
        ],
    },
    {
        label: "Start 'Fire Nico!' Chant!",
        outcomes: [
            { chance: 1.0, effect: { hype: +20 } },
        ],
    },
    {
        label: "Ask Clippy for Advice?",
        outcomes: [
            { chance: 0.5, effect: { hype: +5 } },
            { chance: 0.5, effect: { regret: +5 } },
        ],
    },
    {
        label: "Cheer for Your Team!",
        outcomes: [
            { chance: 0.8, effect: { hype: +10 } },
            { chance: 0.2, effect: {} },
        ],
    },
    {
        label: "Buy Team Merch?",
        cost: 10,
        outcomes: [
            { chance: 0.7, effect: { hype: +3 } },
            { chance: 0.3, effect: { regret: +5 } },
        ],
    },
];
