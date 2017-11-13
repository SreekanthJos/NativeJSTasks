function cache(func){
    var cacheResult={};
    return function(){
     var args = JSON.stringify(arguments);
    if(cacheResult.hasOwnProperty(args)) return cacheResult[args];
    else return cacheResult[args]=func.apply(null,arguments);
     }
 }