const COLUMNS = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
};

export const ACTIONS = {
    A: "advance",
    C: "capture",
    F: "forward",
    M: "anyMoves",
    V: "validateCheck",
};

export const getAnotherSquare = (sumColumn, sumRow, square) => {
    let indexColumn = COLUMNS[square[0]];
    let indexRow = parseInt(square[1]);
    if (indexColumn + sumColumn > 7 || indexColumn + sumColumn < 0) {
        return null;
    }
    if (indexRow + sumRow > 8 || indexRow + sumRow < 1) {
        return null;
    }
    indexColumn += sumColumn;
    let newColumn = Object.keys(COLUMNS).find((key) => COLUMNS[key] === indexColumn);
    indexRow += sumRow;
    return String(newColumn + indexRow);
};

export const validateMove = (square, color, action) => {
    const childrens = document.getElementById(square).children;
    const pieceAndColor = childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
    switch (action) {
        case "anyMoves":
            if (childrens.length > 0) {
                return pieceAndColor[1] !== color;
            }
            return true;
        case "capture":
            if (childrens.length > 0) {
                return pieceAndColor[1] !== color;
            }
            break;
        case "advance":
            if (childrens.length === 0) {
                return true;
            }
            break;
        case "forward":
            if (childrens.length > 0) {
                if (pieceAndColor[1] !== color) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        case "validateCheck":
            if (childrens.length > 0) {
                if (pieceAndColor[1] !== color) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
    }
    return false;
};

export const validateHorizontalPin = (pieceAndColor, square) => {
    let i = 1;
    let sum = 1;
    let found = false;
    let pin = false;
    while (true) {
        if (i > 7 || i < -7) {
            break;
        }
        const validateSquare = getAnotherSquare(i, 0, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        const newPieceAndColor =
            childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
        if (!newPieceAndColor) {
            i = i + sum;
            continue;
        }
        if (newPieceAndColor[1] === pieceAndColor[1]) {
            if (newPieceAndColor[0] !== "king") {
                break;
            }
            if (found) {
                pin = true;
                break;
            }
            found = true;
            (i = -1), (sum = -1);
        } else {
            if (newPieceAndColor[0] === "queen" || newPieceAndColor[0] === "rook") {
                if (found) {
                    pin = true;
                    break;
                }
                found = true;
                (i = -1), (sum = -1);
            } else {
                break;
            }
        }
    }
    return pin;
};

export const validateVerticalPin = (pieceAndColor, square) => {
    let i = 1;
    let sum = 1;
    let found = false;
    let pin = false;
    while (true) {
        if (i > 7 || i < -7) {
            break;
        }
        const validateSquare = getAnotherSquare(0, i, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        const newPieceAndColor =
            childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
        if (!newPieceAndColor) {
            i = i + sum;
            continue;
        }
        if (newPieceAndColor[1] === pieceAndColor[1]) {
            if (newPieceAndColor[0] !== "king") {
                break;
            }
            if (found) {
                pin = true;
                break;
            }
            found = true;
            (i = -1), (sum = -1);
        } else {
            if (newPieceAndColor[0] === "queen" || newPieceAndColor[0] === "rook") {
                if (found) {
                    pin = true;
                    break;
                }
                found = true;
                (i = -1), (sum = -1);
            } else {
                break;
            }
        }
    }
    return pin;
};

export const validateDiagonalRightPin = (pieceAndColor, square) => {
    let i = 1;
    let sum = 1;
    let found = false;
    let pin = false;
    while (true) {
        if (i > 7 || i < -7) {
            break;
        }
        const validateSquare = getAnotherSquare(i, i, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        const newPieceAndColor =
            childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
        if (!newPieceAndColor) {
            i = i + sum;
            continue;
        }
        if (newPieceAndColor[1] === pieceAndColor[1]) {
            if (newPieceAndColor[0] !== "king") {
                break;
            }
            if (found) {
                pin = true;
                break;
            }
            found = true;
            (i = -1), (sum = -1);
        } else {
            if (newPieceAndColor[0] === "queen" || newPieceAndColor[0] === "bishop") {
                if (found) {
                    pin = true;
                    break;
                }
                found = true;
                (i = -1), (sum = -1);
            } else {
                break;
            }
        }
    }
    return pin;
};

export const validateDiagonalLeftPin = (pieceAndColor, square) => {
    let i = 1;
    let sum = 1;
    let found = false;
    let pin = false;
    while (true) {
        if (i > 7 || i < -7) {
            break;
        }
        const validateSquare = getAnotherSquare(i, i * -1, square);
        if (!validateSquare) {
            break;
        }
        const childrens = document.getElementById(validateSquare).children;
        const newPieceAndColor =
            childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
        if (!newPieceAndColor) {
            i = i + sum;
            continue;
        }
        if (newPieceAndColor[1] === pieceAndColor[1]) {
            if (newPieceAndColor[0] !== "king") {
                break;
            }
            if (found) {
                pin = true;
                break;
            }
            found = true;
            (i = -1), (sum = -1);
        } else {
            if (newPieceAndColor[0] === "queen" || newPieceAndColor[0] === "bishop") {
                if (found) {
                    pin = true;
                    break;
                }
                found = true;
                (i = -1), (sum = -1);
            } else {
                break;
            }
        }
    }
    return pin;
};

export const validateProtectedSquare = (square, pieceAndColor) => {
    let diagonalVariations = [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1],
    ];
    let linealVariation = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    for (const variation of linealVariation) {
        for (let i = 1; i < 8; i++) {
            const validateSquare = getAnotherSquare(i * variation[0], i * variation[1], square);
            if (!validateSquare) {
                break;
            }
            const childrens = document.getElementById(validateSquare).children;
            if (childrens.length === 0) {
                continue;
            }
            const newPieceAndColor = childrens[0].classList.item(1).split("_");
            if (newPieceAndColor[1] === pieceAndColor[1]) {
                break;
            }
            if (newPieceAndColor[0] === "king" && pieceAndColor[0] === "king" && i === 1) {
                return true;
            }
            if (newPieceAndColor[0] === "rook" || newPieceAndColor[0] === "queen") {
                return true;
            }
            break;
        }
    }
    let pawnControl = pieceAndColor[1] === "w" ? 1 : -1;
    for (const variation of diagonalVariations) {
        for (let i = 1; i < 8; i++) {
            const validateSquare = getAnotherSquare(i * variation[0], i * variation[1], square);
            if (!validateSquare) {
                break;
            }
            const childrens = document.getElementById(validateSquare).children;
            if (childrens.length === 0) {
                continue;
            }
            const newPieceAndColor = childrens[0].classList.item(1).split("_");
            if (newPieceAndColor[1] === pieceAndColor[1]) {
                break;
            }
            if (newPieceAndColor[0] === "king" && pieceAndColor[0] === "king" && i === 1) {
                return true;
            }
            if (i * variation[1] === pawnControl && newPieceAndColor[0] === "pawn") {
                return true;
            }
            if (newPieceAndColor[0] === "bishop" || newPieceAndColor[0] === "queen") {
                return true;
            }
            break;
        }
    }
    let variations = [
        [-1, 2],
        [1, 2],
        [-2, -1],
        [-2, 1],
        [2, 1],
        [2, -1],
        [-1, -2],
        [1, -2],
    ];
    for (const variation of variations) {
        const validateSquare = getAnotherSquare(variation[0], variation[1], square);
        if (!validateSquare) {
            continue;
        }
        const childrens = document.getElementById(validateSquare).children;
        if (childrens.length === 0) {
            continue;
        }
        const newPieceAndColor = childrens[0].classList.item(1).split("_");
        if (newPieceAndColor[1] === pieceAndColor[1]) {
            continue;
        }
        if (newPieceAndColor[0] === "knight") {
            return true;
        }
    }
    return false;
};
