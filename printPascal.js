function binomial(n, k) {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k > n || k < 0 || n < 0) return 0;
  if (k == 0 || k == n) return 1;
  if (k == 1 || n - k == 1) return n;

  let res = n;

  for (let i = 2; i <= Math.min(k, n - k); i++) {
    res *= (n - i + 1) / i;
  }

  return Math.round(res);
}

function generatePascalTriangle(n) {
  if (Number.isNaN(n)) return NaN;
  if (n < 0) return [];
  
  let arr = [];
  for (i = 0; i <= n; i++) {
    let subArr = [];
    for (j = 0; j <= i; j++) {
      subArr.push(binomial(i, j));
    }
    arr.push(subArr);
  }

  return arr;
}

function printPascalTriangle(n) {
  let pascalTriangleArray = generatePascalTriangle(n);
  pascalTriangleArray.forEach(subArr => {
    let rowString = subArr.join(' ');
    console.log(rowString);
  })
}

printPascalTriangle(20)