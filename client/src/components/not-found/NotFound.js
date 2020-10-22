import React from 'react';
import {Link} from 'react-router-dom';
export default ()=> {
    return (
        <div className="page0not-found text-center">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
            <h1 className="display-4 ">Page Not Found</h1>
            <p>Sorry, this page does not exist</p>
        </div>
    )
}
