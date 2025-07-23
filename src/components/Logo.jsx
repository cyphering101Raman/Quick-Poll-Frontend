import React from 'react'

const Logo = ({width="100px",
  className=''
}) => {
  return (
    <>
        <img src="/Quick-Poll-Logo.png" alt="Logo" style={{width}}
        className={`${className} rounded-3xl`}/>
        </>
  )
}

export default Logo