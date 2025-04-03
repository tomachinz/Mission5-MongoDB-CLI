const calculateDiscountRate = (age, experience) => {
  let discount_rate = 0;
  let error = "";
  
  // additive discounts
  if (age >= 25) { discount_rate += 5 }
  if (age >= 40) { discount_rate += 5 }
  if (experience >= 5) { discount_rate += 5 }
  if (experience >= 10) { discount_rate += 5 }
  
  // safety checks
  if (discount_rate > 20) { 
    discount_rate = 20;
  } else {
    // error = "hello discount_rate is " + discount_rate;
  }
  if (experience < 1) {
    
  }
  if (age < 21) {
    error = "invalid age";
    discount_rate = 0;
  }
  if (age - experience - 16 < 0) {
    error = "invalid experience";
    discount_rate = 0;
  }
  
  // become percent, avoids division by zero / 100
  discount_rate *= 0.01; 

  if (typeof age == "undefined") { 
    error = "error: need age and driving experience in years";
  }
  return { 
    discount_rate: discount_rate, 
    error: error 
  };
};

module.exports = calculateDiscountRate;
