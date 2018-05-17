function getMiddle (s) {
    const middle = Math.floor((s.length - 1) / 2)
    return (s.length % 2) ? s[middle] : s[middle] + s[middle + 1]
}