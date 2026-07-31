import emailjs from '@emailjs/browser';
import { config } from '../config/env';

export const sendEmail = async (data, subject, message) => {
  const serviceId = config.emailjs.serviceId;
  const templateId = config.emailjs.templateId;
  const publicKey = config.emailjs.publicKey;

  if (!serviceId || !templateId || !publicKey) {
    const errorMsg = "EmailJS credentials are not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const templateParams = {
    subject: subject,
    message: message,
    from_name: data?.name || 'Website Subscriber',
    reply_to: data?.email || '',
    to_email: config.email,
    ...data
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
