#include <stdio.h>

int main(){

    int a[200] = {0};
    int b[100] = {3};
    int c[100] = {0};
    int i;
    for( i=0; i < 100; i++)
    {
        a[2*i]=b[i];
        c[i]=a[4*i+1];
    }

    return 0;
}
