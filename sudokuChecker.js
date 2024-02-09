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

    if (array.flat().includes(0)) {
        return false
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