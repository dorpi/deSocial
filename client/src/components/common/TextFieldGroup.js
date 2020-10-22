import React from 'react'
import classnames from 'classnames';
import PropsTypes from 'prop-types'


const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={type}
                className={classnames('form-control form-control-lg ', { 'is-invalid': error })}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                disabled={disabled} />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}

        </div>


    )
}
TextFieldGroup.PropsType =  {
    name:PropsTypes.string.isRequired,
    type:PropsTypes.string.isRequired,
    value:PropsTypes.string.isRequired,
    placeholder:PropsTypes.string,
    info:PropsTypes.string,
    error:PropsTypes.string,
    disabled:PropsTypes.string,
    onChange: PropsTypes.func.isRequired,
  
}

TextFieldGroup.defaultProps = {
    type:'text'
}

export default TextFieldGroup;