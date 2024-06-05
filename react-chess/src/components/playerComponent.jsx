import { useState } from "react";
import "../styles/playerComponent.css";

function PlayerComponent({
    color,
    pawnsCapturedCont,
    bishopsCapturedCont,
    knightsCapturedCont,
    rooksCapturedCont,
    queensCapturedCont,
    score,
}) {
    const renderPawns = () => {
        const pawns = [];
        for (let i = 0; i < pawnsCapturedCont; i++) {
            pawns.push(
                <img
                    key={`panw_${color === "white" ? "b" : "w"}_${i}`}
                    src={`../assets/pawn_${color === "white" ? "b" : "w"}.png`}
                    alt={`pawn_${color === "white" ? "b" : "w"}_${i}`}
                />
            );
        }
        return pawns;
    };

    const renderBishops = () => {
        const bishops = [];
        for (let i = 0; i < bishopsCapturedCont; i++) {
            bishops.push(
                <img
                    key={`bishop_${color === "white" ? "b" : "w"}_${i}`}
                    src={`../assets/bishop_${color === "white" ? "b" : "w"}.png`}
                    alt={`bishop_${color === "white" ? "b" : "w"}_${i}`}
                />
            );
        }
        return bishops;
    };

    const renderKnights = () => {
        const knights = [];
        for (let i = 0; i < knightsCapturedCont; i++) {
            knights.push(
                <img
                    key={`knight_${color === "white" ? "b" : "w"}_${i}`}
                    src={`../assets/knight_${color === "white" ? "b" : "w"}.png`}
                    alt={`knight_${color === "white" ? "b" : "w"}_${i}`}
                />
            );
        }
        return knights;
    };

    const renderRooks = () => {
        const rooks = [];
        for (let i = 0; i < rooksCapturedCont; i++) {
            rooks.push(
                <img
                    key={`rook_${color === "white" ? "b" : "w"}_${i}`}
                    src={`../assets/rook_${color === "white" ? "b" : "w"}.png`}
                    alt={`rook_${color === "white" ? "b" : "w"}_${i}`}
                />
            );
        }
        return rooks;
    };

    const renderQueens = () => {
        const queens = [];
        for (let i = 0; i < queensCapturedCont; i++) {
            queens.push(
                <img
                    key={`queen_${color === "white" ? "b" : "w"}_${i}`}
                    src={`../assets/queen_${color === "white" ? "b" : "w"}.png`}
                    alt={`queen_${color === "white" ? "b" : "w"}_${i}`}
                />
            );
        }
        return queens;
    };

    return (
        <div>
            <div className="user-tagline-component">
                <span>{color}</span>
            </div>
            <div className="captured-pieces-component">
                {pawnsCapturedCont > 0 && <span className="captured-pieces">{renderPawns()}</span>}
                {bishopsCapturedCont > 0 && (
                    <span className="captured-pieces">{renderBishops()}</span>
                )}
                {knightsCapturedCont > 0 && (
                    <span className="captured-pieces">{renderKnights()}</span>
                )}
                {rooksCapturedCont > 0 && <span className="captured-pieces">{renderRooks()}</span>}
                {queensCapturedCont > 0 && (
                    <span className="captured-pieces">{renderQueens()}</span>
                )}
                {score > 0 && (
                    <span className="captured-pieces-score">{`${
                        score > 0 ? "+" : "-"
                    }${score}`}</span>
                )}
            </div>
        </div>
    );
}

export default PlayerComponent;
