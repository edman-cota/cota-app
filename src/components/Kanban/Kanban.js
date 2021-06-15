import React from 'react';
import Board from '../Views/Board/Board';
import './kanban.scss';

export default function Kanban() {
    return (
        <div className="kanbar-board-container">
            <Board title="To do" count="2" />
            <Board title="In progress" count="1" />
            <Board title="Completed" count="0" />
        </div>
    )
}
