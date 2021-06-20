import React from 'react';
import './App.css';
import Item from './Item.js';
import Items from './Items.js';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './Column.js';

class App extends React.Component {

    state = {
      todos: Items
    }

  logoColorHandle = () => {
    const clrs = [
      '#1d76f2', 
      '#94b510', 
      '#e32932', 
      '#517b7d', 
      '#52114e', 
      '#000'
    ];

    const x = clrs.findIndex(i => {
      return this.state.todos[this.state.todos.length - 1].color === i
    });
    return clrs[x] === clrs[clrs.length - 1] ? '#1d76f2' : clrs[x + 1]
  }

  handlePlus = () => {
    const newItems = JSON.parse(JSON.stringify(Items));
    newItems[0].color = this.logoColorHandle();

    this.setState(prev => {
      return prev.todos.push(newItems[0])
    });
  }

  handleInput = (event, e, val) => {
    event.persist();
    this.setState(prev => {
      return prev.todos.map(i => {
        if (e === i) {
          i[val] = event.target.value;
        }
        return i
      })
    });
  }

  handleDown = e => {
    const getDOMHeight = selector => {
      return window.getComputedStyle(document.querySelector(selector)).getPropertyValue("height")
    }

    const currentHeight = getDOMHeight(`.class_card${e.id}`); 
    const wouldBeHeight = currentHeight === '0px' ? getDOMHeight(`.class_area${e.id}`) : '0px';

    const dropDownTrans = () => {
      document.querySelector(`.class_card${e.id}`).style.height = currentHeight;
      this.setState(prev => prev.todos.map(i => i.downBtn = !i.downBtn));   // disable down button
      setTimeout(() => {
        document.querySelector(`.class_card${e.id}`).style.height = wouldBeHeight;
      }, 0);
      setTimeout(() => {
        this.setState(prev => {
              return prev.todos.map(i => {
                if (e.prps === i) {
                  i.menu = wouldBeHeight === '0px' ? '0px' : 'auto';
                }
                return i
              });
            }, this.setState(prev => prev.todos.map(i => i.downBtn = !i.downBtn)))  // enable down button
      }, 500)
    }
    dropDownTrans();
}

  handleDel = e => {
    const newArr = [...this.state.todos];
    if (newArr.length > 1) {
      newArr.splice(e, 1);
      this.setState({todos: newArr});
    }
  }

  onDragEnd = result => {
    const {destination, source} = result;

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const arr = [...this.state.todos];
    const splce = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, splce[0]);
    this.setState({todos: arr});
  }

  render() {
    const arrItems = this.state.todos.map((item, index) => <Item 
                                                    key={index} 
                                                    id={index}
                                                    prps={item} 
                                                    del={this.handleDel}
                                                    inpt={this.handleInput}
                                                    down={this.handleDown}
                                                  />);
    
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
      <div className="App">
        <div className="iphone-top"></div>
        <div className="screen">
          <Column arr={arrItems} />
        </div>
          <button className="btn" onClick={this.handlePlus}>+</button>
        </div>
      </DragDropContext>
    )
  }
}

export default App;
