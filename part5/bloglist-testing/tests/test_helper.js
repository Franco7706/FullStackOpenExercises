const isSorted = likeArray => {
  return likeArray.every((currentValue, index, array) => {
    if (index === 0) {
      return true;
    }
    return currentValue >= array[index - 1];
  });
}

module.exports = { isSorted }