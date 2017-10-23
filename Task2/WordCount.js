function countWords(str) {
  return str.trim().split(/\s+/).filter(function(val){return val;}).length;
}