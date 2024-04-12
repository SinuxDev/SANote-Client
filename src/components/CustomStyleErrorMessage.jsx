import { ErrorMessage } from "formik";
import PropTypes from "prop-types";

const CustomStyleErrorMessage = ({ name }) => {
  return (
    <div className="text-red-600 font-medium font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

CustomStyleErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomStyleErrorMessage;
