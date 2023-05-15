export function lecturerInviteTemplate(
  lecturerId: string,
  verificationUrl: string,
  otp: string
) {
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
        <div style="width: 42rem; padding:0 4rem">Hi there!<br>
            <span>
                We are excited to welcome you to our online platform! You have been added as a lecturer.
                Below is your lecturer id. Click on the claim button to get started.
                <ul>
                    <li> staff ID is <b>${lecturerId}</b>.</li>
                </ul>
                Best regards,
            </span>
        </div>
        <a href="${verificationUrl}"style="color: white;
    border: 1px;
    background-color:  #5D34EC;
    align-self: center;
    padding: 0.5rem 3rem;
    border-radius: 8px;
    margin: 4rem auto;
    text-decoration: none;
    ">Claim Account</a>
    </div>
</body>`;

  return html;
}
