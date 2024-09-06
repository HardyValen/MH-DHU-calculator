const uniBlackCircle = '&#x2B24;'
const uniEmptyCircle = '&#x25EF;'

main();

function binomial(n, k) {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k > n || k < 0 || n < 0) return 0;
  if (k == 0 || k == n) return 1;
  if (k == 1 || n - k == 1) return n;

  let res = n;

  for (let i = 2; i <= Math.min(k, n - k); i++) {
    res *= (n - i + 1) / i;
  }

  return res;
}

// todo list: 
function probArray(p1, n) {
  if (n < 1) return [];
  if (p1 < 0 || p1 > 1) return [];
  
  if (p1 == 0 || p1 == 1) {
    let arr = new Array(Number.parseInt(n) + 1).fill(0);
    switch (p1) {
      case 0:
        arr[0] = 1;
        break;
      case 1:
        arr[n] = 1;
        break;
    }
    return arr;
  }
  
  let p2 = 1 - p1;
  let arr = [];
  for (let k = 0; k <= n; k++) {
    let pValue = binomial(n, k) * (p1 ** k) * (p2 ** (n - k));
    arr.push(pValue); 
  }

  return arr;
}

function generateBulletString(x, y) {
  let strArr = [];
  for(let i = 1; i <= y; i++) {
    if (i <= x) {
      strArr.push(uniBlackCircle)
    } else {
      strArr.push(uniEmptyCircle)
    }
  }
  return strArr.join(' ')
}

function main() {
  const DOMCalculateButton = document.getElementById("input_calculate");
  DOMCalculateButton.onclick = function() {
    let i1 = document.getElementById("input_p1").value / 100;
    let i2 = document.getElementById("input_occurrence").value;
    let outputDOM = document.getElementById("output");
    let probMap = [];

    probMap = probArray(i1, i2);

    let outputString = [];
    probMap.forEach((prob, x) => {
      prob = prob * 100
      // outputString.push(`<span>${generateBulletString(x, i2)} | ${prob.toFixed(3)} %</span>`)
      if (prob.toFixed(3) >= 0.01) {
        outputString.push(`<span>${x} / ${i2} | ${prob.toFixed(3)} %</span>`) 
      }
      
    })
    outputDOM.innerHTML = outputString.join("<br>")
  }
}