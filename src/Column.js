import React from 'react';
import {Droppable} from 'react-beautiful-dnd';

export default function Column(props) {
    return (
        <Droppable droppableId={props.arr[0].props.id.toString()}>
            { provided => (
                <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                >
                    {props.arr}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}