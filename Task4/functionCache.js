function cache(func){
    var cacheResult={},  
    args = JSON.stringify(arguments);   
    return function(){    
    if(cacheResult.hasOwnProperty(args)) return cacheResult[args];
    else return cacheResult[args]=func.apply(null,arguments);
     }
 }