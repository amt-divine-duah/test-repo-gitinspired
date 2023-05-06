export function confirmAccountTemplate(
  email: string,
  verificationUrl: string,
  otp: string
) {
  const html = `<p>Dear ${email},</p>
    <p>Welcome to <b>Your school's Assignment Submission System (ASS)</b>!</p>
    <p>To confirm your account please 
        <a href="${verificationUrl}">click here</a>.
    </p>
    <p>Alternatively, you can paste the following link in your browser's address bar:</p>
    <p>${verificationUrl}</p>
    <p>The following is your One-Time Password for logging into the system: <b>${otp}</b>. You will be required to change this upon account activation.</p>
    <p>Please do not share your OTP or verification link with anyone</p>
    <p>Sincerely,</p>
    <p>AMT Git Inspired team</p>
    <p><small>Note: replies to this email address are not monitored.</small></p>`;

  return html;
}
