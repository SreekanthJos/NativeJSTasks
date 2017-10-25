function digit(val) {
    return function (func) {
        return func ? func(val) : val;
    }
}
var zero = digit(0),
 one = digit(1),
 two = digit(2)
 three = digit(3)
 four = digit(4),
 five = digit(5),
 six = digit(6),
 seven = digit(7),
 eight = digit(8),
 nine = digit(9);

function plus(b) {
    return function (a) { return a + b; }
}
function minus(b) {
    return function (a) { return a - b; }
}
function times(b) {
    return function (a) { return a * b }
}
function dividedBy(b) {
    return function (a) { return a / b; }
}
