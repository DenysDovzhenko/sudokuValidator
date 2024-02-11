# sudokuValidator
*A simple sudoku validator written in JS.*

This is a function that takes a Sudoku board representation as a 2d array.
Function returns false if array isn`t valid.
This function is also helpful for boards with same block size (3x3 block, 4x4 block, 5x5 block, etc.)
## Variables
`validArray` - const value. Representation of sorted valid data.

`validArraySum` - value of validArray elements sum.

`blockSize` - gets size of square block.

## Functions
### getBlock() 
Gets 2D array representation of the block. 

**Params**: sRow - index of start row position; sCol - index of start col position.

### isWrongArraySum() 
Soft check is array wrong or not, using only sum equality to correct answer. 

**Params**: subArray - a one-dimensional array ready for checking.

**Example**: 9x9 table in one row, col or block should have 45 sum of elements 1+2+3+4+5+6+7+8+9 = 45.

### isWrongArray() 
Hard check is array (row, col, block) wrong or not. Strong comparison with ideal sorted array. 

**Params**: subArray - a one-dimensional array ready for checking.

### boardCheck() 
A function that iterates over rows, columns, and blocks on the board. 

**Params**: function (method) how to validate arrays.

NOTES
* It is not very efficient to use sorting algo here, so I will replace it later.
* I tried to do this code as understandable as useful, but I haven't implemented realization of boards like 12x12 sudoku board (3x4 or 4x3 block). To my mind, i should get as minumum one more param in validSolution() func to define block bigger side (For example, how should the program understand a block as 4x4 or 4x3 in the 12x12 board)
