/*
 * @Author: LXX
 * @Date: 2021-11-30 13:35:02
 * @LastEditTime: 2021-11-30 17:07:23
 * @LastEditors: LXX
 * @Description: 
 * @FilePath: \test\test.c
 */
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int gcd(int hight, int lower);

int main()
{

    long n = 5000;

    DWORD start, stop;
    start = GetTickCount();
    long sum = 0;
    for (int i = 1; i <= n; i += 1)
    {
        for (int j = i; j <= n; j += 1)
        {
            sum += i > j ? gcd(i, j) : gcd(j, i);
        }
    }
    stop = GetTickCount();
    printf("n: %d, sum: %ld, 耗时%d毫秒\n", n, sum, stop - start);

    return 0;
}

int gcd(int number1, int number2)
{
    return number1 % number2 ? gcd(number2, number1 % number2) : number2;
}