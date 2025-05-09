
export function playSound(src, volume = 1.0) {
    const audio = new Audio(src)
    audio.volume = volume
    audio.play().catch(() => {
        // Autoplay block is fine — it’ll work after user interacts
    })
}
