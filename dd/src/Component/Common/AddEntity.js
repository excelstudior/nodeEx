import React from 'react';
import './addEntity.css'

class AddEntity extends React.Component {
    constructor(props) {
        super(props);
        this.content = React.createRef();
    }



    editContent =()=>{
        console.log(this.content.current.className)
        this.content.current.className='entity-content-show'
    }

    saveContent =()=>{
        this.props.add()
        this.content.current.className='entity-content'
    }


    render() {
        let {add,image,onTextChange,entityName,inputValue} = this.props
        return (
            <div className='entity'>
                <img onClick={this.editContent} src={image}></img>
                <div ref={this.content} className='entity-content'>
                <input name={entityName} onChange={onTextChange} value={inputValue}/>
                <button name={entityName} onClick={this.saveContent}>SAVE</button>
                </div>
                
            </div>
        );
    }
}

export default AddEntity