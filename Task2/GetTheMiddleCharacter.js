function getMiddle(s)
{
var res = (s.length%2),
midIndex = s.length/2;
return res===0 ? s.substring(midIndex-1,midIndex+1) : s.substring(midIndex,midIndex+1);
}
