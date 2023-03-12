import { forwardRef } from "react";

// * Dipakai untuk reach hook form
// hanya support input, type apa aja bisa asalkan ada di input type
// nggak support select, multi radio, multi checkbox
// contohnya di teams => index.tsx

const FormInputHook = forwardRef((props: any, ref) => {
  const { label, className, errors, ...inputProps } = props;

  const rawClass = className ? className : 'border border-solid border-slate-400 rounded-sm py-1 px-2 w-full'
  const finalClass = rawClass + (errors ? ' focus:border-red-500 focus:ring-red-500 border-red-500' : '')

  return (
    <>
      <div className="formInput">
        <label>{label}</label>
        <input
          ref={ref}
          {...inputProps}
          className={finalClass}
        />
      </div>
      {errors && <span className='text-sm text-red-500'>{errors.message}</span>}
    </>
  );
});

export default FormInputHook;