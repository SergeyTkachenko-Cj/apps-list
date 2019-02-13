import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import Svg from './Svg.js';

const Item = props => {

    // console.log(props.prps.menu || '0px');

    const func = e => {
        console.log(e.target.style.height);
        e.target.style.height = 'auto';
        setTimeout(e.target.style.height = '0px', 0);
    }

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
                        <button onClick={() => props.funcV(props)}>&darr;</button>
                    </div>
            </div>
            <div 
                className={`card bambi ${props.prps.drag ? 'trans_on' : 'trans_off'}`}
                style={{height: props.prps.menu || '0px'}}
                // onTransitionEnd={event => props.prps.menu ? event.target.style.height = 'auto' : null}
                onTransitionEnd={event => func(event)}
            >
                <TextareaAutosize 
                    className={`input_text class${props.id}`}
                    onChange={event => props.funcIII(event, props.prps, 'valueText')} 
                    placeholder={props.prps.text[1]}
                    value={props.prps.valueText}
                    disabled={!props.prps.drag}
                    // style={{height: props.prps.menu || '0px'}}
                />
                {/* <div className={`input_text ${props.prps.drag ? 'trans_on' : 'trans_off'} ${props.prps.menu ? 'out' : 'in'}`}
                     suppressContentEditableWarning={props.prps.drag}
                     contentEditable={props.prps.drag}
                     placeholder={props.prps.text[1]}
                     onInput={event => props.funcIII(event, props.prps, 'valueText')}
                     dangerouslySetInnerHTML={{__html: props.prps.valueText}}
                >
                </div> */}
                 {/* <textarea
                    type="text"
                    className={`input_text ${props.prps.drag ? 'trans_on' : 'trans_off'} ${props.prps.menu ? 'out' : 'in'}`}
                    placeholder={props.prps.text[1]}
                    onChange={event => props.funcIII(event, props.prps, 'valueText')}
                    onInput={event => props.funcIV(event, props.prps, 'valueText')}
                    value={props.prps.valueText}
                    disabled={!props.prps.drag}
                    style={{height: props.prps.textAreaHeight}}
                /> */}
            </div>
            </div>
            )}
        </Draggable>
    )

}

export default Item 