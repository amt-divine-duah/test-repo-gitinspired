import { useState } from 'react';

const FilterByDeadlineButton = () => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [itemsList] = useState([
    {
      name: 'Ascending',
      value: 'Ascending',
    },
    {
      name: 'Descending',
      value: 'Descending',
    },
  ]);

  const handleToggleDropDown = () => {
    setIsDropDownVisible((prev) => !prev);
  };
  return (
    <div className='custom-dropdown'>
      <div className='custom-dropdown-selection' onClick={handleToggleDropDown}>
        {selectedItemIndex !== null ? (
          itemsList[selectedItemIndex].name
        ) : (
          <span className='createAssignmentTitlePlaceholder'>Filter by deadline</span>
        )}
      </div>
      {isDropDownVisible === true && (
        <div className='items-holder'>
          {itemsList.map((item, index) => (
            <div key={index} className='dropdown-item' onClick={() => setSelectedItemIndex(index)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByDeadlineButton;
