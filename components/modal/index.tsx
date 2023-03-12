import React, { useRef } from 'react'
import { Card } from '../tools/card/card'
import { createPortal } from 'react-dom'

export interface modalInterface {
  show: boolean
  childrens?: any
  title?: any
  body?: any
  footer?: any
  selector?: any
}

const Modal = (props: modalInterface) => {
  const modalRef = useRef(null)
  const isModalShown = props.show ? '' : 'hidden'

  if (!props.show) return null

  const modalContent = () => (
    <div
      ref={modalRef}
      className={
        'bg-[#0000005a] fixed top-0 left-0 right-0 bottom-0 z-50 overflow-hidden' + isModalShown
      }>
      <div className="absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12">
        <Card className="" padding="p-0">
          <div className="font-bold text-lg text-center border-b border-dotted border-black py-3">
            {props.title}
          </div>
          <div className="m-4">{props.body}</div>
          <div className="text-right border-t border-t border-dotted border-black p-4 pb-0 flex flex-row gap-2 justify-end">
            {props.footer}
          </div>
        </Card>
      </div>
    </div>
  )

  const portalContainer = document.getElementById('modalPortal')
  return portalContainer ? createPortal(modalContent(), portalContainer) : null
}

export default Modal
