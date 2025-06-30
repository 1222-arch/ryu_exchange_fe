const BUTTON_TYPE_CLASSES = {
  google: 'bg-[#4285f4] text-white hover:bg-[#357ae8]',
  inverted: 'bg-white text-black border border-black hover:bg-black hover:text-white hover:border-transparent',
  default: 'bg-black text-white hover:bg-white hover:text-black hover:border-black',
};

const Button = ({ children, buttonType = 'default', ...otherProps }) => {
  return (
    <button
      className={`min-w-[165px] h-[50px] px-[35px] text-[15px] uppercase font-bold tracking-wide 
          font-["Open_Sans_Condensed"] flex justify-center items-center cursor-pointer border-none transition
          ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
