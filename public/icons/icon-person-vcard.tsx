function IconPersonVcard({ color = "#5E6674", fill = false }) {
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
          d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
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
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="20"
    //   height="20"
    //   fill="none"
    //   viewBox="0 0 20 20"
    // >
    //   <path
    //     fill={color}
    //     fillRule="evenodd"
    //     d="M15.625 5.104H4.375a.938.938 0 00-.938.938v.937h13.126v-.937a.938.938 0 00-.938-.938zm.938 3.75H3.438v4.688a.937.937 0 00.937.937h11.25a.938.938 0 00.938-.937V8.854zM4.374 4.167A1.875 1.875 0 002.5 6.042v7.5a1.875 1.875 0 001.875 1.875h11.25a1.875 1.875 0 001.875-1.875v-7.5a1.875 1.875 0 00-1.875-1.875H4.375zm1.875 6.562h-.938a.937.937 0 00-.937.938v.937c0 .518.42.938.938.938h.937c.518 0 .938-.42.938-.938v-.937a.937.937 0 00-.938-.938z"
    //     clipRule="evenodd"
    //   ></path>
    //   </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    </svg>
  );
}

export default IconPersonVcard;
