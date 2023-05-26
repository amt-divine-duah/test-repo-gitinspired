const Tooltip = (prop: { value: string }) => {
  return (
    <div className='tooltip ' id={prop.value}>
      <div className='tooltip-content'>
        <p className={prop.value}>email and password incorrect</p>
      </div>
    </div>
  );
};

export default Tooltip;
