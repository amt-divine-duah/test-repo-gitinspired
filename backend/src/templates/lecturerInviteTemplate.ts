export function lecturerInviteTemplate(
  lecturerId: string,
  verificationUrl: string,
  otp: string
) {
  const html = `<body style="margin: 0;">
    <div class="header" style='display: flex; background-color: #363143;
    ;  height: 6rem; align-items: center; justify-content: center;
    margin-bottom: 4rem;'>
    <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/logo%20.png" alt="logo">
    </div>
    <main style="display: flex; flex-direction: column; align-items: center;
    gap: 4rem;">
        <img src="https://raw.githubusercontent.com/amt-divine-duah/assets-folder/main/cuate.png">
        <div style="width: 49rem;">Hi there!<br>
            <span>
                We are excited to welcome you to our online platform! You have been added as a lecturer.
                Below is your password and staff id. Click on the claim button to get started.
                <ul>
                    <li>generated password: <b>${otp}</b></li>
                    <li>staff ID is <b>${lecturerId}</b>.</li>
                </ul>
                    Best regards,
            </span>
        </div>
        <a href="${verificationUrl}" style="border: 1px; background-color:#5D34EC; text-decoration: none;
        ; 
        color: #fff; border-radius: 10px; padding: 0.4rem 2rem;">Claim Account</a>
    </main>
</body>`;

  return html;
}
