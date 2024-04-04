import { ErrorMessage } from "formik";

const CustomStyleErrorMessage = ({ name }) => {
  return (
    <div className="text-red-600 font-medium font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

export default CustomStyleErrorMessage;
