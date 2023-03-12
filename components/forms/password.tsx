import React, { useMemo, useState } from 'react'
import IconEye from '../tools/icons/icon-eye'
import IconEyeOff from '../tools/icons/icon-eye-off'
import { inputInterface } from './input-text'

const Password = (props: inputInterface) => {
  let className =
    'w-full border rounded-md border-grey placeholder:text-neutral-400 px-3 py-1.5 pr-10 text-secondary '
  className += props.className != undefined ? props.className : ''
  const [typeInput, setTypeInput] = useState('password')
  const iconButton = useMemo(
    () => (typeInput == 'password' ? <IconEyeOff /> : <IconEye />),
    [typeInput],
  )

  const changeType = () => {
    if (typeInput == 'password') {
      setTypeInput('text')
      return
    }
    setTypeInput('password')
  }

  return (
    <div className="mb-4">
      {props.label != undefined && <p className="mb-2">{props.label}</p>}
      <div className="relative">
        <input {...props} className={className} type={typeInput}/>
        <button
          className="border-0 bg-transparent text-neutral-400 absolute top-2 right-3"
          onClick={() => changeType()}>
          {iconButton}
        </button>
      </div>
    </div>
  )
}

export default Password
