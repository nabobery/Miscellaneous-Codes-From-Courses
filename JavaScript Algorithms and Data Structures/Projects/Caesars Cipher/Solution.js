function rot13(str) {
  let regex = /[A-Z]/;
  let arr = [...str];
  for(let i = 0; i < arr.length;i++){
    if(regex.test(arr[i])){
      let t = str.charCodeAt(i);
      if(t >= 78 && t <= 90) arr[i] = String.fromCharCode(t - 13);
      else if(t >= 65 && t < 78) arr[i] = String.fromCharCode(t + 13);
    }
  }
  let result = arr.join('');
  return result;
}

console.log(rot13("SERR PBQR PNZC"));