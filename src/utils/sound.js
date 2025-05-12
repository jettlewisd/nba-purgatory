export function playSound(src, volume = 1.0) {
    setTimeout(() => {
        const audio = src instanceof Audio ? src.cloneNode() : new Audio(src)
        audio.volume = volume
        audio.play().catch(() => {
            // Autoplay block is fine
        })
    }, 0)
}

export function fadeOutSound(audio, duration = 1000) {
    const step = 50
    const volumeStep = audio.volume / (duration / step)

    const fade = setInterval(() => {
        if (audio.volume > volumeStep) {
            audio.volume = Math.max(0, audio.volume - volumeStep)
        } else {
            audio.volume = 0
            audio.pause()
            clearInterval(fade)
        }
    }, step)
}

