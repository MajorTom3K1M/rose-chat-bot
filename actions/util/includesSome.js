module.exports = includesSome = (text, wordList) => {
  let isFound = false
  for (i in wordList) {
      if (text.includes(wordList[i])) {
          isFound = true
          break
      }
  }
  return isFound
}