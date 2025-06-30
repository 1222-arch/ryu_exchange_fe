import React from "react";

const FormInput = ({ label, value, ...otherProps }) => {
  return (
    <div className="mt-6 w-full">
      {label && (
        <label
          className="block mb-1 text-gray-700 text-base font-medium"
          
        >
          {label}
        </label>
      )}
      <input
        className="bg-white text-gray-700 text-lg py-2 px-2 w-full border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
