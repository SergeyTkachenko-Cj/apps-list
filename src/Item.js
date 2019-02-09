import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import Svg from './Svg.js';

function Item(props) {

    return (
        <Draggable 
        draggableId={props.id.toString()}
        index={props.id}
        >
            { provided => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
            <div className="card">
                    <Svg nextClr={props.prps.color} />
                    <input 
                        type="text"
                        className="input_name" 
                        placeholder={props.prps.text[0]}
                        onChange={event => props.funcIII(event, props.prps, 'valueName')}
                        value={props.prps.valueName}
                    >
                    </input>
                    <div>
                        <button onClick={() => props.funcII(props.id)}>del</button>
                        <button onClick={() => props.funcV(props.prps)}>&darr;</button>
                    </div>
            </div>
            <div className="card">
                <textarea
                    type="text"
                    className={`input_text ${props.prps.drag ? 'trans_on' : 'trans_off'} ${props.prps.menu ? 'out' : 'in'}`}
                    placeholder={props.prps.text[1]}
                    onChange={event => props.funcIII(event, props.prps, 'valueText')}
                    value={props.prps.valueText}
                />
            </div>
            </div>
            )}
        </Draggable>
    )

}

export default Item 