export const buttonEvents = [
    {
        label: "Beg for Autographs",
        tagline: "congrats on getting THE Trendon Watford's signature!",
        tier: "low",
        outcomes: [{ chance: 1.0, effect: { hype: 5 } }]
    },
    {
        label: "Blow Kiss at Kelly Oubre",
        tagline: "omg bro he winked at me i swear 😳",
        tier: "low",
        outcomes: [{ chance: 1.0, effect: { hype: 4 } }]
    },
    {
        label: "Sneak Down to Courtside Row?",
        tagline: "you got a selfie with Mr. Clippy... 😳😳",
        tier: "low",
        outcomes: [{ chance: 1.0, effect: { regret: -3 } }]
    },
    {
        label: "Flirt with Mascot?",
        tagline: "it’s getting weird but you’re committed.",
        tier: "low",
        outcomes: [{ chance: 1.0, effect: { hype: 3 } }]
    },
    {
        label: "Nachos?",
        tagline: "yum! drops them",
        tier: "low",
        outcomes: [{ chance: 1.0, effect: { money: -5 } }]
    },
    {
        label: "Beer?",
        tagline: "warm AND expensive <3",
        tier: "low",
        beerLevelRequired: 0,
        outcomes: [{ chance: 1.0, effect: { money: -7, hype: 1 } }]
    },
    {
        label: "Another Beer?",
        tagline: "oh yeah let's go baby",
        tier: "low",
        beerLevelRequired: 1,
        outcomes: [{ chance: 1.0, effect: { hype: 2, money: -6 } }]
    },
    {
        label: "6-Team Parlay?",
        tagline: "unbelievable luck. your mortgage is safe. OR rip to your kid’s tuition.",
        tier: "medium",
        outcomes: [
            { chance: 0.5, effect: { money: 20 } },
            { chance: 0.5, effect: { money: -20 } }
        ]
    },
    {
        label: "Heckle Detroit",
        tagline: "oof. MettaWorldWar2",
        tier: "medium",
        outcomes: [{ chance: 1.0, effect: { regret: 5 } }]
    },
    {
        label: "Post Pics to Insta",
        tagline: "a cool 7 likes 😎",
        tier: "medium",
        outcomes: [{ chance: 1.0, effect: { hype: 2 } }]
    },
    {
        label: "\"LET’S GO [your fav team]\"",
        tagline: "Lakers score! it's always Lakers.",
        tier: "medium",
        outcomes: [{ chance: 1.0, effect: { hype: 1 } }]
    },
    {
        label: "Another Beer?",
        tagline: "yyyEEAH I LUV U LEBRON!!",
        tier: "medium",
        beerLevelRequired: 2,
        outcomes: [{ chance: 1.0, effect: { money: -10, hype: 4 } }]
    },
    {
        label: "Dance Cam!",
        tagline: "boos for your whip and boos your nae nae",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { regret: 8 } }]
    },
    {
        label: "Jumbotron!",
        tagline: "caught u crying",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { regret: 10 } }]
    },
    {
        label: "DM JJ “put me in”",
        tagline: "starters only fam 💀",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { regret: 7 } }]
    },
    {
        label: "Request Trade",
        tagline: "never played in your life (sent to wizards. instant starter)",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { regret: 6, hype: 2 } }]
    },
    {
        label: "FaceTime Your Ex from the Nosebleeds",
        tagline: "“Just wanted you to know I’m courtside.”",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { regret: 9 } }]
    },
    {
        label: "Venmo Devin Booker mid-game",
        tagline: "“Do something.”",
        tier: "high",
        outcomes: [{ chance: 1.0, effect: { money: -15 } }]
    },
    {
        label: "Another Beer?",
        tagline: "\"asd;lnvj2haildshcuiw78asd\"",
        tier: "high",
        beerLevelRequired: 3,
        outcomes: [{ chance: 1.0, effect: { money: -12, regret: 3 } }]
    },
    {
        label: "Another Beer?",
        tagline: "zzzzz",
        tier: "chaotic",
        beerLevelRequired: 4,
        outcomes: [{ chance: 1.0, effect: { regret: 6, hype: -3 } }]
    },
    {
        label: "Moss a Kid for a T-Shirt",
        tagline: "it was XS but whatev",
        tier: "chaotic",
        outcomes: [{ chance: 1.0, effect: { regret: 10, hype: 5 } }]
    },
    {
        label: "Shoplift from the Team Shop",
        tagline: "all you got was a Rudy Gobert jersey :/",
        tier: "fixed",
        outcomes: [{ chance: 1.0, effect: { money: 5, regret: 12, hype: -10 } }]
    }
];
