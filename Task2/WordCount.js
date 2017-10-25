function countWords(str) {
  var words=str.trim().split(/\s+/);
  var result=words.filter(
    function(val){
      return val;
    });
  return result.length;
}
