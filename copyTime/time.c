// const ele = document.createElement('input');
// const text = `${new Date().format('YYYY年MM月DD日 HH时mm分ss秒')} `
// ele.value = text;
// document.getElementsByTagName('body')[0].appendChild(ele);
// ele.select();
// document.execCommand('Copy');
// ele.remove();

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <Windows.h>
#include <time.h>
#include <stringapiset.h>

char *formatTime(char *str);
char *toUtf8(char *in, char *out);
void addZero(char *str, int length);
int main(int argc, char *argv[])
{
    char formatTimeStr[100] = {'\0'};
    char formatTimeStrUtf16[100] = {'\0'};
    formatTime(formatTimeStr);

    MultiByteToWideChar(CP_UTF8, 0, formatTimeStr, -1, formatTimeStrUtf16, 100);         // 将utf8字符串转为UTF16
    WideCharToMultiByte(936, 0, formatTimeStrUtf16, -1, formatTimeStr, 100, NULL, NULL); // 将UTF16转为gb2312

    HGLOBAL hMemory;
    LPTSTR lpMemory;
    char *content = formatTimeStr; // 待写入数据
    int contentSize = strlen(content) + 1;
    if (!OpenClipboard(NULL)) // 打开剪切板，打开后，其他进程无法访问
    {
        puts("剪切板打开失败");
        return 1;
    }
    if (!EmptyClipboard()) // 清空剪切板，写入之前，必须先清空剪切板
    {
        puts("清空剪切板失败");
        CloseClipboard();
        return 1;
    }
    if ((hMemory = GlobalAlloc(GMEM_MOVEABLE, contentSize)) == NULL) // 对剪切板分配内存
    {
        puts("内存赋值错误!!!");
        CloseClipboard();
        return 1;
    }
    if ((lpMemory = (LPTSTR)GlobalLock(hMemory)) == NULL) // 将内存区域锁定
    {
        puts("锁定内存错误!!!");
        CloseClipboard();
        return 1;
    }
    memcpy_s(lpMemory, contentSize, content, contentSize); // 将数据复制进入内存区域
    GlobalUnlock(hMemory);                                 // 解除内存锁定
    if (SetClipboardData(CF_TEXT, hMemory) == NULL)
    {
        puts("设置剪切板数据失败!!!");
        CloseClipboard();
        return 1;
    }
    // system("pause");
    return 0;
}

char *formatTime(char *str)
{
    strcpy(str, "2021年12月15日 10时41分00秒");
    char tempStr[4] = {'\0'};
    SYSTEMTIME st;
    GetLocalTime(&st);
    itoa(st.wYear, &tempStr, 10);
    addZero(&tempStr, 4);
    for (int i = 0, j = 0; i < sizeof tempStr && j <= 3; i++, j++)
    {
        str[j] = tempStr[i];
    }
    itoa(st.wMonth, &tempStr, 10);
    addZero(&tempStr, 2);
    for (int i = 0, j = 7; i < sizeof tempStr && j <= 8; i++, j++)
    {
        str[j] = tempStr[i];
    }
    itoa(st.wDay, &tempStr, 10);
    addZero(&tempStr, 2);
    for (int i = 0, j = 12; i < sizeof tempStr && j <= 13; i++, j++)
    {
        str[j] = tempStr[i];
    }
    itoa(st.wHour, &tempStr, 10);
    addZero(&tempStr, 2);
    for (int i = 0, j = 18; i < sizeof tempStr && j <= 19; i++, j++)
    {
        str[j] = tempStr[i];
    }
    itoa(st.wMinute, &tempStr, 10);
    addZero(&tempStr, 2);
    for (int i = 0, j = 23; i < sizeof tempStr && j <= 24; i++, j++)
    {
        str[j] = tempStr[i];
    }
    itoa(st.wSecond, &tempStr, 10);
    addZero(&tempStr, 2);
    for (int i = 0, j = 28; i < sizeof tempStr && j <= 29; i++, j++)
    {
        str[j] = tempStr[i];
    }

    return str;
}

void addZero(char *str, int length)
{
    int strLen = strlen(str);
    char *tempStr = (char *)malloc(sizeof(char) * length);
    for (int i = 0; i < 4; i++)
    {
        tempStr[i] = '0';
    }
    tempStr[4] = '\0';
    for (int i = 0; i < strLen; i++)
    {
        tempStr[length - i - 1] = str[strLen - i - 1];
    }
    strcpy(str, tempStr);
}
