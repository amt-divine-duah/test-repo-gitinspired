import "../Styles/dropDown.scss";
import { useState } from "react";

const DropDown = () => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex]: any = useState(null);
  const [itemsList] = useState([
    {
      name: "JavaScript",
      value: "JavaScript",
    },
    {
      name: "Python",
      value: "Python",
    },
    {
      name: "C++",
      value: "C++",
    },
  ]);

  const handleToggleDropDown = () => {
    setIsDropDownVisible((prev) => !prev);
  };
  return (
    <div className="custom-dropdown">
      <div className="custom-dropdown-selection" onClick={handleToggleDropDown}>
        {selectedItemIndex !== null ? (
          itemsList[selectedItemIndex].name
        ) : (
          <span className="createAssignmentTitlePlaceholder">
            e.g. JavaScript
          </span>
        )}
        <div className="drop-down-arrow">
          <img src="/dropDownArrow.svg" alt="" />
        </div>
      </div>
      {isDropDownVisible === true && (
        <div className="items-holder">
          {itemsList.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => setSelectedItemIndex(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
