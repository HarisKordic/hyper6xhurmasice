import emailjs from "emailjs-com";

interface EmailData {
 email: string;
}

export const sendSubscriptionConfirmation = async (email: string): Promise<void> => {
 const emailData: EmailData = { email };

 try {
  const result = await emailjs.send(
   "service_n22s2i3",
   "template_bx0ebjw",
   emailData as unknown as Record<string, unknown>,
   "BW0F0gnitaFqBGkxQ"
  );
  console.log("Email sent successfully:", result.text);
 } catch (error) {
  if (error instanceof Error) {
   console.error("Error sending email:", error.message);
  } else {
   console.error("Unexpected error sending email:", error);
  }
  throw new Error("Failed to send subscription email.");
 }
};
