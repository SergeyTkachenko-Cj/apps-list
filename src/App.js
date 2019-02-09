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

  handleTick = e => {
    this.setState(prev => {
      return prev.todos.map(i => {
        if (e === i) i.finished = !i.finished;
        return i
      });
    });
  }

  handlePlus = () => {
    this.setState(prev => {
      return prev.todos.push({
        text: ['Name', 'Info'],
        finished: false,
        valueName: '',
        valueText: '',
        drag: false,
        menu: false,
        color: this.logoColorHandle()
      });
    })
  }

  logoColorHandle() {
    const clrs = [
      '#1d76f2', 
      '#94b510', 
      '#e32932', 
      '#517b7d', 
      '#52114e', 
      '#cdd9a7'
    ];
    const x = clrs.findIndex(i => {
      return this.state.todos[this.state.todos.length - 1].color === i
    });
    return clrs[x] === clrs[clrs.length - 1] ? '#1d76f2' : clrs[x + 1]
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
    this.setState(prev => {
      return prev.todos.map(i => {
        if (e === i) i.menu = !i.menu;
        return i
      });
    });
  }

  handleDel = e => {
    const newArr = [...this.state.todos];
    if (newArr.length > 1) {
      newArr.splice(e, 1);
      this.setState(prev => {
        return {
          todos: prev.todos.filter(itm => newArr.indexOf(itm) > -1)
        }
      })
    }
  }

  onDragStart = result => {
    const {draggableId} = result;
    this.setState(prev => {
      return prev.todos.map((item, index) => {
        if (draggableId.toString() === index) item.drag = false;
        return item
      });
    });
  }

  onDragEnd = result => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const arr = [...this.state.todos];
    arr.forEach(i => i.drag = true);
    const splce = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, splce[0]);

    this.setState({todos: arr});
  }

  render() {
    const arrItems = this.state.todos.map((item, index) => <Item 
                                                    key={index} 
                                                    id={index}
                                                    prps={item} 
                                                    funcI={this.handleTick} 
                                                    funcII={this.handleDel}
                                                    funcIII={this.handleInput}
                                                    funcIV={this.handleUp}
                                                    funcV={this.handleDown}
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
