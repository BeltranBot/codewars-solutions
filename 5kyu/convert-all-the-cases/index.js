// http://www.codewars.com/kata/convert-all-the-cases/
function camelize (str) {
    return str.replace(/[^a-zA-Z-_]/, '')
        .replace(/[^A-Z]/, c => c.toLowerCase())
        .replace(/[-_][a-z]/g, c => c.toUpperCase())
        .replace(/[-_]/g, c => '')
}

function sneakize (str) {
    return str
        .replace(/[-]/g, '_')
        .replace(/[^a-z_A-Z]/, '')
        .replace(/[A-Z]/g, c => '_' + c.toLowerCase())
}

function kebabize (str) {
    return str
        .replace(/_/g, c => '-')
        .replace(/[^a-zA-Z-]/, '')
        .replace(/[^A-Z]/, c => c.toLowerCase())
        .replace(/[A-Z]/g, c => '-' + c.toLowerCase())
}

function changeCase (identifier, targetCase) {
    if (identifier.length == 0) return identifier
    let a = identifier.indexOf('-') != -1 ? 1 : 0
    let b = identifier.indexOf('_') != -1 ? 1 : 0
    let c = identifier.search(/[A-Z]/) != -1 ? 1 : 0
    if (a + b + c >= 2) return undefined

    switch (targetCase) {
        case 'snake':
            return sneakize(identifier)
            break
        case 'camel':
            return camelize(identifier)
            break
        case 'kebab':
            return kebabize(identifier)
            break
        default:
            return undefined
    }
}
console.log(changeCase('map_to_all', 'kebab'))

