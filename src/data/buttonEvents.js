export const buttonEvents = [

    {
        label: "Post Pics to Insta",
        tier: "low",
        outcomes: [
            {
                chance: 0.8,
                effect: { hype: 5, regret: -5 },
                tagline: "a cool 7 likes 😎"
            },
            {
                chance: 0.2,
                effect: { hype: -5, regret: 5 },
                tagline: "you tagged your ex by accident 💀"
            }
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
                tagline: "boos for your whip, boos your nae nae"
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
                tagline: "you made it on ESPN 🤩 (boss knows you skipped work)"
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
                tagline: "you're not their type. maybe next time will be different"
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
                tagline: "never played in your life *sent to wizards* (instant starter)"
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
                tagline: "congrats on getting THE Trendon Watford's signature!😆"
            },
            {
                chance: 0.65,
                effect: { hype: -20, regret: 20 },
                tagline: "congrats on getting THE Trendon Watford's signature!💀"
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
                tagline: "unbelievable luck. your mortgage is safe"
            },
            {
                chance: 0.8,
                effect: { money: -50, hype: -35, regret: 30 },
                tagline: "rip to your kid’s tuition"
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
                tagline: "Friedland snitched! 😐 sent back to the nosebleeds via t-shirt cannon"
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
                tagline: "he winked back 🫦"
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
                effect: { money: -10, hype: 3, regret: 2 },
                tagline: "yum! *drops them*"
            }
        ]
    },
    {
        label: "Venmo Devin Booker – \"Do something\"",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: -7, hype: -20, regret: 15 },
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
                effect: { money: -12, hype: -20, regret: +15 },
                tagline: "Metta World War 2 🤕"
            }
        ]
    },
    {
        label: "Moss a Kid for a T-Shirt",
        tier: "fixed",
        outcomes: [
            {
                chance: 1.0,
                effect: { money: 1, hype: 10, regret: 10 },
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
                effect: { money: 1, hype: -10, regret: 5 },
                tagline: "all you got was a Gobert jersey :/"
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
                effect: { money: -8, hype: 3 },
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
                effect: { money: -8, hype: 4, regret: -5 },
                tagline: "oh yea let's go baby"
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
                effect: { money: -12, hype: 5, regret: -5 },
                tagline: "yyyEEAH I LUV U JIMMY!!"
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
                effect: { money: -12, hype: 4, regret: 7 },
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
                chance: 0.5,
                effect: { money: -15, hype: 8, regret: -10 },
                tagline: "ZZzzzzzzzz"
            },
            {
                chance: 0.5,
                effect: { money: -15, hype: -12, regret: 12 },
                tagline: "phone = lost"
            }
        ]
    }

];



