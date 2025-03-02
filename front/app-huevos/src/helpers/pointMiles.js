
export const pointMiles = (num) => {
    const miles = parseInt(num / 1000)
    const numStr = String(parseInt(num))

    return `${miles}.${numStr.slice(numStr.indexOf(miles) + String(miles).length)}`
}
