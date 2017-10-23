function digit(val) {
    return function (func) {
        return func ? func(val) : val;
    }
}
var zero = digit(0);
var one = digit(1);
var two = digit(2);
var three = digit(3);
var four = digit(4);
var five = digit(5);
var six = digit(6);
var seven = digit(7);
var eight = digit(8);
var nine = digit(9);

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