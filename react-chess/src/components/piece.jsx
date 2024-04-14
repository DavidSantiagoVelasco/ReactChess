import "../styles/piece.css";

function Piece({ piece }) {
    return (
        <div
            style={{
                backgroundImage: `url(${"../assets/" + piece + ".png"})`,
            }}
            className={`piece ${piece}`}
        ></div>
    );
}

export default Piece;
