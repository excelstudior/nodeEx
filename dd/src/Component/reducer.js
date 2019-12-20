import { UPDATE_PENGDING_OBJECT,
    ADD_BIN,ADD_ITEM,
    RESET_PENDING_OBJECT,
    SET_MASTER_BIN,
    TOOGLE_LOCK_MASTER_BIN } from './constant';
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
        default: return state;
    }
}
export default common