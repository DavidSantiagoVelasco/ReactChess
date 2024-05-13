import * as GF from "./GeneralFunctions";

export const getKingMoves = (pieceAndColor, square, isCheck, kingMoved, rooksMoved, customMoves) => {
    const variations = [
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, -1],
        [0, -1],
        [-1, -1],
    ];
    let movements = [];
    for (const variation of variations) {
        const validateSquare = GF.getAnotherSquare(variation[0], variation[1], square);
        if (validateSquare) {
            if (GF.validateMove(validateSquare, pieceAndColor[1], GF.ACTIONS.F)) {
                if (!GF.validateProtectedSquare(validateSquare, pieceAndColor)) {
                    movements.push(validateSquare);
                }
            }
        }
    }
    let horizontalMovements = findHorizontalMovesKing(
        pieceAndColor,
        square,
        isCheck,
        kingMoved,
        rooksMoved,
        customMoves
    );
    for (const movement of horizontalMovements) {
        movements.push(movement);
    }
    return movements;
};

function findHorizontalMovesKing(pieceAndColor, square, isCheck, kingMoved, rooksMoved, customMoves) {
    let index = pieceAndColor[1] === "w" ? 0 : 1;
    let movements = [];
    for (let i = -1; i >= -4; i--) {
        const validateSquare = GF.getAnotherSquare(i, 0, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        if (childrens.length > 0) {
            if (i !== -4) {
                break;
            }
            const pieceAndColorChildren = childrens[0].classList.item(1).split("_");
            if (
                pieceAndColorChildren[0] === "rook" &&
                pieceAndColorChildren[1] === pieceAndColor[1]
            ) {
                let castlingSquare = GF.getAnotherSquare(-2, 0, square);
                movements.push(castlingSquare);
                customMoves.push(["queensideCastling", castlingSquare]);
            }
        } else {
            if (GF.validateProtectedSquare(validateSquare, pieceAndColor)) {
                break;
            }
            if (i === -1) {
                movements.push(validateSquare);
            }
        }
        if (kingMoved[index]) break;
        if (isCheck) break;
        if (index === 0) {
            if (rooksMoved[0][0]) {
                break;
            }
        } else {
            if (rooksMoved[1][0]) {
                break;
            }
        }
    }
    for (let i = 1; i <= 3; i++) {
        const validateSquare = GF.getAnotherSquare(i, 0, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        if (childrens.length > 0) {
            if (i !== 3) {
                break;
            }
            const pieceAndColorChildren = childrens[0].classList.item(1).split("_");
            if (
                pieceAndColorChildren[0] === "rook" &&
                pieceAndColorChildren[1] === pieceAndColor[1]
            ) {
                let castlingSquare = GF.getAnotherSquare(2, 0, square);
                movements.push(castlingSquare);
                customMoves.push(["kingsideCastling", castlingSquare]);
            }
        } else {
            if (GF.validateProtectedSquare(validateSquare, pieceAndColor)) {
                break;
            }
            if (i === 1) {
                movements.push(validateSquare);
            }
        }
        if (kingMoved[index]) break;
        if (isCheck) break;
        if (index === 0) {
            if (rooksMoved[0][1]) {
                break;
            }
        } else {
            if (rooksMoved[1][1]) {
                break;
            }
        }
    }
    return movements;
}
