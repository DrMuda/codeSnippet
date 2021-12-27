/*
 * @Author: LXX
 * @Date: 2021-10-09 17:09:55
 * @LastEditTime: 2021-10-11 09:49:09
 * @LastEditors: LXX
 * @Description: 
 * @FilePath: \c\test.c
 */
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int t = 0;
    // char binaryLength = 8;
    // char binary = (char *)malloc(binaryLength * sizeof(char));
    char binary[8];
    printf("多少个数字\n");
    scanf("%d", &t);
    int number[t];
    // for (int i = 0; i < t; i++)
    // {
    //     printf("第%d个数字\n", i);
    //     scanf("%d", &number[i]);
    // }
    // for (int i = 0; i < t; i++)
    // {
    //     char binary[8] = toBinary(number[i]);
    // }
    // itoa(number[0], binary, 2);
    itoa(15,binary, 2);
    printf("%s", binary);
    return 0;
}

// char *toBinary(int num)
// {
//     char binaryLength = 1;
//     char binary = (char *)malloc(binaryLength * sizeof(char));
//     for (int i = 0; num > 0; i++)
//     {
//     }
//     return binary;
// }
