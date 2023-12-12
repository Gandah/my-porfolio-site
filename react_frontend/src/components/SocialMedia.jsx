import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
            <a href="https://www.linkedin.com/in/gandahkelvin" target="_blank">
            <FaLinkedinIn/> 
            </a>
        </div>
        <div>
            <a href="#" target="_blank">
                <FaXTwitter />
            </a>    
        </div>
    </div>
  )
}

export default SocialMedia