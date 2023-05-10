const ActionButton = (prop: {class: string ,name: string}) => {
    return <button className={prop.class}>{prop.name}</button>;
  };
  
  export default ActionButton;
  