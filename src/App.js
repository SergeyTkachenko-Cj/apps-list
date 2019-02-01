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
        text: 'Code',
        finished: false,
        valueName: '',
        valueText: ''
      });
    })
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
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <Column arr={arrItems} />
        <button className="btn" onClick={this.handlePlus}>+</button>
      </div>
      </DragDropContext>
    )
  }
}

export default App;
