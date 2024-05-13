import * as GF from "./GeneralFunctions";

export const getBishopMoves = (pieceAndColor, square, isCheck, checkSquares) => {
    const variations = [
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
    ];
    let movements = [];
    for (const variation of variations) {
        for (let i = 1; i < 8; i++) {
            const validateSquare = GF.getAnotherSquare(i * variation[0], i * variation[1], square);
            if (!validateSquare) {
                break;
            }
            if (!GF.validateMove(validateSquare, pieceAndColor[1], GF.ACTIONS.F)) {
                break;
            }
            if (GF.validateHorizontalPin(pieceAndColor, square)) break;
            if (GF.validateVerticalPin(pieceAndColor, square)) break;
            if (
                (variation[0] === -1 && variation[1] === -1) ||
                (variation[0] === 1 && variation[1] === 1)
            ) {
                if (GF.validateDiagonalLeftPin(pieceAndColor, square)) break;
            } else {
                if (GF.validateDiagonalRightPin(pieceAndColor, square)) break;
            }
            if (isCheck) {
                for (const square of checkSquares[0]) {
                    if (validateSquare === square) {
                        movements.push(validateSquare);
                    }
                }
            } else {
                movements.push(validateSquare);
            }
            const childrens = document.getElementById(validateSquare).children;
            if (childrens.length > 0) {
                break;
            }
        }
    }
    return movements;
};
