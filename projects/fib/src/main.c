#include <stdio.h>
#include "fac.h"
#include "fib.h"

int main(int argc, char* argv[])
{
  int a1 = fac(10);
  int b1 = fib(10);

  printf("fac: %d\n", a1);
  printf("fib: %d\n", b1);

  int c1 = 0;
  int d1[100] = {0};
  while( b1 < a1 )
  {
    b1 = fib(b1);
    d1[c1++] = b1;
  }
  printf("foo: %d\n", c1);

  return 0;
}
