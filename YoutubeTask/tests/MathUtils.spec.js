describe('MathUtils', function () {
    var calc;
    beforeEach(function () {
        calc = new MathUtils();
    });

    describe("When calc method got executed", function () {

        beforeEach(function () {
            spyOn(calc, 'sum');
            spyOn(calc, 'multiply');
            spyOn(calc, 'factorial');
        });
        it("Verify sum method execution", function () {
            // res=;
            calc.sum(3, 5);
            expect(calc.sum).toHaveBeenCalled();
            expect(calc.sum).toHaveBeenCalledWith(3, 5);
            // expect(res).toEqual(8);
        });
        it("Verify multiply  method execution", function () {
            calc.multiply(3, 5);
            expect(calc.multiply).toHaveBeenCalled();
            expect(calc.multiply).toHaveBeenCalledWith(3, 5);
        });
        it("Verify factorial  method execution", function () {
            calc.factorial(9);
            expect(calc.factorial).toHaveBeenCalled();
            expect(calc.factorial).toHaveBeenCalledWith(9);
        });

    });

    describe("when calc is used to peform basic math operations", function () {

        it("should be able to calculate sum of 3 and 5", function () {

            expect(calc.sum(3, 5)).toEqual(8);
        });
        it("should be able to multiply 3 and 5", function () {
            expect(calc.multiply(3, 5)).toEqual(15);
        });
        it("should be able to calculate factorial of 9", function () {
            expect(calc.factorial(9)).toEqual(362880);
        });
        it("should be able to throw error in factorial operation when the number is negative", function () {
            expect(function () {
                calc.factorial(-7)
            }).toThrowError(Error);
        });
    });
});