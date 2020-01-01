import { UPDATE_PENGDING_OBJECT,
    ADD_BIN,ADD_ITEM,
    RESET_PENDING_OBJECT,
    SET_MASTER_BIN,
    TOOGLE_LOCK_MASTER_BIN,
    ADD_ITEM_TO_BIN,
    UPDATE_ITEM_AMOUNT } from './constant';

const initialState = { 
    items:[],
    bins:[],
    pendingObjs:{},
    masterBin:{},
    isMasterBinLocked:false
}
const common = ( state=initialState,action ) =>{
    switch ( action.type ) {
        case UPDATE_PENGDING_OBJECT :
            let details = action.payload
            let updates = Object.assign({},state.pendingObjs,details)
            return { ...state,pendingObjs:updates };
        case ADD_BIN:
            let bin=action.payload
            //add some default value to the bin
            bin.isMaster = false;
            bin.capsules = [];
            return { ...state,bins:[...state.bins,bin]};

        case ADD_ITEM:
            let item=action.payload
            //add some default value to the bin
            item.amount = 0;
            return { ...state,items:[...state.items,item]};
        case RESET_PENDING_OBJECT:
            let objectType=action.payload
            let updatedPendingObjs=state.pendingObjs;
            delete updatedPendingObjs[objectType];
            console.log(updatedPendingObjs)
            return state;
        case SET_MASTER_BIN:
            let masterBin=action.payload;
            let newBins=state.bins.map((bin)=>{
                if ( bin.isMaster){
                    bin.isMaster = false
                }
                if( bin.name==masterBin.name ){
                    bin.isMaster = true;
                } 
                return bin
            })
            return { ...state,bins:newBins,masterBin };
        case TOOGLE_LOCK_MASTER_BIN:
            return { ...state,isMasterBinLocked:!state.isMasterBinLocked}
        case ADD_ITEM_TO_BIN:
            let saveitem=action.payload.item;
            let toBin=action.payload.bin;
            let capsules=[...toBin.capsules,saveitem];
            let updatedBin={...toBin,capsules};
            let newState={};
            if (updatedBin.isMaster){
                newState={...state,masterBin:updatedBin}
            }
            let bins=state.bins.map((bin)=>{
                if(bin.name==toBin.name){
                   return updatedBin;
                }
                return bin
            })
            return {...newState,bins}
        case UPDATE_ITEM_AMOUNT:
            let itemName=action.payload.item;
            let amount=action.payload.amount;
            let targetBin=action.payload.bin;
            console.log(itemName,amount,targetBin);
            let newCapsules=targetBin.capsules.map((capsule)=>{
                if(capsule.name==itemName){
                    capsule.amount=parseInt(capsule.amount)+parseInt(amount);
                }
                return capsule
            })
            targetBin={ ...targetBin,capsules:newCapsules }
            
            let updatedBins=state.bins.map((bin)=>{
                return bin.name==targetBin.name ? targetBin : bin
            })
            return { ...state,bins:updatedBins}
        default: return state;
    }
}
export default common