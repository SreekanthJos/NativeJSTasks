function rentalCarCost(d) {  
   var dayCost=40;
   var totalCost = (d * dayCost);

    if(d>=7)
    totalCost -= 50;
        if(d>=3)
        totalCost -= 20;
    return totalCost;
  }