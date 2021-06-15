import React, {useState} from 'react';
import Modal from '../../Modal/Modal';
import './board.scss';

const Board = props => {

    const [show, setShow] = useState(false);

    return (
        <div className="board-container">
            <div className="board__title-container">
                <p>{props.title}</p>
                <p className="board__title-count">{props.count}</p>
            </div>
            <div className="board__add-container">
                <button onClick={() => setShow(true)} type="submit"> + </button>
                <Modal onClose={() => setShow(false)} show={show} />
            </div>
        </div>
    )
}

export default Board;
