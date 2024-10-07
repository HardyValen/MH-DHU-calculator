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

function bufferCalcEvent(timeoutID, DOMObjects) {
  return function(e) {
    if (timeoutID) { clearTimeout(timeoutID); }
    timeoutID = setTimeout(printProbabilityTable(DOMObjects), 400);
  }
}

function printProbabilityTable({inputProbabilityDOM, occurrenceDOM, outputDOM}) {
    return function() {
      let i1 = inputProbabilityDOM.value / 100;
      let i2 = occurrenceDOM.value;
      let probMap = [];

      probMap = probArray(i1, i2);

      let outputRows = [];
      probMap.forEach((prob, x) => {
        prob = prob * 100
        if (prob.toFixed(2) >= 0.01) {
          outputRows.push(`
            <tr id="tr_prob_check-${x}">
              <td>${x} / ${i2}</td>
              <td>${prob.toFixed(2)} %</td>
              <td>${(100 - prob).toFixed(2)} %</td>
              <td><input type="checkbox" id="prob_check-${x}" disabled></input></td>
            </tr>
          `) 
        }        
      })
      if (outputRows.length > 0) {
        outputDOM.innerHTML = `
          <table id="probability_table">
            <tr>
              <th>Trials</th>
              <th>Success Rate</th>
              <th>Failure Rate</th>
              <th>Selection</th>
            </tr>
            ${outputRows.join("")}
          </table>
        `
      } else {
        outputDOM.innerHTML = ``
      }
    }
}

function main() {
  let DOMObjects = {
    inputProbabilityDOM : document.querySelector("#input_p1"),
    occurrenceDOM       : document.querySelector("#input_occurrence"),
    outputDOM           : document.querySelector("#output"),
  }
  let timeoutID;

  DOMObjects.inputProbabilityDOM.addEventListener("input", bufferCalcEvent(timeoutID, DOMObjects));
  DOMObjects.occurrenceDOM.addEventListener("input", bufferCalcEvent(timeoutID, DOMObjects));

  // let probCheckDOM = document.querySelector("#tr_prob_check-3");
  // probCheckDOM.addEventListener("click", (e) => {
  //   document.querySelector("#prob_check-3").checked = !document.querySelector("#prob_check-3").checked
  // })
}