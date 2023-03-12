import React from 'react'

interface cardInterface {
  children: any
  padding?: string
  className?: string
}

export const Card = (props: cardInterface) => {
  let className = 'rounded-md bg-white relative border-primary ' + props.className
  className += props.padding != null ? ' ' + props.padding : ' px-6 py-7'
  return <div className={className}>{props.children}</div>
}


export const CardTargeting = (props: cardInterface) => {
  let className = 'rounded-md bg-white relative border-primary ' + props.className
  className += props.padding != null ? ' ' + props.padding : ''
  return <div className={className}>{props.children}</div>
}
