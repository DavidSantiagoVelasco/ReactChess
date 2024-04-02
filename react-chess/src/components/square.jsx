import "../styles/square.css";

const initialPositionPieces = {
    a8: "../assets/rook_b.png",
    b8: "../assets/knight_b.png",
    c8: "../assets/bishop_b.png",
    d8: "../assets/queen_b.png",
    e8: "../assets/king_b.png",
    f8: "../assets/bishop_b.png",
    g8: "../assets/knight_b.png",
    h8: "../assets/rook_b.png",
    a7: "../assets/pawn_b.png",
    b7: "../assets/pawn_b.png",
    c7: "../assets/pawn_b.png",
    d7: "../assets/pawn_b.png",
    e7: "../assets/pawn_b.png",
    f7: "../assets/pawn_b.png",
    g7: "../assets/pawn_b.png",
    h7: "../assets/pawn_b.png",
    a2: "../assets/pawn_w.png",
    b2: "../assets/pawn_w.png",
    c2: "../assets/pawn_w.png",
    d2: "../assets/pawn_w.png",
    e2: "../assets/pawn_w.png",
    f2: "../assets/pawn_w.png",
    g2: "../assets/pawn_w.png",
    h2: "../assets/pawn_w.png",
    a1: "../assets/rook_w.png",
    b1: "../assets/knight_w.png",
    c1: "../assets/bishop_w.png",
    d1: "../assets/queen_w.png",
    e1: "../assets/king_w.png",
    f1: "../assets/bishop_w.png",
    g1: "../assets/knight_w.png",
    h1: "../assets/rook_w.png",
};

function Square({ initialPosition, className }) {
    let pieceImage = null;
    if (initialPosition in initialPositionPieces) {
        pieceImage = initialPositionPieces[initialPosition];
    }
    return (
        <div className={className}>
            {pieceImage && <img src={pieceImage} alt="Piece" className="image" />}
        </div>
    );
}

export default Square;
