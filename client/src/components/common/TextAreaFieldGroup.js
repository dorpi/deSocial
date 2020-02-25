import React from 'react'
import classnames from 'classnames';
import PropsTypes from 'prop-types'


const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    
}) => {
    return (
        <div className="form-group">
            <textarea 
                className={classnames('form-control form-control-lg', { 'is-invalid': error })}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                 />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}

        </div>


    )
}
TextAreaFieldGroup.PropsType =  {
    name:PropsTypes.string.isRequired,
    value:PropsTypes.string.isRequired,
    placeholder:PropsTypes.string,
    info:PropsTypes.string,
    error:PropsTypes.string,
    onChange: PropsTypes.func.isRequired,
  
}


export default TextAreaFieldGroup;