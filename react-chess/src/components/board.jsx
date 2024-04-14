import { useState } from "react";
import "../styles/board.css";
import Square from "./square";

function Board() {
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
    return (
        <div className="board">
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
