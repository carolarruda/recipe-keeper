const HomeIcon = ({ colour = "#64648C", fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0,0,256,256"
      width={"25px"}
 
      fillRule="nonzero"
    >
      <g
        fillOpacity="0.8"
        fill={fill}
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        style={{ mixBlendMode: 'normal' }}
      >
        <g transform="scale(16,16)">
          <path d="M8,1.32031l-7.33984,6.8125l0.67969,0.73438l0.66016,-0.61328v5.74609h5v-5h2v5h5v-5.74609l0.66016,0.61328l0.67969,-0.73437zM8,2.67969l5,4.64844v5.67188h-3v-5h-4v5h-3v-5.67187z"></path>
        </g>
      </g>
    </svg>
  );
};

export default HomeIcon;
