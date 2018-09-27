export const capitalize = str => str.replace(/^\w/g, l => l.toUpperCase())
export const normalizePhoneNumber = str => str.replace(/\D/g, '')
