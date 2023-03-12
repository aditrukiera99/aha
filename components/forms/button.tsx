import React from 'react'

export interface buttonInterface {
  classDiv?: string
  className?: string
  children?: any
  width?: string
  onClick?: any
  disabled?: boolean
  submitted?: boolean
  type?: 'danger' | 'alert' | 'success' | 'disabled' | 'primary'
}

const Button = (props: buttonInterface) => {
  const type = () => {
    switch (props.type) {
      case 'danger':
        return ' bg-danger text-white '
      case 'alert':
        return ' bg-alert text-white '
      case 'success':
        return ' bg-success text-white '
      case 'disabled':
        return ' bg-chroma-disabled text-chroma-darkest '
      case 'primary':
        return ' bg-vin-bright text-white '
      default:
        return ' bg-vin-bright text-white '
    }
  }

  const width = props.width != undefined && props.width != '' ? 'w-' + props.width : ''

  let classDiv = 'mb-4 '
  classDiv += props.classDiv != undefined ? props.classDiv : ''

  let className = width + type() + 'rounded-md py-1.5 px-3 hover:opacity-80 '
  className += props.className != undefined ? props.className : ''

  const clickEvent = () => {
    if (props.onClick != null) {
      props.onClick()
      return
    }

    console.log('Button Clicked, Please add event to button')
  }
  return (
    <div className={classDiv}>
      <button className={className} onClick={() => clickEvent()} disabled={props.disabled}>
        {props.submitted ? 'Please Wait...' : props.children}
      </button>
    </div>
  )
}

export default Button
