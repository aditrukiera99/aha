function IconHouse({ colorStart = "#1D21FF", colorStop = "#52E2CB" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="url(#paint0_linear_2157_7850)"
        fillRule="evenodd"
        d="M8.27 17.5v-4.044c0-.283.288-.571.576-.571h2.308c.288 0 .577.288.577.576V17.5a.577.577 0 00.577.577h4.615a.577.577 0 00.577-.577V9.423a.578.578 0 00-.169-.408L15.77 7.452V3.654a.577.577 0 00-.577-.577h-1.154a.577.577 0 00-.577.577v1.49l-3.053-3.053a.577.577 0 00-.816 0L2.668 9.015a.577.577 0 00-.168.408V17.5a.577.577 0 00.577.577h4.615a.577.577 0 00.577-.577z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_2157_7850"
          x1="4.141"
          x2="18.247"
          y1="15.805"
          y2="5.465"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colorStart}></stop>
          <stop offset="1" stopColor={colorStop}></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default IconHouse;
