import { useState } from "react";
import "../styles/board.css";
import Square from "./square";

const TURNS = {
    W: "w",
    B: "b",
};

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

const ACTIONS = {
    A: "advance",
    C: "capture",
    F: "forward",
    M: "anyMoves",
};

let customMoves = [];
let kingMoved = [false, false];

function Board() {
    const [turn, setTurn] = useState(TURNS.W);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [possibleMovements, setPossibleMovements] = useState([]);
    const [board, setBoard] = useState({
        a8: ["rook_b", "white"],
        b8: ["knight_b", "black"],
        c8: ["bishop_b", "white"],
        d8: ["queen_b", "black"],
        e8: ["king_b", "white"],
        f8: ["bishop_b", "black"],
        g8: ["knight_b", "white"],
        h8: ["rook_b", "black"],
        a7: ["pawn_b", "black"],
        b7: ["pawn_b", "white"],
        c7: ["pawn_b", "black"],
        d7: ["pawn_b", "white"],
        e7: ["pawn_b", "black"],
        f7: ["pawn_b", "white"],
        g7: ["pawn_b", "black"],
        h7: ["pawn_b", "white"],
        a6: [null, "white"],
        b6: [null, "black"],
        c6: [null, "white"],
        d6: [null, "black"],
        e6: [null, "white"],
        f6: [null, "black"],
        g6: [null, "white"],
        h6: [null, "black"],
        a5: [null, "black"],
        b5: [null, "white"],
        c5: [null, "black"],
        d5: [null, "white"],
        e5: [null, "black"],
        f5: [null, "white"],
        g5: [null, "black"],
        h5: [null, "white"],
        a4: [null, "white"],
        b4: [null, "black"],
        c4: [null, "white"],
        d4: [null, "black"],
        e4: [null, "white"],
        f4: [null, "black"],
        g4: [null, "white"],
        h4: [null, "black"],
        a3: [null, "black"],
        b3: [null, "white"],
        c3: [null, "black"],
        d3: [null, "white"],
        e3: [null, "black"],
        f3: [null, "white"],
        g3: [null, "black"],
        h3: [null, "white"],
        a2: ["pawn_w", "white"],
        b2: ["pawn_w", "black"],
        c2: ["pawn_w", "white"],
        d2: ["pawn_w", "black"],
        e2: ["pawn_w", "white"],
        f2: ["pawn_w", "black"],
        g2: ["pawn_w", "white"],
        h2: ["pawn_w", "black"],
        a1: ["rook_w", "black"],
        b1: ["knight_w", "white"],
        c1: ["bishop_w", "black"],
        d1: ["queen_w", "white"],
        e1: ["king_w", "black"],
        f1: ["bishop_w", "white"],
        g1: ["knight_w", "black"],
        h1: ["rook_w", "white"],
    });
    let blockedForward = false;

    function clickSquare(e) {
        const element = e.target;
        if (selectedSquare) {
            document.getElementById(selectedSquare).classList.remove("selected");
        }
        const parent = element.parentNode;
        const id = parent.id;
        if (element.classList.contains("possibleMovement")) {
            move(element.id);
        }
        for (let i = 0; i < possibleMovements.length; i++) {
            document.getElementById(possibleMovements[i]).classList.remove("possibleMovement");
        }
        customMoves = [];
        setSelectedSquare(id);
        if (!element.classList.contains("piece")) {
            return;
        }
        movements(id, element, parent);
    }

    function movements(square, element, parent) {
        parent.classList.add("selected");
        const piece = element.classList.item(1);
        const pieceAndColor = piece.split("_");
        if (turn !== pieceAndColor[1]) {
            return;
        }
        findMoves(piece, square);
        setSelectedSquare(square);
    }

    function move(newSquare) {
        const newBoard = { ...board };
        const piece = newBoard[selectedSquare][0];
        const pieceAndColor = piece.split("_");
        if (pieceAndColor[0] === "king") {
            for (const moves of customMoves) {
                if (moves[1] === newSquare) {
                    let newRookSquare = null,
                        currentRookSquare = null;
                    if (moves[0] === "queensideCastling") {
                        newRookSquare = getAnotherSquare(-1, 0, selectedSquare);
                        currentRookSquare = getAnotherSquare(-4, 0, selectedSquare);
                    } else if (moves[0] === "kingsideCastling") {
                        newRookSquare = getAnotherSquare(1, 0, selectedSquare);
                        currentRookSquare = getAnotherSquare(3, 0, selectedSquare);
                    }
                    if (!newRookSquare || !currentRookSquare) return;
                    const rook = newBoard[currentRookSquare][0];
                    newBoard[newRookSquare][0] = rook;
                    newBoard[currentRookSquare][0] = null;
                }
            }
            pieceAndColor[1] === "w" ? (kingMoved[0] = true) : (kingMoved[1] = true);
        }
        newBoard[newSquare][0] = piece;
        newBoard[selectedSquare][0] = null;

        setBoard(newBoard);
        const newTurn = turn === TURNS.W ? TURNS.B : TURNS.W;
        setTurn(newTurn);
    }

    function findMoves(piece, square) {
        let validateSquare = square;
        const pieceAndColor = piece.split("_");
        let variations;
        switch (pieceAndColor[0]) {
            case "pawn":
                let whiteOrBlack = pieceAndColor[1] === "w" ? 1 : -1;
                validateSquare = getAnotherSquare(-1, whiteOrBlack, square);
                if (validateSquare) {
                    if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.C)) {
                        showSquareAsPossibleMovement(validateSquare);
                    }
                }
                validateSquare = getAnotherSquare(1, whiteOrBlack, square);
                if (validateSquare) {
                    if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.C)) {
                        showSquareAsPossibleMovement(validateSquare);
                    }
                }
                if (whiteOrBlack === 1) {
                    let increase = square[1] === "2" ? 2 : 1;
                    for (let i = 1; i <= increase; i++) {
                        validateSquare = getAnotherSquare(0, i, square);
                        if (validateSquare) {
                            if (validateMove(validateSquare, "w", ACTIONS.A)) {
                                showSquareAsPossibleMovement(validateSquare);
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    let decrease = square[1] === "7" ? -2 : -1;
                    for (let i = -1; i >= decrease; i--) {
                        validateSquare = getAnotherSquare(0, i, square);
                        if (validateSquare) {
                            if (validateMove(validateSquare, "b", ACTIONS.A)) {
                                showSquareAsPossibleMovement(validateSquare);
                            } else {
                                break;
                            }
                        }
                    }
                }
                break;
            case "knight":
                variations = [
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
                    validateSquare = getAnotherSquare(variation[0], variation[1], square);
                    if (validateSquare) {
                        if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.M)) {
                            showSquareAsPossibleMovement(validateSquare);
                        }
                    }
                }
                break;
            case "bishop":
                variations = [
                    [-1, 1],
                    [1, 1],
                    [-1, -1],
                    [1, -1],
                ];
                for (const variation of variations) {
                    for (let i = 1; i < 8; i++) {
                        validateSquare = getAnotherSquare(
                            i * variation[0],
                            i * variation[1],
                            square
                        );
                        if (validateSquare) {
                            if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.F)) {
                                showSquareAsPossibleMovement(validateSquare);
                            } else {
                                break;
                            }
                        }
                    }
                }
                break;
            case "queen":
                variations = [
                    [-1, 0],
                    [-1, 1],
                    [0, 1],
                    [1, 1],
                    [1, 0],
                    [1, -1],
                    [0, -1],
                    [-1, -1],
                ];
                for (const variation of variations) {
                    for (let i = 1; i < 8; i++) {
                        validateSquare = getAnotherSquare(
                            i * variation[0],
                            i * variation[1],
                            square
                        );
                        if (validateSquare) {
                            if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.F)) {
                                showSquareAsPossibleMovement(validateSquare);
                            } else {
                                break;
                            }
                        } else {
                            blockedForward = false;
                            break;
                        }
                    }
                }
                break;
            case "rook":
                variations = [
                    [-1, 0],
                    [0, 1],
                    [1, 0],
                    [0, -1],
                ];
                for (const variation of variations) {
                    for (let i = 1; i < 8; i++) {
                        validateSquare = getAnotherSquare(
                            i * variation[0],
                            i * variation[1],
                            square
                        );
                        if (validateSquare) {
                            if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.F)) {
                                showSquareAsPossibleMovement(validateSquare);
                            } else {
                                break;
                            }
                        } else {
                            blockedForward = false;
                            break;
                        }
                    }
                }
                break;
            case "king":
                variations = [
                    [-1, 1],
                    [0, 1],
                    [1, 1],
                    [1, -1],
                    [0, -1],
                    [-1, -1],
                ];
                for (const variation of variations) {
                    validateSquare = getAnotherSquare(variation[0], variation[1], square);
                    if (validateSquare) {
                        if (validateMove(validateSquare, pieceAndColor[1], ACTIONS.F)) {
                            showSquareAsPossibleMovement(validateSquare);
                        }
                    } else {
                        blockedForward = false;
                    }
                }
                findHorizontalMovesKing(pieceAndColor, square);
                break;
            default:
                break;
        }
        const childrens = document.getElementById(square).children;
        if (childrens.length > 0) {
            return;
        }
        document.getElementById(square).classList.add("possibleMovement");
        const currentPossibleMovements = possibleMovements;
        currentPossibleMovements.push(square);
        setPossibleMovements(currentPossibleMovements);
    }

    function validateMove(square, color, action) {
        const childrens = document.getElementById(square).children;
        const pieceAndColor =
            childrens.length > 0 ? childrens[0].classList.item(1).split("_") : null;
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
                if (blockedForward) {
                    blockedForward = false;
                    return false;
                }
                if (childrens.length > 0) {
                    if (pieceAndColor[1] !== color) {
                        blockedForward = true;
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
        }
        return false;
    }

    function findHorizontalMovesKing(pieceAndColor, square) {
        let index = pieceAndColor[1] === "w" ? 0 : 1;
        for (let i = -1; i >= -4; i--) {
            const validateSquare = getAnotherSquare(i, 0, square);
            if (validateSquare) {
                const childrens = document.getElementById(validateSquare).children;
                if (childrens.length > 0) {
                    if (i !== -4) {
                        break;
                    } else {
                        const pieceAndColorChildren = childrens[0].classList.item(1).split("_");
                        if (
                            pieceAndColorChildren[0] === "rook" &&
                            pieceAndColorChildren[1] === pieceAndColor[1]
                        ) {
                            let castlingSquare = getAnotherSquare(-2, 0, square);
                            showSquareAsPossibleMovement(castlingSquare);
                            customMoves.push(["queensideCastling", castlingSquare]);
                        }
                    }
                } else if (i === -1) {
                    showSquareAsPossibleMovement(validateSquare);
                }
                if (kingMoved[index]) break;
            } else {
                break;
            }
        }
        for (let i = 1; i <= 3; i++) {
            const validateSquare = getAnotherSquare(i, 0, square);
            if (validateSquare) {
                const childrens = document.getElementById(validateSquare).children;
                if (childrens.length > 0) {
                    if (i !== 3) {
                        break;
                    } else {
                        const pieceAndColorChildren = childrens[0].classList.item(1).split("_");
                        if (
                            pieceAndColorChildren[0] === "rook" &&
                            pieceAndColorChildren[1] === pieceAndColor[1]
                        ) {
                            let castlingSquare = getAnotherSquare(2, 0, square);
                            showSquareAsPossibleMovement(castlingSquare);
                            customMoves.push(["kingsideCastling", castlingSquare]);
                        }
                    }
                } else if (i === 1) {
                    showSquareAsPossibleMovement(validateSquare);
                }
                if (kingMoved[index]) break;
            } else {
                break;
            }
        }
    }

    function showSquareAsPossibleMovement(square) {
        document.getElementById(square).classList.add("possibleMovement");
        const currentPossibleMovements = possibleMovements;
        currentPossibleMovements.push(square);
        setPossibleMovements(currentPossibleMovements);
    }

    function getAnotherSquare(sumColumn, sumRow, square) {
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
    }

    return (
        <div onClick={(e) => clickSquare(e)} className="board">
            {Object.entries(board).map(([square, piece]) => (
                <Square
                    key={square}
                    initialPosition={square}
                    className={"square " + piece[1]}
                    piece={piece[0]}
                ></Square>
            ))}
        </div>
    );
}

export default Board;
