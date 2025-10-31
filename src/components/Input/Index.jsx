import React from 'react'

const CustomInputField = ({
    type,
    name,
    label,
    error,
    value,
    style,
    // toolTip,
    disabled,
    required,
    mainClass,
    className,
    placeholder,
    ToolTipClass,
    onBlurHandle,
    onChangeHandle,
}) => {
  return (
   <div>
     
      <input
      className='bg-amber-50 text-normal rounded-sm text-black py-2 my-2 p-2'
        placeholder={placeholder}
        type={type}
        name={name}                
        value={value}
        disabled={disabled}
        onBlur={onBlurHandle}        
        onChange={onChangeHandle}   
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  )
}

export default CustomInputField