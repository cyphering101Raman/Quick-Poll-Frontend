import React from 'react'

const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${className} px-4 py- 2 rounded-lg $`} {...props}
    >{children}</button>
  )
}

export default Button