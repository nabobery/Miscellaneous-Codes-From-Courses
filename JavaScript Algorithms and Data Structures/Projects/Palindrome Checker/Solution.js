function palindrome(str) {
    let left = 0, right = str.length - 1;
    let regex = /[a-zA-Z0-9]/;
    while(right - left >= 1){
      let a = str[left], b = str[right];
      if(regex.test(a) && regex.test(b)){
        a = a.toLowerCase();
        b = b.toLowerCase();
        if(a != b) return false;
        left++, right--;
      }
      else{
        if(!regex.test(a)) left++;
        else if(!regex.test(b)) right--;
        else{
          left++;
          right--;
        }
      }
    }
    return true;
  }
  
palindrome("eye");