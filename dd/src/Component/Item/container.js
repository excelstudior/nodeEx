import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }

    render() {
        return (
            <div></div>
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {
        
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Item);
