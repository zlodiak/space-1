APP.helper = {
  randomIntFromInterval: function(minInclusive, maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
  },

  randomIntFromZero: function(maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive));
  }        
};

