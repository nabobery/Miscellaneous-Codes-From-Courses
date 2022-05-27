const mp = new Map();
mp.set("PENNY", 0.01);
mp.set("NICKEL", 0.05);
mp.set("DIME", 0.10);
mp.set("QUARTER", 0.25);
mp.set("ONE", 1.00);
mp.set("FIVE", 5.00);
mp.set("TEN", 10.00);
mp.set("TWENTY", 20.00);
mp.set("ONE HUNDRED", 100.00);

function checkCashRegister(price, cash, cid) {
  let change = [];
  let c = cash - price;
  let temp = 0;
  for(let i = 0; i < cid.length;i++){
    temp += cid[i][1];
  }
  temp = temp.toFixed(2);
  if(c > temp) return {status: "INSUFFICIENT_FUNDS", change: change};
  else if(temp == c.toFixed(2)){
    return {status: "CLOSED", change: cid};
  }
  else{
    for(let i = cid.length - 1; i >= 0;i--){
      let t = [cid[i][0], 0];
      while(c >= mp.get(cid[i][0]) && cid[i][1] > 0){
        t[1] += mp.get(cid[i][0]);
        cid[i][1] -= mp.get(cid[i][0]);
        c -= mp.get(cid[i][0]);
        c = c.toFixed(2);
      }
      if(t[1] > 0) change.push(t);
    }
  }
  if(c > 0){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  return { status: "OPEN", change: change};
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));