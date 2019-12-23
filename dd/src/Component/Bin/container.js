import React from 'react';
import { connect } from 'react-redux';
import { setMasterBin } from '../action';
import AddEntityCtrl from '../Common/AddEntity';
import './bin.css';
import Add from '../../../Static/Image/add48.png';
import { COMPONENT_TYPE_BIN,COMPONENT_TYPE_ITEM } from '../constant';
import { updatePendingObject,addBin,addItem,resetPendingObject,toggleLockMasterBin }from '../action'

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
        console.log('Add item')
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
            console.log(pendingItem)
            this.props.addItem(pendingItem,COMPONENT_TYPE_ITEM)
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
        console.log(this.props.self.isMaster)
        return (
            <div className='bin'>
                {this.props.self.isMaster && this.renderAddItemCtrl()}
                <p>{this.props.name}</p>
                {this.props.children}
                <button disabled={this.props.isMasterBinLocked} onClick={this.setMaster}>Set Master</button>
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
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Bin);
