// http://www.codewars.com/kata/extract-file-name/
class FileNameExtractor {
    static extractFileName(s) {
        let regEx = /^\d+_(.*)?\..*$/
        let match = regEx.exec(s)
        return match[1]
    }
}

let ans = FileNameExtractor.extractFileName(
    '1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION'
)
console.log(ans)