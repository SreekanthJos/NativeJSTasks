function prefill(n, v) {
    if ((/^\d+$/).test(n)) {
        var ar = [],
            counter = 0;
        return (function pfill() {
            if (counter < n) {
                counter++;
                ar.push(v);
                pfill();
            }
            return ar;
        })();
    }
    else
        throw new TypeError(n + ' is invalid')
}