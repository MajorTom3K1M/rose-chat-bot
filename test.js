function includesSome(text, list) {
  var isFound = false
    list.forEach((element) => {
        if (text.includes(element)) {
          isFound = true
            return
        }
      }
    )
  return isFound

}

console.log(includesSome('product list', ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list']))