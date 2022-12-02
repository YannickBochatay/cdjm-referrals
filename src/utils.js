export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function noCaseSensitiveIncludes(str1, str2) {
    return removeAccents(str1.toLowerCase()).includes(
        removeAccents(str2.toLowerCase())
    )
}
  