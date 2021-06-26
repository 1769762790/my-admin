import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const UserDetail = (props) => {
    useEffect(() => {
        console.log(props)
    }, [props])
    return (
        <div>
            用户详细信息{props.match.params.id}
        </div>
    );
}
 
export default withRouter(UserDetail);