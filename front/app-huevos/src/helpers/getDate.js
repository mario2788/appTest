


export const getDate = (date) => {

    const d = new Date(date).toUTCString()

    const dayName = {
        'Mon': 'L',
        'Tue': 'M',
        'Wed': 'MM',
        'Thu': 'J',
        'Fri': 'V',
        'Sat': 'S',
        'Sun': 'D'

    }[d.split(',')[0]] // "Sat"
    const MonthDayNum = d.split(',')[1].split(' ').slice(1, 3).reverse().join(' ') // "Feb 01"
    const hora = d.split(',')[1].split(' ')[4].split(':').slice(0, 2).join(':') // "15:05"

    return `${dayName} - ${hora} - ${MonthDayNum}` // L - 15:05 - Feb 01
}