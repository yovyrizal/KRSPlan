import EmailVerificationView from "@/views/auth/EmailVerificationView.vue";
import axios from "axios";

const EmailVerification = async () => {
  try {
    const response = await axios.post (process.env.VITE_DATABASE_URL, {
      email: email,
      
    })
  } catch (error) {
    
  }  
};

export default EmailVerification;
