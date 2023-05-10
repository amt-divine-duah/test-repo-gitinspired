const Document = (prop: {file: string , key: number}) => {
    return (
     <>
         <tr>
          <td>
            <div className="document" key={prop.key}>
              {prop.file.includes('.') ?<img src="/fileIcon.png" alt="icon" /> : <img src="littleFolder.png" alt="icon" />} 
              <p>{prop.file}</p>
            </div>
          </td>
        </tr>
     </>
    );
  };
  export default Document;
  