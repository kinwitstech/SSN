import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useRouter } from "@tanstack/react-router";
import PropTypes from "prop-types";

const BackArrowButton = ({ to }) => {
  const { history } = useRouter();
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate({ to });
    } else {
      history?.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-[2.5rem] left-[2.5rem] text-primary text-xl cursor-pointer"
    >
      <ArrowLeftIcon className="h-6 w-6" />
    </button>
  );
};

BackArrowButton.propTypes = {
  to: PropTypes.string,
};

export default BackArrowButton;
