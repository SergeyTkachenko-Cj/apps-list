import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import logo from './app-store-1.svg';
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
                    {/* <img className="logo" src={logo} alt="app-logo"/> */}
                    <Svg nextClr={props.id} />
                    <input 
                        type="text"
                        className="input_name" 
                        placeholder={props.prps.text}
                        onChange={event => props.funcIII(event, props.prps, 'valueName')}
                        value={props.prps.valueName}
                        >
                    </input>
                    {/* <textarea
                        type="text"
                        className='input_text'
                        placeholder={props.prps.text}
                        onChange={event => props.funcIII(event, props.prps, 'valueText')}
                        value={props.prps.valueText}
                        /> */}
                    {/* <input 
                        type="checkbox" 
                        checked={props.prps.finished} 
                        onChange={() => props.funcI(props.prps)}>
                    </input> */}
                    <div>
                <button onClick={() => props.funcII(props.id)}>del</button>
                <button onClick={() => props.funcV(props.prps)}>&darr;</button>
                </div>
            </div>
            <div className="card">
                <textarea
                type="text"
                className='input_text'
                placeholder={props.prps.text}
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