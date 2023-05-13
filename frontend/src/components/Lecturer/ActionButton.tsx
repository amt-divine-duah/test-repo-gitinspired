const ActionButton = (prop: {class: string ,name: string, handleButtonClick:any}) => {
    return <button className={prop.class} onClick={prop.handleButtonClick}>{prop.name}</button>;
  };
  
  export default ActionButton;
  