import "../styles/modal.css";

function PawnPromotionModal({ color, handleChosenOption }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>Choose your promotion option</p>
                <div className="options">
                    <div className="option">
                        <img
                            src={"../assets/queen_" + color + ".png"}
                            alt="Queen"
                            className="piece-image"
                            onClick={() => handleChosenOption("queen_" + color)}
                        />
                    </div>
                    <div className="option">
                        <img
                            src={"../assets/rook_" + color + ".png"}
                            alt="Rook"
                            className="piece-image"
                            onClick={() => handleChosenOption("rook_" + color)}
                        />
                    </div>
                    <div className="option">
                        <img
                            src={"../assets/bishop_" + color + ".png"}
                            alt="Bishop"
                            className="piece-image"
                            onClick={() => handleChosenOption("bishop_" + color)}
                        />
                    </div>
                    <div className="option">
                        <img
                            src={"../assets/knight_" + color + ".png"}
                            alt="Knight"
                            className="piece-image"
                            onClick={() => handleChosenOption("knight_" + color)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PawnPromotionModal;
