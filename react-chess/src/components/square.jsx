import "../styles/square.css";
import Piece from "./piece";

function Square({ initialPosition, className, piece }) {
    return (
        <div className={className} id={initialPosition}>
            {piece && <Piece piece={piece}></Piece>}
        </div>
    );
}

export default Square;
