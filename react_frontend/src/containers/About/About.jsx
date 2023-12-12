import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.scss';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../lib/client';



const About = () => {

  const [aboutData, setAboutData] = useState([])

  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "abouts"]';
        const data = await client.fetch(query);
        setAboutData(data); // Set the state with fetched data
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

  
  return (
    <>
      <h2 className='head-text'><span>Versatile</span> Solutions<br/>for a <span>Dynamic </span>World</h2>
    
      <div className='app__profiles'>
        {aboutData.map((about) => (
          <motion.div
            whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about._id}
          >
            <img src={urlFor(about.imgUrl).url()} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        )
        )
        }
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);