// return the nested property value if it exists,
// otherwise return undefined
Object.prototype.hash = function(key) {
  var property=this;
var parts=key.split('.');

for(var i=0;i<parts.length;i++)
{
if(property===undefined)
return;
property=property[parts[i]];

}
return property;
}

