const getSumOfArray = (array, startValue = 0)=> array.reduce((accumulator, currentValue) => accumulator +
  currentValue, startValue);

const getOffers = (dataOffers) => dataOffers.map((item)=>item.offers);

export{getSumOfArray, getOffers};

