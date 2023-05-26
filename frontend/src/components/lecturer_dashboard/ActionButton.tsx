import { ActionButtonType } from './LecturerCustomTypes';

const ActionButton = (prop: ActionButtonType) => {
  return (
    <button className={prop.class} onClick={prop.click} ref={prop.reference}>
      {prop.name}
    </button>
  );
};

export default ActionButton;
