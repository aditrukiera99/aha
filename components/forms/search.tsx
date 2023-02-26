import IconMagnifier from "../../public/icons/icon-magnifier";
import { IFormInput } from "../../ts/typing/interfaces";

const Search = (props: IFormInput) => {
  let className =
    "w-full border rounded-md border-grey placeholder:text-neutral-400 px-3 py-1.5 pr-10 text-secondary ";
  className += props.className != undefined ? props.className : "";

  return (
    <>
      {props.label != undefined && <p className="mb-2">{props.label}</p>}
      <div className="relative">
        <input {...props} className={className} />
        <button className="bg-chroma-lightest text-neutral-400 absolute top-[1px] right-[1px] border-l rounded-md border-grey w-9 flex justify-center h-9 items-center rounded-l-none">
          {<IconMagnifier />}
        </button>
      </div>
    </>
  );
};

export default Search;
