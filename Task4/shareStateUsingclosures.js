var Cat = (function() {
    var totalWeight = 0,
        counter = 0;

    function Cat(name, weight) {
        if (!name && !weight)
            throw new Error();
        this.name = name;
        this.weight = weight;
        counter++;
        totalWeight = totalWeight + this.weight;
    }
     Object.defineProperty(this, 'weight', {
      get: function () {
        return this.weight || 0;
      },
      set: function (val) {
        totalWeight = totalWeight - this.weight + val;
         return this.weight = val;
      }
    });

    Cat.averageWeight = function() {
        return totalWeight / counter;
    }
    return Cat;
}());