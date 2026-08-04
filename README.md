# matrix

an exercise generator, calculator, and interactive game for basic operations of matrices.

link to generator: https://ducky.is-a.dev/matrix/

link to calculator: https://ducky.is-a.dev/matrix/calculator/

link to interactive exercise game: https://ducky.is-a.dev/matrix/game

link to linear systems calculator/game: https://ducky.is-a.dev/matrix/systems

link to vector operation calculator/game: https://ducky.is-a.dev/matrix/vectors

made to practice my typescript skills and learn how to use classes.

## typescript files

- [calculator.ts](https://github.com/ducky4life/matrix/blob/main/calculator.ts), [generator.ts](https://github.com/ducky4life/matrix/blob/main/generator.ts), [game.ts](https://github.com/ducky4life/matrix/blob/main/game.ts), [systems_calculator.ts](https://github.com/ducky4life/matrix/blob/main/systems_calculator.ts), [systems_game.ts](https://github.com/ducky4life/matrix/blob/main/systems_game.ts), [vector_calculator.ts](https://github.com/ducky4life/matrix/blob/main/vector_calculator.ts), [vector_game.ts](https://github.com/ducky4life/matrix/blob/main/vector_game.ts): main code for their respective websites

- [matrix.ts](https://github.com/ducky4life/matrix/blob/main/matrix.ts): storing matrix classes and helper functions

- [frac_matrix.ts](https://github.com/ducky4life/matrix/blob/main/frac_matrix.ts): storing fraction/fractional matrix (matrices with fractional elements) classes and fraction related helper functions

- [systems.ts](https://github.com/ducky4life/matrix/blob/main/systems.ts): storing linear systems related classes (augmented matrices) and systems related helper functions

- [vectors.ts](https://github.com/ducky4life/matrix/blob/main/vectors.ts): storing vector related classes and vector related helper functions

- [systems_switch.ts](https://github.com/ducky4life/matrix/blob/main/systems_switch.ts), [vector_switch.ts](https://github.com/ducky4life/matrix/blob/main/vector_switch.ts): switching between calculator and exercise modes and their files for systems/vectors

- [matrix_web.ts](https://github.com/ducky4life/matrix/blob/main/matrix_web.ts): storing functions for interacting with the html sites

## todo

- [x] add latex mode
- [ ] export to file
- [x] 3x3 matrix
- [x] place answers in separate div
- [x] reveal individual answers
- [x] reveal all answers
- [x] more operations
- [x] verify user input answers
- [x] matrix calculator
- [x] fraction class so i can actually compute inverses ~~and eigenbases~~ (eigenvalues may be irrational)
- [x] sort functions in matrix.js into other modules
- [x] customise max element in matrix
- [x] gaussian elimination exercise game
- [ ] ~~github actions to build?~~ (online web compilers are faster)
