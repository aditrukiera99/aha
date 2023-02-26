import { Dispatch, SetStateAction } from "react";
import { ISurveyLists } from "../../ts/typing/interfaces";

type Paginate = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Paginate) => {
  return (
    <div className="grid grid-flow-col gap-4">
      <div className="text-left flex flex-row items-baseline">
        <div>Page </div>
        <div className="px-2">
          {/* <Dropdown
                  className="w-auto"
                  name="limit"
                  value={"10"}
                  objects={[
                    { value: 10, label: "10" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                    { value: 100, label: "100" },
                  ]}
                /> */}
          10
        </div>
        <div> data on page</div>
      </div>
      <div className="text-right flex flex-row items-center justify-end gap-2">
        {/* <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
                <IconChevronLeftDouble />
              </button>
              <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
                <IconChevronLeft />
              </button> */}
        <button className="w-6 h-6 bg-vin-bright text-chroma-white rounded-md pointer-events-none">
          1
        </button>
        <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
          2
        </button>
        <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
          3
        </button>
        <button className="hover:cursor-none pointer-events-none">...</button>
        <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
          10
        </button>
        {/* <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
                <IconChevronRight />
              </button>
              <button className="w-6 h-6 hover:bg-chroma-dark text-chroma-darkest hover:text-chroma-white-2 rounded-md">
                <IconChevronRightDouble />
              </button> */}
      </div>
    </div>
  );
};

export default Pagination;
