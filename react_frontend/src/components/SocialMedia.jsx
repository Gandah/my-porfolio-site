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
            <a href="https://twitter.com/mr_g4nderson?t=A5NobjZab2sVEdh3Zq9s0A&s=09" target="_blank">
                <FaXTwitter />
            </a>    
        </div>
    </div>
  )
}

export default SocialMedia