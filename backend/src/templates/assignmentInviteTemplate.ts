export function assignmentInviteTemplate(assignmentInfo, studentInfo) {
  const firstName = studentInfo.firstName;
  const lastName = studentInfo.lastName;
  const title = assignmentInfo.title;
  const deadline = assignmentInfo.deadline;
  const link = assignmentInfo.link;
  const uniqueCode = assignmentInfo.uniqueCode;
  const html = `
   <link rel="preconnect" href="https://fonts.googleapis.com">
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
    padding: 2rem 0;
    align-self: center;
    margin: 0 auto;
    width: 100%;" height: fit-content;>
            <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/logo%20.png" style="
    align-self: center;
    margin: 0 auto;
    ">
        </div>
        <div style="display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: 3.5rem auto;">
            <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/cuate.png" alt="">
        </div>
        <div style="width: 42rem; padding:0 4rem">${firstName} ${lastName}<br>
            <span>
                You have been invited to partake in this assignment, ${title} before ${deadline}. Use this ${uniqueCode} to submit your assignment.
            </span>
        </div>
        <a href="${link}"style="color: white;
    border: 1px;
    background-color:  #5D34EC;
    align-self: center;
    padding: 0.5rem 2.5rem;
    border-radius: 8px;
    margin: 4rem auto;
    text-decoration: none;
    ">View Assignment</a>
    </div>
</body>`;

  return html;
}
