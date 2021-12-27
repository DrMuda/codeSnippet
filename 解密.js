
// 1244301519  
// 这也许就是最后的波纹了，这里包含了个人大约价值370多元的图库，想要获得这份秘宝的人，需要解开这古智慧的密文
// 《01010011010001110100100101001110011000010101011101010110011110010110001001110111==》
// 提示有三个：
// 1，最终答案是7位字母，有大小写
// 2，8位二进制和Base64加密
// 3，这是Monika教的加密法则哦

/**
 * 
 * @param {String} binString 
 */
function toDec (binString) {
    const decNums = []
    for (let i = 0; i < binString.length; i += 8) {
        const binBit8 = binString.slice(i, i + 8)
        let decNum = 0
        for (let j = binBit8.length - 1; j >= 0; j -= 1) {
            decNum += parseInt(binBit8[j]) * Math.pow(2, binBit8.length - 1 - j)
        }
        decNums.push(decNum)
    }
    return decNums
}

/**
 * 
 * @param {number[]} decNums 
 */
function toBin (decNums) {
    let binStrs = []
    for (let i = 0; i < decNums.length; i += 1) {
        let binStr = ""
        let shang = decNums[i]
        while (shang !== 0) {
            binStr = `${shang % 2}${binStr}`
            shang = parseInt(shang / 2)
        }
        binStrs.push(binStr)
    }
    return binStrs
}

/**
 * 
 * @param {number[]} nums 
 */
function toAsciiStr (nums) {
    let asciiStr = ""
    for (let i = 0; i < nums.length; i += 1) {
        asciiStr = `${asciiStr}${String.fromCharCode(nums[i])}`
    }
    return asciiStr
}

/**
 * 
 * @param {string} str 
 */
function toBase64Num (str) {
    let base64Nums = []
    for (let i = 0; i < str.length; i += 1) {
        switch (str[i]) {
            case "+": {
                base64Nums.push(62)
                break
            }
            case "/": {
                base64Nums.push(63)
                break
            }
            default: {
                base64Nums.push(str[i].charCodeAt() - "A".charCodeAt())
            }
        }
    }
    return base64Nums
}

/**
 * 
 * @param {string[]} binNums 
 */
function addZero (binNums, length) {
    const result = []
    for (let i = 0; i < binNums.length; i += 1) {
        let temp = `${binNums[i]}`
        while (temp.length < length) {
            temp = `0${temp}`
        }
        result.push(temp)
    }
    return result
}


const miWen = "01010011010001110100100101001110011000010101011101010110011110010110001001110111"
const dec = toDec(miWen)
const asciiStr = toAsciiStr(dec)
const base64Num = toBase64Num(asciiStr)
const bin = toBin(base64Num)
const binBit6 = addZero(bin, 6)
const dec2 = toDec(binBit6.join(""))
const asciiStr2 = toAsciiStr(dec2)
console.log({
    miWen,
    dec,
    asciiStr,
    base64Num,
    bin,
    binBit6,
    binStr: binBit6.join(""),
    dec2,
    asciiStr2
})
01001000
01100010
00001101
10000001
01100101
01111000
10000111
01100000
