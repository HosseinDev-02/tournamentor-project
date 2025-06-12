import React from 'react'

function OverLay({ show, setShow, className }) {
  return (
    <div onClick={() => setShow(false)} className={`fixed z-40 inset-0 bg-background/30 transition-all duration-300 ${show ? 'visible opacity-100' : 'invisible opacity-0'} ${className}`}></div>
  )
}

export default OverLay