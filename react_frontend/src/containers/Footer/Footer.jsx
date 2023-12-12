import { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';

import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = () => {
    setLoading(true);


    const mutations = [{
      create: {
        _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message
    }
    }]

    fetch(`https://${import.meta.env.VITE_PROJECT_ID}.api.sanity.io/v2022-03-07/data/mutate/production`, {
  method: 'post',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_FORM_KEY}`
  },
  body: JSON.stringify({mutations})
})
  .then(response => response.json())
  // .then(result => console.log(result))
  .then(() => {
         setLoading(false);
        setIsFormSubmitted(true);
       })
  .catch(error => console.error(error))
  }

  return (
    <>
      <h2 className='head-text'>Contact me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:gandahkelvin33@gmail.com' className='p-text'>Email</a>
        </div>
        
        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile' />
          <a href='tel: +233263734641' className='p-text'>Call</a>
        </div>
      </div>
      
      {!isFormSubmitted ? (
        <form className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text' type='text' 
            placeholder='Name'
            name='username'
            value={username}
            onChange={handleChange}  />
          </div>
          <div className='app__flex'>
            <input className='p-text' type='email' 
              placeholder='Email'
              name='email'
              value={email}
            onChange={handleChange}  />
          </div>

          <div>
              <textarea
                className='p-text'
                placeholder='Your Message'
                value={message}
                name='message'
                onChange={handleChange}
              />
          </div>
          <button type='button' 
          onClick={handleSubmit}
          className='p-text'
          >
          {loading ? 'Sending..' : 'Send Message'}
          </button>
      </form>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
      
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);