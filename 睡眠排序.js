/**
 * 
 * @param {Array} dataList 
 * @param {Function} rule 
 * @returns 
 */
function sleepSort (dataList, rule) {
    return new Promise(resolve => {
        let result = []
        for (let i = 0; i < dataList.length; i += 1) {
            setTimeout(() => {
                result.push(dataList[i])
                if (i + 1 >= dataList.length) {
                    resolve(result)
                }
            }, rule(dataList[i]))
        }
    })
}

const dataList = [
    { one: "a", tow: 1 },
    { one: "b", tow: 1 },
    { one: "c", tow: 2 },
    { one: "d", tow: 2 },
    { one: "e", tow: 1 },
    { one: "f", tow: 5 },
    { one: "g", tow: 6 },
    { one: "h", tow: 8 },
    { one: "i", tow: 5 },
    { one: "j", tow: 1000 }
];
sleepSort(dataList, (data) => {
    return data.tow
}).then(v => {
    console.log(v)
})


1244301519  
这也许就是最后的波纹了，这里包含了个人大约价值370多元的图库，想要获得这份秘宝的人，需要解开这古智慧的密文
《01010011010001110100100101001110011000010101011101010110011110010110001001110111==》
提示有三个：
1，最终答案是7位字母，有大小写
2，8位二进制和Base64加密
3，这是Monika教的加密法则哦

01010011 83  S 18   010010
01000111 71  G 6    000110
01001001 73  I 8    001000
01001110 78  N 13   001101
01100001 97  a 26   011010
01010111 87  W 22   010110
01010110 86  V 21   010101
01111001 121 y 50   110010
01100010 98  b 27   011011
01110111 119 w 48   110000


01001000 72  H
01100010 98  b
00001101 13  
01101001 105 
01100101 101 
01110010 114 
01101111 111 
0000