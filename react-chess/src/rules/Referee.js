import { getBishopMoves } from "./BishopRules";
import { getKingMoves } from "./KingRules";
import { getKnightMoves } from "./KnightRules";
import { getPawnMoves } from "./PawnRules";
import { getQueenMoves } from "./QueenRules";
import { getRookMoves } from "./RookRules";
import * as GF from "./GeneralFunctions";

export default class Referee {
    checkSquares = [];

    findMoves = (
        pieceAndColor,
        square,
        isCheck,
        checkSquares,
        possiblePassant,
        kingMoved,
        rooksMoved,
        customMoves
    ) => {
        let movements = [];
        if (isCheck) {
            if (checkSquares.length > 1 && pieceAndColor[0] !== "king") {
                return movements;
            }
        }
        switch (pieceAndColor[0]) {
            case "pawn":
                movements = getPawnMoves(
                    pieceAndColor,
                    square,
                    isCheck,
                    checkSquares,
                    possiblePassant
                );
                break;
            case "knight":
                movements = getKnightMoves(pieceAndColor, square, isCheck, checkSquares);
                break;
            case "bishop":
                movements = getBishopMoves(pieceAndColor, square, isCheck, checkSquares);
                break;
            case "queen":
                movements = getQueenMoves(pieceAndColor, square, isCheck, checkSquares);
                break;
            case "rook":
                movements = getRookMoves(pieceAndColor, square, isCheck, checkSquares);
                break;
            case "king":
                movements = getKingMoves(
                    pieceAndColor,
                    square,
                    isCheck,
                    kingMoved,
                    rooksMoved,
                    customMoves
                );
                break;
        }
        return movements;
    };

    validatePossibleCheck = (board, turn) => {
        this.checkSquares = [];
        let check = false;
        const square = Object.entries(board).find(([square, piece]) => {
            if (piece[0] !== null) {
                const pieceAndColor = piece[0].split("_");
                return pieceAndColor[0] === "king" && pieceAndColor[1] === turn;
            }
            return null;
        });
        if (square) {
            check = this.findPossibleChecks(board, square[0], turn);
        }
        return check;
    };

    findPossibleChecks = (board, square, turn) => {
        let variations = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ];
        let breakCycle = false;
        let check = false;
        for (const variation of variations) {
            if (breakCycle) {
                break;
            }
            let tempCheckSquares = [];
            for (let i = 1; i < 8; i++) {
                const validateSquare = GF.getAnotherSquare(
                    i * variation[0],
                    i * variation[1],
                    square
                );
                if (validateSquare) {
                    if (GF.validateMove(validateSquare, turn, GF.ACTIONS.V)) {
                        const piece = board[validateSquare][0];
                        if (!piece) {
                            tempCheckSquares.push(validateSquare);
                            continue;
                        }
                        const pieceAndColor = piece.split("_");
                        if (
                            (pieceAndColor[0] === "queen" || pieceAndColor[0] === "rook") &&
                            pieceAndColor[1] !== turn
                        ) {
                            tempCheckSquares.push(validateSquare);
                            this.checkSquares.push(tempCheckSquares);
                            check = true;
                            breakCycle = true;
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        variations = [
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
        ];
        breakCycle = false;
        for (const variation of variations) {
            if (breakCycle) {
                break;
            }
            let tempCheckSquares = [];
            for (let i = 1; i < 8; i++) {
                const validateSquare = GF.getAnotherSquare(
                    i * variation[0],
                    i * variation[1],
                    square
                );
                if (validateSquare) {
                    if (GF.validateMove(validateSquare, turn, GF.ACTIONS.V)) {
                        const piece = board[validateSquare][0];
                        if (!piece) {
                            tempCheckSquares.push(validateSquare);
                            continue;
                        }
                        const pieceAndColor = piece.split("_");
                        if (
                            (pieceAndColor[0] === "queen" || pieceAndColor[0] === "bishop") &&
                            pieceAndColor[1] !== turn
                        ) {
                            tempCheckSquares.push(validateSquare);
                            this.checkSquares.push(tempCheckSquares);
                            check = true;
                            breakCycle = true;
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
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
            const validateSquare = GF.getAnotherSquare(variation[0], variation[1], square);
            if (validateSquare) {
                if (GF.validateMove(validateSquare, turn, GF.ACTIONS.V)) {
                    const piece = board[validateSquare][0];
                    if (!piece) {
                        continue;
                    }
                    const pieceAndColor = piece.split("_");
                    if (pieceAndColor[0] === "knight" && pieceAndColor[1] !== turn) {
                        this.checkSquares.push([validateSquare]);
                        check = true;
                        break;
                    }
                }
            }
        }
        let sumRow = turn === "w" ? 1 : -1;
        variations = [-1, 1];
        for (const variation of variations) {
            const validateSquare = GF.getAnotherSquare(variation, sumRow, square);
            if (validateSquare) {
                if (GF.validateMove(validateSquare, turn, GF.ACTIONS.V)) {
                    const piece = board[validateSquare][0];
                    if (!piece) {
                        continue;
                    }
                    const pieceAndColor = piece.split("_");
                    if (pieceAndColor[0] === "pawn") {
                        this.checkSquares.push([validateSquare]);
                        check = true;
                        break;
                    }
                }
            }
        }
        return check;
    };
}
