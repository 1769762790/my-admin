import React, { useEffect } from 'react';
import { useHistory,  } from 'react-router-dom';
const Redirect = () => {
    const history = useHistory()
    useEffect(() => {
        history.replace(history.location.state.path)
    }, [history])
    return (
        <div></div>
    );
}
 
export default Redirect;