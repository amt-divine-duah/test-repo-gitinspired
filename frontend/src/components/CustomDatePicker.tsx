import "../Styles/customDatePicker.scss";
import { useRef } from "react";

const CustomDatePicker = () => {
  const ref: any = useRef();
  return (
    <div className="customDatePicker">
      <input
        type="text"
        id="date"
        ref={ref}
        placeholder="dd/mm/yyyy"
        onFocus={() => (ref.current.type = "date")}
      />
    </div>
  );
};

export default CustomDatePicker;
