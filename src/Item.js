import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import Svg from './Svg.js';

const Item = props => {

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
                            onChange={event => props.inpt(event, props.prps, 'valueName')}
                            value={props.prps.valueName}
                        >
                        </input>
                        <div className="btn_cvr_div">
                            <button className="side_btn" onClick={() => props.del(props.id)}>x</button>
                            <button className="side_btn" onClick={() => props.prps.downBtn ? 
                                                   props.down(props) :
                                                   null}>&darr;</button>
                        </div>
                </div>
                <div 
                    className={`card trans_on class_card${props.id}`}
                    style={{height: props.prps.menu}}
                >
                    <TextareaAutosize 
                        className={`input_text class_area${props.id}`}
                        onChange={event => props.inpt(event, props.prps, 'valueText')} 
                        placeholder={props.prps.text[1]}
                        value={props.prps.valueText}
                        disabled={!props.prps.drag}
                    />
                </div>
            </div>
            )}
        </Draggable>
    )

}

export default Item 