const ValidationModal = () => {
  return (
    <div className="validation" id="validation">
      <ul>
        <p className="caution">You password must contain:</p>
        <li id="length">At least 8 Characters</li>
        <li id="lower">Lower case letters (a-z)</li>
        <li id="upper">Upper case letters (A-Z)</li>
        <li id="number">Numbers (0-9)</li>
      </ul>
    </div>
  );
};

export default ValidationModal;
