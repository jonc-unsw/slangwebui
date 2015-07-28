int fac(int m)
{
  int fact = 1;
  int c;
  for (c = 1; c <= m; c++)
  {
    fact = fact * c;
  }
  return fact;
}
