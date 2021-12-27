function myQuickSort (dataList, rule) {
    if (dataList instanceof Array && rule instanceof Function) {
        let left = 0;
        let right = dataList.length - 1;
        if (dataList.length <= 1) {
            return dataList;
        } else {
            let x = dataList[left]; // 首先取出一个基准数
            // left和right初始在最左和最右，随着算法的进行，会逐渐靠拢，当两个数相等时，停止这一轮的排序
            while (left < right) {
                // 首先，right向左移动，逐个比较是否小于基准数，小于则放在原基准数的位置，即较小的数放左边（升序）
                // 此时right 的位置相当于空置的
                while (left < right && rule(dataList[right], x) >= 0) {
                    // dataList[right] >= x
                    right -= 1;
                }
                if (left < right) {
                    dataList[left] = dataList[right];
                    left += 1;
                }
                // 然后left再向右移动，大于基准数的放右边right的位置
                while (left < right && rule(dataList[left], x) <= 0) {
                    // dataList[left] <= x
                    left += 1;
                }
                if (left < right) {
                    dataList[right] = dataList[left];
                    right -= 1;
                }
                // 再然后基准数原位置放入，结束这一轮的排序， 此时在这个位置左边都是较小的数，右边都是较大的数
                // 如果左右指针还没靠拢，则继续排序
                dataList[left] = x;
            }
            // 在当前left和right这个位置分为左右两份，以及当前位置本身，对左右两份再排序，然后拼在一起
            return [...myQuickSort(dataList.slice(0, left), rule), x, ...myQuickSort(dataList.slice(left + 1), rule)];
        }
    }
    return dataList
}
const dataList = [
    { one: "a", tow: 1 },
    { one: "b", tow: 2 },
    { one: "c", tow: 1 },
    { one: "d", tow: 6 },
    { one: "e", tow: 4 },
    { one: "f", tow: 14 },
    { one: "g", tow: 10 },
    { one: "h", tow: 5 },
    { one: "i", tow: 7 },
    { one: "j", tow: 4 }
];
console.log(myQuickSort(dataList, (a, b) => {
    return a.tow - b.tow
}))