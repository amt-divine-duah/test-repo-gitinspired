const InformationArea = (prop: { image: string }) => {
  return (
    <div className='blue-box'>
      <div className='top-information'>
        <h2>A Git- Inspired Assignment submission system</h2>
        <p>
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
      </div>
      <div className='bottom-information'>
        <img src={prop.image} alt='laptop image' />
      </div>
    </div>
  );
};

export default InformationArea;
