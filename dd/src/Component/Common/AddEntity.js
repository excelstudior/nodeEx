import React from 'react';
const AddEntityCtrl =({add,onTextChange,entityName,inputValue})=>{
    return (
        <div>
            <input name={entityName} onChange={onTextChange} value={inputValue}/>
            <button name={entityName} onClick={add}>{'Add '+entityName}</button>
        </div>
    )
}

export default AddEntityCtrl