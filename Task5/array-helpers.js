
Array.prototype.square=function(){    
    return this.map(function(x){
        return Math.pow(x,2);
    });
}
Array.prototype.cube=function(){    
    return this.map(function(x){
        return Math.pow(x,3)
    });
}
Array.prototype.average=function(){
     if(this.length==0) return NaN;
    return this.sum()/this.length;
}

Array.prototype.sum=function(){
    
    return this.reduce(function(sum,x) {return sum+x});  
}

Array.prototype.even=function(){    
    return this.filter(function(x){
         return x%2==0; 
    });
}
Array.prototype.odd=function(){    
    return this.filter(function(x){
         return x%2!=0; 
    });
}