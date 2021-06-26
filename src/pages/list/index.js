import React from 'react';
import RenderRoutes from '../../routes'
const List = (props) => {
    const { routes } = props
    return (
        <div>
            <RenderRoutes routes={routes}/>
        </div>
    );
}
 
export default List;