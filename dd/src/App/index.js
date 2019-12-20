import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Board from '../Component/index';
class App extends Component {
    render() { 
        return ( 
            <Provider store = { store } >
                <Board/>
            </Provider> 
            
        )
    }
}
 
export default DragDropContext(HTML5Backend)(App);