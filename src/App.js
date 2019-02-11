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

  handlePlus = () => {
    this.setState(prev => {
      return prev.todos.push({
        text: ['Name', 'Info'],
        finished: false,
        valueName: '',
        valueText: '',
        drag: true,
        menu: false,
        color: this.logoColorHandle()
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
      this.setState({todos: newArr}, 
        () => {this.setState({todos: this.editStateDropdownTransit(false)},
        () => {setTimeout(() => {this.setState({todos: this.editStateDropdownTransit(true)})}, 500)})
      });
    }
  }

  editStateDropdownTransit = (onOrOff) => {
      const arr = [...this.state.todos];
      arr.forEach(i => i.drag = onOrOff);
      return arr
  }

  onDragStart = () => {
    this.setState({todos: this.editStateDropdownTransit(false)});
  }

  onDragEnd = result => {
    const {destination, source} = result;

    if (!destination) {
      this.setState({todos: this.editStateDropdownTransit(true)});
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      this.setState({todos: this.editStateDropdownTransit(true)})
      return
    }

    const arr = [...this.state.todos];
    const splce = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, splce[0]);

    this.setState({todos: arr}, () => {
      setTimeout(() => {this.setState({todos: this.editStateDropdownTransit(true)})}, 500)
    });
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
