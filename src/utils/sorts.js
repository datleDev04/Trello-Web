// Hàm sắp xếp thứ tự của mảng với 3 tham số
// originalArray: mảng cần được sắp xếp
// orderArray : mảng dùng để sắp xếp theo
// key: giá trị key dùng để sắp xếp mảng theo key đó (trong 1 mảng có nhiều key)
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key ) return null
  return [...originalArray].sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })
}