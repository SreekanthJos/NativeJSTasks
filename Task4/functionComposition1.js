function compose() {
    var funcs=arguments;
    return function(){
    var args=arguments;
   for(var i=funcs.length-1; i>=0;i--){
   args=[funcs[i].apply(null,args)];
   }
   return args[0];
 }
}