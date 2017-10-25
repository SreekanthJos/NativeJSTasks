function createFunctions(n){
    var callbacks = [];
    for (var i = 0; i < n; i++) {
        var func = ((i) => () => i)(i);
        callbacks.push(func);
    }
    return callbacks;
}
