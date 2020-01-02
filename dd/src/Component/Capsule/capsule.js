import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './capsule.css'
import DOWN from '../../../Static/Image/svg_down.svg';
import UP from '../../../Static/Image/svg_up.svg';
import { updateItemAmount } from '../action';
import { findDOMNode } from 'react-dom';
import { DragSource, 
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,} from 'react-dnd';
import flow from 'lodash/flow';
import { TYPE_CAPSULE,TYPE_BIN} from '../constant';

const capsuleSource = {
    beginDrag(props){
        return props;
    },
    canDrag(props,monitor){
        if (props.item.amount<1){
            alert('Amount is zero,can be added to other bin')
           return false
        } else {
            return true
        }
    },
    endDrag(){
        
    }
}
function collectionSource (connect,monitor){
    return {
        connectDragSource:connect.dragSource(),
        connectDragPreview:connect.dragPreview(),
        isDragging:monitor.isDragging(),
    }
}

class Capsule extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    onAmountLessThanOne = () =>{
        alert('Amount is zero.')
    }

    onAmountChange = (event) =>{
        let amount=event.target.dataset.step;
        let name=event.target.dataset.itemname;
        this.props.updateItemAmount(amount,name,this.props.parent)
    }
    render() {
        const {isDragging,connectDragSource,item} = this.props;
        let onItemAmountReduce=parseInt(item.amount)>0? this.onAmountChange:this.onAmountLessThanOne;
        return (
            connectDragSource &&
            connectDragSource(<div className='capsule'>
                <ul>
                    <li><span>{item.amount}</span></li>
                    <li><span>{item.name}</span></li>
                    <li>
                        <img data-step={1} 
                             data-itemname={item.name} 
                             src={UP} 
                             onClick={this.onAmountChange}/>
                        <img data-step={-1} 
                             data-itemname={item.name} 
                             src={DOWN} 
                             onClick={onItemAmountReduce} />
                    </li>
                </ul> 
                    
                    
            </div>)
        );
    }
}
Capsule.propTypes = {
    parent:PropTypes.object,
    item:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        
    };
}
function mapDispatchToProps(dispatch) {
    return {
        updateItemAmount:(amount,itemname,bin)=> dispatch(updateItemAmount(amount,itemname,bin))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(flow(DragSource(TYPE_CAPSULE,capsuleSource,collectionSource))(Capsule));



