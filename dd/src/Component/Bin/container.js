import React from 'react';
import { connect } from 'react-redux';
import { setMasterBin } from '../action';
import AddEntityCtrl from '../Common/AddEntity';
import './bin.css';
import Add from '../../../Static/Image/add48.png';
import { COMPONENT_TYPE_BIN,COMPONENT_TYPE_ITEM } from '../constant';
import { updatePendingObject,addItem,resetPendingObject,addItemToBin,updateItemAmount }from '../action'
import Capsule from '../Capsule/capsule';
import { DropTarget } from 'react-dnd';
import {TYPE_CAPSULE} from '../constant';


function doesItemExistInBin(itemName,bin) {
    let binItemNames= bin.capsules.map((capsule)=>{
        return capsule.name
    })
    return binItemNames.indexOf(itemName)>-1
}
const binTarget = {
    hover( props,monitor,component ){
        let targetBinName=props.name;
        let sourceCapsule=monitor.getItem();
        if (targetBinName == sourceCapsule.parent.name){           
            return
        }  

        
    },
    drop ( props,monitor,component ){
        
        let targetBinName=props.name;
        let sourceCapsule=monitor.getItem();
        if (targetBinName == sourceCapsule.parent.name){
            alert("Can't drop in the same bin")
            return
        }

        let targetBin=props.self;
        let droppedCapsuleName=sourceCapsule.item.name;
        let sourceBin=sourceCapsule.parent;
       
        let existItem=doesItemExistInBin(droppedCapsuleName,targetBin);

        if (!existItem){
            let newBinItem={};
            newBinItem.name=droppedCapsuleName;
            newBinItem.amount=1;
            props.updateItemAmount(1,droppedCapsuleName,sourceBin,null)
            props.addItemToBin(newBinItem,targetBin)
            return
        
        }
        props.updateItemAmount(1,droppedCapsuleName,sourceBin,targetBin)
    }
}

function collect (connect,monitor){
    return{
        connectDropTarget:connect.dropTarget(),
        hovered:monitor.isOver(),
        item:monitor.getItem()
    }
}

class Bin extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    setMaster = ()=> {
        this.props.setMasterBin(this.props.self)
    }

    doesEntityExist = (type,name) =>{
        switch (type){
            case COMPONENT_TYPE_BIN:
                let binNames=this.props.bins.map((bin)=>{
                    return bin.name
                })
                return binNames.indexOf(name)>-1;
            case COMPONENT_TYPE_ITEM:
                let itemNames=this.props.items.map((item)=>{
                    return item.name
                })
                return itemNames.indexOf(name)>-1;
            default:
                return false
        }
        
    }
    getPendingObjName = (type) =>{
        let pendingObj=this.props.pendingObjs;      
        return pendingObj[type]
    }
    addItem =()=>{
        
        let pendingItemName=this.getPendingObjName(COMPONENT_TYPE_ITEM)
        if (Object.keys(this.props.masterBin).length<0 && !this.props.isMasterBinLocked){
            alert('Please lock master bin')
            return 
        }
        if(pendingItemName==''||pendingItemName==undefined) {
            alert("Item name can't be empty")
            return
        } else if (!this.doesEntityExist(COMPONENT_TYPE_ITEM,pendingItemName)){
            let pendingItem={}
            pendingItem.name=pendingItemName;
           
            this.props.addItem(pendingItem,COMPONENT_TYPE_ITEM);
            this.props.addItemToBin(pendingItem,this.props.self)
        } else {
            alert('Item name exist')
            return
        }
    }
    updatePendingChange = (event)=>{
        let details = {};
        let key=event.target.name;
        let value=event.target.value;
        details[key]=value;
       
        this.props.updatePendingChange(details)
    }
    renderAddItemCtrl = ()=>{
        let pendingItemName=this.getPendingObjName(COMPONENT_TYPE_ITEM)
        return <AddEntityCtrl onTextChange={this.updatePendingChange} 
                                inputValue={pendingItemName !=undefined ? pendingItemName :''}
                                add={this.addItem} 
                                image={Add}
                                entityName={COMPONENT_TYPE_ITEM}/>
    }
    render() {
        const { connectDropTarget } =this.props;
        return connectDropTarget(
            <div className='bin'>
                {this.props.self.isMaster && this.renderAddItemCtrl()}
                <p>{this.props.name}</p>
                {this.props.self.capsules.length>0 &&
                this.props.self.capsules.map((capsule,i)=>{
                    return <Capsule key={i} item={capsule} parent={this.props.self}/>
                })}
                {this.props.children}
                {(!this.props.isMasterBinLocked && !this.props.self.isMaster) && <button id='setMasterBin' onClick={this.setMaster}>Set Master</button> } 
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        items:state.common.items,
        bins:state.common.bins,
        pendingObjs:state.common.pendingObjs,
        masterBin:state.common.masterBin,
        isMasterBinLocked:state.common.isMasterBinLocked
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setMasterBin:( bin )=>dispatch(setMasterBin(bin)),
        updatePendingChange: ( details )=>dispatch(updatePendingObject( details )),
        addItem:( item,type ) => {
            dispatch( addItem(item) )
            dispatch (resetPendingObject(type))},
        addItemToBin:(item,bin)=>{dispatch(addItemToBin(item,bin))},
        updateItemAmount:(amount,itemname,sourceBin,targetBin)=> { dispatch(updateItemAmount(-(amount),itemname,sourceBin)) 
                                                                    if (targetBin !=null){dispatch(updateItemAmount(amount,itemname,targetBin))}
                                                                   }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(DropTarget(TYPE_CAPSULE,binTarget,collect)(Bin));
