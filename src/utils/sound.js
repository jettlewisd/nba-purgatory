export function playSound(src, volume = 1.0) {
    setTimeout(() => {
        const audio = new Audio(src)
        audio.volume = volume
        audio.play().catch(() => {
            // Autoplay block is fine
        })
    }, 0)
}
