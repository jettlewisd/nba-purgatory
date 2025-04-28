

export const buttonEvents = [
    {
        label: "Beer?",
        cost: 5,
        outcomes: [
            { chance: 0.6, effect: { hype: +3 } },
            { chance: 0.4, effect: { hype: -10 } },
        ],
    },
    {
        label: "Nachos?",
        cost: 5,
        outcomes: [
            { chance: 0.7, effect: { hype: +3 } },
            { chance: 0.3, effect: { regret: +5 } },
        ],
    },
    {
        label: "Take a Selfie with Celeb!",
        outcomes: [
            { chance: 0.9, effect: { regret: -10 } },
            { chance: 0.1, effect: { regret: +5 } },
        ],
    },
    {
        label: "Rage Chant!!",
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
        label: "Cheer on Your Squad!",
        outcomes: [
            { chance: 0.8, effect: { hype: +10 } },
            { chance: 0.2, effect: {} },
        ],
    },
    {
        label: "Buy a Jersey?",
        cost: 20,
        outcomes: [
            { chance: 0.7, effect: { hype: +3 } },
            { chance: 0.3, effect: { regret: +5 } },
        ],
    },
];
