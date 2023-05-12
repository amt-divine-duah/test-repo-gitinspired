const ActionButton = (prop: {class: string ,name: string, handleClick: any}) => {
    return <button className={prop.class} onClick={prop.handleClick}>{prop.name}</button>;
  };
  
  export default ActionButton;
  