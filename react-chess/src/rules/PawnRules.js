import * as GF from "./GeneralFunctions";

export const getPawnMoves = (pieceAndColor, square, isCheck, checkSquares, possiblePassant) => {
    let whiteOrBlack = pieceAndColor[1] === "w" ? 1 : -1;
    const variations = [-1, 1];
    let movements = [];
    let validateSquare;
    for (const variation of variations) {
        validateSquare = GF.getAnotherSquare(variation, whiteOrBlack, square);
        if (validateSquare) {
            if (!GF.validateMove(validateSquare, pieceAndColor[1], GF.ACTIONS.C)) {
                continue;
            }
            if (GF.validateVerticalPin(pieceAndColor, square)) {
                continue;
            }
            if (GF.validateHorizontalPin(pieceAndColor, square)) {
                continue;
            }
            if (
                (whiteOrBlack === 1 && variation === -1) ||
                (whiteOrBlack === -1 && variation === 1)
            ) {
                if (GF.validateDiagonalRightPin(pieceAndColor, square)) {
                    continue;
                }
            } else {
                if (GF.validateDiagonalLeftPin(pieceAndColor, square)) {
                    continue;
                }
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
        }
    }
    let increase =
        (square[1] === "2" && whiteOrBlack === 1) || (square[1] === "7" && whiteOrBlack === -1)
            ? 2
            : 1;
    let i = 0;
    while (Math.abs(i) < increase) {
        i = (Math.abs(i) + 1) * whiteOrBlack;
        validateSquare = GF.getAnotherSquare(0, i, square);
        if (!validateSquare) break;
        if (!GF.validateMove(validateSquare, pieceAndColor[1], GF.ACTIONS.A)) break;
        if (GF.validateHorizontalPin(pieceAndColor, square)) break;
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
    const possiblePassantMovements = validatePossiblePassant(
        square,
        possiblePassant,
        pieceAndColor[1]
    );
    for (const move of possiblePassantMovements) {
        movements.push(move);
    }
    return movements;
};

function validatePossiblePassant(square, possiblePassant, turn) {
    let possiblePassantMovements = [];
    if (!possiblePassant) {
        return possiblePassantMovements;
    }
    const validateSquare1 = GF.getAnotherSquare(-1, 0, square);
    const validateSquare2 = GF.getAnotherSquare(1, 0, square);
    let sumRow = turn === "w" ? 1 : -1;
    if (validateSquare1 === possiblePassant) {
        possiblePassantMovements.push(GF.getAnotherSquare(-1, sumRow, square));
    } else if (validateSquare2 === possiblePassant) {
        possiblePassantMovements.push(GF.getAnotherSquare(1, sumRow, square));
    }
    return possiblePassantMovements;
}
