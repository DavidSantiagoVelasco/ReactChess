import { useEffect, useState } from "react";
import "../styles/board.css";
import Square from "./square";
import Referee from "../rules/Referee";
import { getAnotherSquare } from "../rules/GeneralFunctions";
import CheckMateModal from "./checkMateModal";

const TURNS = {
    W: "w",
    B: "b",
};

let customMoves = [];
let possiblePassant = null;
let kingMoved = [false, false];
let rooksMoved = [
    [false, false],
    [false, false],
];
let checkSquares = [];
const referee = new Referee();

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
    const [isCheck, setIsCheck] = useState(false);
    const [checkMate, setCheckMate] = useState(false);
    useEffect(() => {
        const check = referee.validatePossibleCheck(board, turn);
        if (check) {
            setIsCheck(true);
            checkSquares = referee.checkSquares;
        }
    }, [turn]);
    useEffect(() => {
        let isCheckmate = checkSquares.length > 0 ? true : false;
        if (!isCheckmate) {
            return;
        }
        for (const key in board) {
            const piece = board[key];
            if (!piece[0]) {
                continue;
            }
            const pieceAndColor = piece[0].split("_");
            if (pieceAndColor[1] !== turn) {
                continue;
            }
            const movements = referee.findMoves(
                pieceAndColor,
                key,
                isCheck,
                checkSquares,
                possiblePassant,
                kingMoved,
                rooksMoved,
                customMoves
            );
            let breakCycle = false;
            if (pieceAndColor[0] === "king") {
                if (movements.length > 0) {
                    isCheckmate = false;
                    breakCycle = true;
                    break;
                }
            }
            for (const square of checkSquares[0]) {
                if (breakCycle) {
                    break;
                }
                for (const move of movements) {
                    if (move === square) {
                        isCheckmate = false;
                        breakCycle = true;
                        break;
                    }
                }
            }
            if (!isCheckmate) {
                break;
            }
        }
        if (isCheckmate) {
            setCheckMate(true);
        }
    }, [isCheck]);

    function clickSquare(e) {
        const element = e.target;
        if (selectedSquare) {
            document.getElementById(selectedSquare).classList.remove("selected");
        }
        const parent = element.parentNode;
        const id = parent.id;
        if (element.classList.contains("possibleMovement")) {
            move(element.id);
            if (isCheck) {
                checkSquares = [];
                setIsCheck(false);
            }
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
        const movements = referee.findMoves(
            pieceAndColor,
            square,
            isCheck,
            checkSquares,
            possiblePassant,
            kingMoved,
            rooksMoved,
            customMoves
        );
        for (const move of movements) {
            showSquareAsPossibleMovement(move);
        }
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
        if (pieceAndColor[0] === "rook") {
            if (selectedSquare === "a1") {
                if (!rooksMoved[0][0]) {
                    rooksMoved[0][0] = true;
                }
            } else if (selectedSquare === "h1") {
                if (!rooksMoved[0][1]) {
                    rooksMoved[0][1] = true;
                }
            } else if (selectedSquare === "a8") {
                if (!rooksMoved[1][0]) {
                    rooksMoved[1][0] = true;
                }
            } else if (selectedSquare === "h8") {
                if (!rooksMoved[1][1]) {
                    rooksMoved[1][1] = true;
                }
            }
        }
        if (pieceAndColor[0] !== "pawn") {
            possiblePassant = null;
        } else {
            const rowDifference = Math.abs(parseInt(selectedSquare[1]) - parseInt(newSquare[1]));
            if (rowDifference !== 2) {
                const validateSquare1 = getAnotherSquare(-1, 0, selectedSquare);
                const validateSquare2 = getAnotherSquare(1, 0, selectedSquare);
                if (possiblePassant != null) {
                    if (validateSquare1 === possiblePassant) {
                        const sumRow = turn === TURNS.W ? 1 : -1;
                        const validateNewSquare = getAnotherSquare(0, sumRow, validateSquare1);
                        if (validateNewSquare === newSquare) {
                            newBoard[validateSquare1][0] = null;
                        }
                    } else if (validateSquare2 === possiblePassant) {
                        const sumRow = turn === TURNS.W ? 1 : -1;
                        const validateNewSquare = getAnotherSquare(0, sumRow, validateSquare2);
                        if (validateNewSquare === newSquare) {
                            newBoard[validateSquare2][0] = null;
                        }
                    }
                    possiblePassant = null;
                }
            } else {
                possiblePassant = newSquare;
            }
        }
        newBoard[newSquare][0] = piece;
        newBoard[selectedSquare][0] = null;

        setBoard(newBoard);
        const newTurn = turn === TURNS.W ? TURNS.B : TURNS.W;
        setTurn(newTurn);
    }

    function showSquareAsPossibleMovement(square) {
        document.getElementById(square).classList.add("possibleMovement");
        const currentPossibleMovements = possibleMovements;
        currentPossibleMovements.push(square);
        setPossibleMovements(currentPossibleMovements);
    }

    function resetGame() {
        setBoard({
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
        setTurn(TURNS.W);
        setSelectedSquare(null);
        setPossibleMovements([]);
        checkSquares = [];
        setIsCheck(false);
        setCheckMate(false);
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
            {checkMate && (
                <CheckMateModal
                    winningTeam={turn === TURNS.W ? "black" : "white"}
                    handlePlayAgain={resetGame}
                />
            )}
        </div>
    );
}

export default Board;
