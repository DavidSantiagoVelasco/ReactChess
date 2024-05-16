import "../styles/modal.css";

function CheckMateModal({ winningTeam, handlePlayAgain }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>The winning team is {winningTeam}</p>
                <button onClick={handlePlayAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default CheckMateModal;
