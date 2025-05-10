export const buttonEvents = [

    {
        label: "Post Pics to Insta",
        tier: "low",
        outcomes: [
            {
                chance: 0.8,
                effect: { hype: 5, regret: -5 },
                tagline: "a cool 7 likes 😎",
                sound: "mr-pbh-ooo-wee.mp3"
            },
            {
                chance: 0.2,
                effect: { hype: -5, regret: 5 },
                tagline: "you tagged your ex by accident 💀",
                sound: "mr-pbh-ha-haa.mp3"
            }
        ]
    },
    {
        label: "Dance Cam!",
        tier: "low",
        outcomes: [
            {
                chance: 0.7,
                effect: { hype: 5, regret: -5 },
                tagline: "the crowd loves when you dab",
                sound: "wow.mp3"
            },
            {
                chance: 0.3,
                effect: { hype: -5, regret: 5 },
                tagline: "boos your nae nae",
                sound: "nae-nae.mp3"
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
                tagline: "you made it on ESPN 🤩 (boss knows you skipped work)",
                sound: "travis-omg.mp3"
            },
            {
                chance: 0.2,
                effect: { hype: -5, regret: 5 },
                tagline: "caught u crying",
                sound: "mr-pbh-ha-haa.mp3"
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
                tagline: "ignored. probably for the best though.",
                sound: "mr-pbh-we-gonna-be-fine.mp3"
            },
            {
                chance: 0.4,
                effect: { hype: -10, regret: 10 },
                tagline: "starters only fam 💀",
                sound: "bruh.mp3"
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
                tagline: "it’s getting weird but you’re committed.",
                sound: "beavis-hey-baby.mp3"
            },
            {
                chance: 0.4,
                effect: { hype: -10, regret: 10 },
                tagline: "you're not their type. maybe next time will be different",
                sound: "mr-pbh-ha-haa.mp3"
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
                tagline: "never played in your life. *sent to Mavs* (instant starter)",
                sound: "dallas-hank.mp3"
            },
            {
                chance: 0.65,
                effect: { hype: -20, regret: 20 },
                tagline: "tryouts were yesterday",
                sound: "i-am-good-sandler.mp3"
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
                tagline: "congrats on getting THE Trendon Watford's signature!😆",
                sound: "what-r-u-talm-bout-deathnote.mp3"
            },
            {
                chance: 0.65,
                effect: { hype: -20, regret: 20 },
                tagline: "congrats on getting THE Trendon Watford's signature!💀",
                sound: "what-r-u-talm-bout-deathnote.mp3"
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
                tagline: "unbelievable luck. your mortgage is safe",
                sound: "mr-pbh-ooo-wee.mp3"
            },
            {
                chance: 0.8,
                effect: { money: -50, hype: -35, regret: 30 },
                tagline: "rip to your kid’s tuition",
                sound: "light-whole-thing-pointless.mp3"
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
                tagline: "you got a selfie with Mr. Clippy!... 🫦🫦",
                sound: "travis-omg.mp3"
            },
            {
                chance: 0.8,
                effect: { hype: -30, regret: 30 },
                tagline: "Friedland snitched! 😐 sent back to the nosebleeds via t-shirt cannon",
                sound: "what-r-u-talm-bout-deathnote.mp3"
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
                tagline: "he winked back 🫦",
                sound: "shot-4-me.mp3"
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
                tagline: "LAKERS score!",
                sound: "mr-pbh-amen-to-that.mp3"
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
                tagline: "yum! *drops them*",
                sound: "bruh.mp3"
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
                tagline: "*brick*",
                sound: "bricks.mp3"
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
                tagline: "Metta World War 2 🤕",
                sound: "back-up-terry.mp3"
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
                tagline: "it's XS but whatev",
                sound: "mr-pbh-ooo-wee.mp3"
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
                tagline: "all you got was a Gobert jersey :/",
                sound: "light-whole-thing-pointless.mp3"
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



