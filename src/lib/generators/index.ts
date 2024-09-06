export function generatePassword(length = 12) {
    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let password = ''

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return password
}

export function generateUsername(prefix = 'user', length = 8) {
    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let username = prefix + '_'

    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return username
}
