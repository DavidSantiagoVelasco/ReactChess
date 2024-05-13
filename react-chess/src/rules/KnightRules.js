import * as GF from "./GeneralFunctions";

export const getKnightMoves = (pieceAndColor, square, isCheck, checkSquares) => {
    const variations = [
        [-1, 2],
        [1, 2],
        [-2, -1],
        [-2, 1],
        [2, 1],
        [2, -1],
        [-1, -2],
        [1, -2],
    ];
    let movements = [];
    for (const variation of variations) {
        const validateSquare = GF.getAnotherSquare(variation[0], variation[1], square);
        if (validateSquare) {
            if (GF.validateMove(validateSquare, pieceAndColor[1], GF.ACTIONS.M)) {
                if (GF.validateHorizontalPin(pieceAndColor, square)) break;
                if (GF.validateVerticalPin(pieceAndColor, square)) break;
                if (GF.validateDiagonalRightPin(pieceAndColor, square)) break;
                if (GF.validateDiagonalLeftPin(pieceAndColor, square)) break;
                if (isCheck) {
                    for (const square of checkSquares[0]) {
                        if (validateSquare === square) {
                            movements.push(validateSquare);
                        }
                    }
                } else {
                    movements.push(validateSquare);
                }
            }
        }
    }
    return movements;
};
