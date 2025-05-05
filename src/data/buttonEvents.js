export const buttonEvents = [

    {
        label: "Post Pics to Insta",
        tagline: "a cool 7 likes 😎",
        tier: "low",
        outcomes: [
            { chance: 0.8, effect: { hype: 5, regret: -5 } },
            { chance: 0.2, effect: { hype: -5, regret: 5 } }
        ]
    },
    {
        label: "Dance Cam!",
        tier: "low",
        outcomes: [
            {
                chance: 0.8,
                effect: { hype: 5, regret: -5 },
                tagline: "the crowd loves when you dab"
            },
            {
                chance: 0.2,
                effect: { hype: -5, regret: 5 },
                tagline: "boos for your whip and boos your nae nae"
            }
        ]
    },
    {
        label: "Jumbotron!",
        tier: "low",
        outcomes: [
            {
                chance: 0.8,
                effect: { hype: 5, regret: -5 },
                tagline: "you made it on SportsCenter 🤩 (but boss knows you skipped work)"
            },
            {
                chance: 0.2,
                effect: { hype: -5, regret: 5 },
                tagline: "caught u crying"
            }
        ]
    },
    {
        label: "DM JJ “put me in”",
        tier: "medium",
        outcomes: [
            {
                chance: 0.6,
                effect: { hype: 10, regret: -10 },
                tagline: "ignored. probably for the best though."
            },
            {
                chance: 0.4,
                effect: { hype: -10, regret: 10 },
                tagline: "starters only fam 💀"
            }
        ]
    },
    {
        label: "Flirt with Mascot?",
        tier: "medium",
        outcomes: [
            {
                chance: 0.6,
                effect: { hype: 10, regret: -10 },
                tagline: "it’s getting weird but you’re committed."
            },
            {
                chance: 0.4,
                effect: { hype: -10, regret: 10 },
                tagline: "you're not their type. maybe next time will be different."
            }
        ]
    },
    {
        label: "Request Trade",
        tier: "high",
        outcomes: [
            {
                chance: 0.35,
                effect: { hype: 20, regret: -20 },
                tagline: "never played in your life (sent to wizards. instant starter)"
            },
            {
                chance: 0.65,
                effect: { hype: -20, regret: 20 },
                tagline: "tryouts were yesterday"
            }
        ]
    },
    {
        label: "Beg for Autographs",
        tier: "high",
        outcomes: [
            {
                chance: 0.35,
                effect: { hype: 20, regret: -20 },
                tagline: "congrats on getting THE Trendon Watford's signature!"
            },
            {
                chance: 0.65,
                effect: { hype: -20, regret: 20 },
                tagline: "congrats on getting THE Trendon Watford's signature!"
            }
        ]
    },
    {
        label: "6-Team Parlay?",
        tier: "chaotic",
        outcomes: [
            {
                chance: 0.2,
                effect: { money: 50, hype: 35, regret: -30 },
                tagline: "unbelievable luck. your mortgage is safe."
            },
            {
                chance: 0.8,
                effect: { money: -50, hype: -35, regret: 30 },
                tagline: "rip to your kid’s tuition."
            }
        ]
    },
    {
        label: "Sneak Down to Courtside Row?",
        tier: "chaotic",
        outcomes: [
            {
                chance: 0.2,
                effect: { hype: 30, regret: -30 },
                tagline: "you got a selfie with Mr. Clippy!... 🫦🫦"
            },
            {
                chance: 0.8,
                effect: { hype: -30, regret: 30 },
                tagline: "Adam snitched 😐 sent back to the nosebleeds via t-shirt cannon"
            }
        ]
    },
    {
        label: "Blow Kiss at Kelly Oubre",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { hype: 5, regret: -5 },
                tagline: "he winked at me 🫦"
            }
        ]
    },
    {
        label: "“LETS GO [your fav team]”",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { hype: 3, regret: -3 },
                tagline: "LAKERS score!"
            }
        ]
    },
    {
        label: "Nachos?",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -5, hype: 3, regret: 2 },
                tagline: "yum! drops them"
            }
        ]
    },
    {
        label: "Venmo Devin Booker – \"Do something\"",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -5, hype: -20, regret: 15 },
                tagline: "*brick*"
            }
        ]
    },
    {
        label: "Heckle Detroit",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: 20, hype: -20, regret: +15 },
                tagline: "oof. MettaWorldWar2"
            }
        ]
    },
    {
        label: "Moss a Kid for a T-Shirt",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: 5, hype: 10, regret: 10 },
                tagline: "it was XS but whatev"
            }
        ]
    },
    {
        label: "Shoplift from the Team Shop",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: 10, hype: -10, regret: 5 },
                tagline: "all you got was a Rudy Gobert jersey :/"
            }
        ]
    },
    {
        label: "Beer?",
        tier: "fixed",
        beerLevelRequired: 0,
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -3, hype: 3 },
                tagline: "warm AND expensive <3"
            }
        ]
    },
    {
        label: "Another Beer?",
        tier: "fixed",
        beerLevelRequired: 1,
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -3, hype: 4, regret: -5 },
                tagline: "oh yeah let's go baby"
            }
        ]
    },
    {
        label: "Another Beer?",
        tier: "fixed",
        beerLevelRequired: 2,
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -3, hype: 5, regret: -5 },
                tagline: "yyyEEAH I LUV U LEBRON!!"
            }
        ]
    },
    {
        label: "Another Beer?",
        tier: "fixed",
        beerLevelRequired: 3,
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -3, hype: 4, regret: 7 },
                tagline: "asd;lnvj2haildshcuiw78asd"
            }
        ]
    },
    {
        label: "Another Beer?",
        tier: "chaotic",
        beerLevelRequired: 4,
        outcomes: [
            {
                chance: 0.3,
                effect: { money: -3, hype: 8, regret: -10 },
                tagline: "zzzzz"
            },
            {
                chance: 0.7,
                effect: { money: -3, hype: -12, regret: 12 },
                tagline: "phone = lost"
            }
        ]
    }

];








/*
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
*/
