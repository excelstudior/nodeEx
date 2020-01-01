import { UPDATE_PENGDING_OBJECT, 
    ADD_BIN,ADD_ITEM,
    RESET_PENDING_OBJECT,
    SET_MASTER_BIN, 
    TOOGLE_LOCK_MASTER_BIN,
    ADD_ITEM_TO_BIN,
    UPDATE_ITEM_AMOUNT} from './constant';
    
export const updatePendingObject = ( details )=>({
    type:UPDATE_PENGDING_OBJECT,
    payload:details
})
export const addBin = ( bin )=>({
    type:ADD_BIN,
    payload:bin
})
export const addItem = (item)=>({
    type:ADD_ITEM,
    payload:item
})
export const resetPendingObject = (objectType)=>({
    type:RESET_PENDING_OBJECT,
    payload:objectType
})
export const setMasterBin = (bin)=>({
    type:SET_MASTER_BIN,
    payload:bin
})

export const toggleLockMasterBin = () =>({
    type:TOOGLE_LOCK_MASTER_BIN
})
export const addItemToBin = (item,bin) =>({
    type:ADD_ITEM_TO_BIN,
    payload:{item,bin}
})
export const updateItemAmount =(amount,item,bin)=>({
    type:UPDATE_ITEM_AMOUNT,
    payload:{ amount,item,bin }
})