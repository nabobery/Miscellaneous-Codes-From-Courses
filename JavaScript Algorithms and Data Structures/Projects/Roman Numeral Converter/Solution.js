const mp = new Map();
mp.set(1, 'I');
mp.set(5, 'V');
mp.set(10, 'X');
mp.set(50, 'L');
mp.set(100, 'C');
mp.set(500, 'D');
mp.set(1000, 'M');

function convertToRoman(num) {
  let result = "";
  let a = [];
  let i  = 0;
  while(num > 0){
    let temp = Math.pow(10,i)*(num % 10);
    a.unshift(temp);
    num /= 10;
    num = Math.floor(num);
    i++;
  }
  console.log(a);
  let n = a.length - 1;
  for(let j = 0; j < a.length; j++){
    let b = a[j]/Math.pow(10,n);
    console.log(b);
    if(mp.has(a[j])) result += mp.get(a[j]);
    else if(b < 4){
      for(let i = 0 ; i < b;i++){
        result += mp.get(Math.pow(10,n));
      }
    }
    else if(b == 4){
      result += (mp.get(Math.pow(10,n)) + mp.get(Math.pow(10,n+1)/2));
    }
    else if(b > 5 && b < 9){
      result += mp.get(Math.pow(10,n+1)/2);
      for(let i = 0; i < b - 5;i++){
        result += mp.get(Math.pow(10,n));
      }
    }
    else{
      result += (mp.get(Math.pow(10,n)) + mp.get(Math.pow(10,n+1)));
    }
    n--;
  }
  return result;
}

console.log(convertToRoman(36));