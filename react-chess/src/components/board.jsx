import { useState } from "react";
import "../styles/board.css";
import Square from "./square";

const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

function Board() {
    const board = [];
    let isWhite = true;
    for (let i = 8; i > 0; i--) {
        for (const column of columns) {
            let type = isWhite ? "square white" : "square black";
            board.push(
                <Square key={`${column}${i}`} initialPosition={`${column}${i}`} className={type}></Square>
            );
            isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }
    return <div className="board">{board}</div>;
}

export default Board;
