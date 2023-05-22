import logger from '../configs/winstonConfig';

export default function generateEmail(info): string {
  const { Assignment, firstName, lastName } = info;
  let rows = '';
    // logger.info(info)
  Assignment.forEach((item) => {
    const { title, deadline, uniqueCode, students } = item;
    // logger.info(item);
    students.forEach((stud) => {
      const {  student, studentId } = stud;
      
      rows+=`
      <tr>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${studentId}</td>
      <td>${title}</td>
      <td>${deadline}</td>
      <td><a href="#">${uniqueCode}</a></td>
      </tr>
      `;
    });

  });
  

  const html = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">
  <body style="font-family: 'Work Sans', sans-serif;">
   

    <div style="border: 2px solid white;
    max-width: 60rem;
    margin: 0 auto;
    background: #fff;
    display: grid;">
        <div style="display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #363143;
    padding: 1.4rem 0;
    align-self: center;
    margin: 0 auto;
    width: 100%;" 
    height: fit-content;>
            <div class="logo-container">
        <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/logo%20.png" style="
        align-self: center;
        margin: 0 auto;
        ">
    </div>
        </div>
        <div style="display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: 1rem auto;">
            <div class="img-container" style="width: 15rem;">
        <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/cuate.png" alt="" style="width: 100%;">
    </div>
        </div>
  <p>Hello ${firstName} ${lastName},</p>
  
  <p>One or more students have made submissions for the following assignments:</p>
  
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Student ID</th>
        <th>Assignment Title</th>
        <th>Deadline</th>
        <th>Unique Code</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  
  <p>Thank you for your attention.</p>
  <p>Sincerely,<br> The Git Inspired Team</p>
</body>
</html>
`;
  return html;
}
