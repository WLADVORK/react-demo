/* eslint-disable no-undef */
import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {
  maxId = 1;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTodoItem('meow'),
        this.createTodoItem('meow1'),
        this.createTodoItem('meow228'),
      ],
    };
  }

  deleteItam = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      return {
        todoData: [...before, ...after],
      };
    });
  };

  AddItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };

  onToggleImportant = (id) => {
    this.setState(() => ({
      todoData: this.toogleProperty(id, 'important'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(() => ({
      todoData: this.toogleProperty(id, 'done'),
    }));
  };

  toogleProperty = (id, propName) => {
    const { todoData } = this.state;
    const arr = todoData;
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);

    return [...before, newItem, ...after];
  };

  createTodoItem(label) {
    console.log('adsad');
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done === true).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItam}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <AddItem onAdd={(text) => this.AddItem(text)} />
      </div>
    );
  }
}
