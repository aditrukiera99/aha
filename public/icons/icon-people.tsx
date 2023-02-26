function IconPeople({ color = "#5E6674", fill = false }) {
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
          fill="url(#paint0_linear_2304_6068)"
          fillRule="evenodd"
          d="M8.958 15.833s-1.042 0-1.042-.972 1.042-3.889 5.209-3.889c4.166 0 5.208 2.917 5.208 3.89 0 .971-1.041.971-1.041.971H8.957zM13.125 10c.829 0 1.623-.307 2.21-.854a2.821 2.821 0 00.915-2.063c0-.773-.33-1.515-.915-2.062a3.242 3.242 0 00-2.21-.854c-.829 0-1.624.307-2.21.854A2.822 2.822 0 0010 7.083c0 .774.33 1.516.915 2.063.586.547 1.381.854 2.21.854zM7.1 15.833a2.054 2.054 0 01-.225-.972c0-1.317.708-2.673 2.017-3.617a7.026 7.026 0 00-2.017-.272c-4.167 0-5.208 2.917-5.208 3.89 0 .971 1.041.971 1.041.971H7.1zM6.354 10c.69 0 1.353-.256 1.841-.712a2.351 2.351 0 00.763-1.718c0-.645-.274-1.263-.763-1.72a2.702 2.702 0 00-1.841-.711c-.69 0-1.353.256-1.841.712A2.351 2.351 0 003.75 7.57c0 .644.274 1.262.763 1.718C5 9.744 5.663 10 6.354 10z"
          clipRule="evenodd"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_2304_6068"
            x1="3.489"
            x2="14.095"
            y1="14.193"
            y2="2.232"
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
        d="M8.958 15.833s-1.041 0-1.041-.972 1.041-3.889 5.208-3.889 5.208 2.917 5.208 3.89c0 .971-1.041.971-1.041.971H8.958zM13.125 10c.829 0 1.624-.307 2.21-.854a2.822 2.822 0 00.915-2.063c0-.773-.33-1.515-.915-2.062a3.242 3.242 0 00-2.21-.854c-.829 0-1.624.307-2.21.854A2.821 2.821 0 0010 7.083c0 .774.33 1.516.915 2.063.586.547 1.381.854 2.21.854zM7.1 15.833a2.055 2.055 0 01-.225-.972c0-1.317.708-2.674 2.017-3.617a7.026 7.026 0 00-2.017-.272c-4.167 0-5.208 2.917-5.208 3.89 0 .971 1.041.971 1.041.971H7.1zM6.354 10c.69 0 1.353-.256 1.842-.712a2.351 2.351 0 00.762-1.719c0-.644-.274-1.262-.762-1.718a2.701 2.701 0 00-1.842-.712c-.69 0-1.353.256-1.841.712a2.351 2.351 0 00-.763 1.718c0 .645.274 1.263.763 1.72C5 9.743 5.663 10 6.354 10z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default IconPeople;