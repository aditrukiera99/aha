function IconCreditCard({ color = "#5E6674", fill = false }) {
  if (fill)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="url(#paint0_linear_2304_6156)"
          fillRule="evenodd"
          d="M2.5 6.167a2 2 0 012-2h11a2 2 0 012 2v7.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-7.25zm3.75 4.562h-.938a.938.938 0 00-.937.938v.937c0 .518.42.938.938.938h.937c.518 0 .938-.42.938-.938v-.937a.938.938 0 00-.938-.938zm10.313-3.75H3.438v1.875h13.124V6.98z"
          clipRule="evenodd"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_2304_6156"
            x1="4.141"
            x2="14.428"
            y1="13.835"
            y2="3.006"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1D21FF"></stop>
            <stop offset="1" stopColor="#52E2CB"></stop>
          </linearGradient>
        </defs>
      </svg>
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M15.625 5.104H4.375a.938.938 0 00-.938.938v.937h13.126v-.937a.938.938 0 00-.938-.938zm.938 3.75H3.438v4.688a.937.937 0 00.937.937h11.25a.938.938 0 00.938-.937V8.854zM4.374 4.167A1.875 1.875 0 002.5 6.042v7.5a1.875 1.875 0 001.875 1.875h11.25a1.875 1.875 0 001.875-1.875v-7.5a1.875 1.875 0 00-1.875-1.875H4.375zm1.875 6.562h-.938a.937.937 0 00-.937.938v.937c0 .518.42.938.938.938h.937c.518 0 .938-.42.938-.938v-.937a.937.937 0 00-.938-.938z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default IconCreditCard;
