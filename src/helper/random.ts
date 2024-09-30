
function generateCourseCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        code += characters.charAt(randomIndex)
    }

    return code
}
export default {
    generateCourseCode
}