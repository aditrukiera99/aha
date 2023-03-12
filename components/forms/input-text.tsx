import React from 'react'

export interface inputInterface {
  name: string
  value?: number | string
  type?: string
  placeholder?: string
  label?: string
  classDiv?: string
  className?: string
  disabled?: boolean
  onChange?: any
  onBlur?: any
  onKeyUp?: any
  onKeyDown?:any
  containerClass?: string
}

const InputText = (
  props: inputInterface = {
    name: '',
    disabled: false,
  },
) => {
  const changeEvent = (event: any) => {
    const value = event.target.value
    if (props.onChange != null && props.onChange != undefined) {
      props.onChange(value)
    }
  }

  let classDiv = 'mb-4 '
  classDiv += props.classDiv != undefined ? props.classDiv : ''

  let className =
    'w-full border rounded-md border-chroma-dark placeholder:text-chroma-dark px-3 py-1.5 text-chroma-darkest '
  className += props.className != undefined ? props.className : ''
  return (
    <div className={classDiv}>
      {props.label != undefined && <p className="mb-2">{props.label}</p>}
      <input {...props} className={className} onChange={(value) => changeEvent(value)} autoFocus/>
    </div>
  )
}

export default InputText
