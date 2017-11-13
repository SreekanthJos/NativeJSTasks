function compose(f,g) {
    // Compose the two functions here!
    return function(){
    return f(g.apply(null,arguments));
  }
  }