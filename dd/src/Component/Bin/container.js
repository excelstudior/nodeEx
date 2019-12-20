import React from 'react';
import { connect } from 'react-redux';
import { setMasterBin } from '../action';

class Bin extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    setMaster = ()=> {
        this.props.setMasterBin(this.props.self)
    }
    render() {
        return (
            <div>
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
        isMasterBinLocked:state.common.isMasterBinLocked
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setMasterBin:( bin )=>dispatch(setMasterBin(bin))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Bin);
