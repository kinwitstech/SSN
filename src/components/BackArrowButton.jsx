import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "@tanstack/react-router";

const BackArrowButton = () => {
  const { history } = useRouter();
  return (
    <button
      onClick={() => history?.back()}
      className="absolute top-[2.5rem] left-[2.5rem] text-primary text-xl cursor-pointer"
    >
      <ArrowLeftIcon className="h-6 w-6" />
    </button>
  );
};

export default BackArrowButton;
