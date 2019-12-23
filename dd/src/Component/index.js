import React from 'react';
import { connect } from 'react-redux';
import Bin from  './Bin/container';
import AddEntityCtrl from './Common/AddEntity';
import './index.css';
import Add from '../../Static/Image/add48.png';
import { COMPONENT_TYPE_BIN,COMPONENT_TYPE_ITEM } from './constant';
import { updatePendingObject,addBin,addItem,resetPendingObject,toggleLockMasterBin }from './action'


class Board extends React.Component {
    constructor(props, context) {
        super(props, context);
        
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
    addBin = ()=>{
        
        let pendingBinName=this.getPendingObjName(COMPONENT_TYPE_BIN)
        if(pendingBinName==''||pendingBinName==undefined) {
            alert("Bin name can't be empty")
            return
        } else if (!this.doesEntityExist(COMPONENT_TYPE_BIN,pendingBinName)){
            let pendingBin={}
            pendingBin.name=pendingBinName;
            this.props.addBin(pendingBin,COMPONENT_TYPE_BIN)
        } else {
            alert('Bin name exist')
            return
        }
        
    }

   
    toggleLockMasterBin=()=>{
        this.props.toggleLock();
    }
    renderLockMasterBinButton=(toggle)=>{
        let status=this.props.isMasterBinLocked;
        let btnText=`${status?'Unlock':'Lock'} Master Bin`
        return <button onClick={toggle}>{btnText}</button>
    }
    updatePendingChange = (event)=>{
        let details = {};
        let key=event.target.name;
        let value=event.target.value;
        details[key]=value;
       
        this.props.updatePendingChange(details)
    }


    render() {
        let pendingBinName=this.getPendingObjName(COMPONENT_TYPE_BIN);
        return (
            <div> 
                <AddEntityCtrl onTextChange={this.updatePendingChange} 
                                inputValue={pendingBinName !=undefined ? pendingBinName :''}
                                add={this.addBin} 
                                image={Add}
                                entityName={COMPONENT_TYPE_BIN}/>
                {Object.keys(this.props.masterBin).length>0 
                    && this.renderLockMasterBinButton(this.toggleLockMasterBin)}
                <div className='bins'>
                    {this.props.bins.length>0 
                        && this.props.bins.map((bin,i)=>{
                        return <Bin name={bin.name} key={i} self={bin}/>
                    })
                    }
                </div>            
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
const mapDispatchToProps =(dispatch)=>( {
        toggleLock: ()=> dispatch(toggleLockMasterBin()),
        updatePendingChange: ( details )=>dispatch(updatePendingObject( details )),
        addBin:( bin,type ) => {
                            dispatch( addBin(bin) )
                            dispatch (resetPendingObject(type))},
        addItem:( item,type ) => {
                                dispatch( addItem(item) )
                                dispatch (resetPendingObject(type))},
                            
      
    
})
export default connect(mapStateToProps,mapDispatchToProps)(Board);

