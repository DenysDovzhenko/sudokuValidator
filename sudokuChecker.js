let validSolution = (array) => {
    if 
    (!(
        array instanceof Array && 
        array.length !== 0 &&
        array[0] instanceof Array &&
        array[0].length !== 0 &&
        array.length === array[0].length &&
        array.every(elem => elem.every(x => typeof x === 'number'))
    )) 
    {
        throw new Error("It isn`t 2D square array of integers", { cause: array })
    }

    if (!array.every(elem => elem.every(x => x <= array.length))) {
        throw new Error("Value of sudoku cell cannot be greater than " + array.length)
    }

    if (!array.every(elem => elem.every(x => x >= 0))) {
        throw new Error("Value of sudoku cell cannot be less than 0")
    }

    const blockSize = Math.sqrt(array.length)
    let validArraySum = 0
    const validArray = Array.from({length: array.length}, (_, index) => { 
        validArraySum += index + 1
        return index + 1
    })
    
    let getBlock = (sRow, sCol) => array.slice(sRow, sRow + blockSize).map(x => x.slice(sCol, sCol + blockSize))
    
    let isWrongArraySum = (subArray) => {
        let sum = subArray.reduce((accum, curValue) => accum + curValue, 0)
        return sum !== validArraySum
    }

    let isWrongArray = (subArray) => {
        let subArraySorted = subArray.slice().sort()
        return !validArray.every((val, index) => val === subArraySorted[index])
    }

    let boardCheck = (checkFunc) => {
        for (let i = 0; i < validArray.length; i++) {
            let row = array[i]
            let col = array.map(x => x[i])           

            if (checkFunc(row) || checkFunc(col)) {
                return false
            }

            if (i % blockSize === 0) {
                for (let j = 0; j < validArray.length; j += blockSize) {
                    let block = getBlock(i, j)
                    if (checkFunc(block.flat())) {
                        return false
                    }
                }
            }
        }

        return true
    }

    return boardCheck(isWrongArraySum) && boardCheck(isWrongArray) 
}

console.log(validSolution([
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [10, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]))

console.log(validSolution([
  [5, 3, 4, 6, 7, 8, 9, 1, 2], 
  [6, 7, 2, 1, 9, 0, 3, 4, 8],
  [1, 0, 0, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 0],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 0, 1, 5, 3, 7, 2, 1, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 0, 0, 4, 8, 1, 1, 7, 9]
]))
  