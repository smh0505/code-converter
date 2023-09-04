const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const encode = (input: string) => {
    return btoa(String.fromCharCode(...encoder.encode(input)))
}

export const decode = (input: string) => {
    try {
        return decoder.decode(Uint8Array.from(atob(input), c => c.charCodeAt(0)))
    } catch {
        return "Error: Cannot be decoded."
    }
}
