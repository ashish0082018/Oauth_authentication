import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

interface ApiResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Set up the SMTP protocol using Sendinblue's SMTP relay
    var transport = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com", // Use Brevo (Sendinblue) SMTP relay
      port: 587, // Recommended port for STARTTLS
      secure: false, // Use STARTTLS, not SSL directly
      auth: {
        user: process.env.MAIL_USER , // Your Sendinblue login email (not Gmail)
        pass: process.env.MAIL_PASS // Your SMTP API key from Sendinblue
      }
    });   

    const templatePath = path.join(process.cwd(), 'public', 'email-template.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders in the template with dynamic content
    emailTemplate = emailTemplate.replace('${username}', username).replace('${verifyCode}', verifyCode);

    const mailOptions = {
      from: 'av0082020@gmail.com', // Use a verified email address here
      to: email,
      subject: "Verification Code",
      html: emailTemplate
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent successfully.' };
    
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
