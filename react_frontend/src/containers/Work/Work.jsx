import { useState, useEffect } from 'react';
import './Work.scss';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../lib/client';



const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "works"]';
        const data = await client.fetch(query);
        setWorks(data); // Set the state with fetched data
        setFilterWork(data);
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

// Function to handle filter changes
const handleWorkFilter = (item) => {
  setActiveFilter(item);
  setAnimateCard([{ y: 100, opacity: 0 }]);
  // setAnimateCard(preValues => [{...preValues, y: 100, opacity: 0}]);
  
  // You can directly set the filter work here
  if (item === 'All') {
    setFilterWork(works);
  } else {
    setFilterWork(works.filter((work) => work.tags.includes(item)));
  }
};

// useEffect to manage timers
useEffect(() => {
  const timer = setTimeout(() => {
    setAnimateCard([{ y: 0, opacity: 1 }]);
  }, 500);

  // Cleanup function
  return () => clearTimeout(timer);
}, [activeFilter]); // Depend on activeFilter so the effect runs when it changes

  return (
    <section>
       <h2 className='head-text'>My <span>Portfolio</span></h2>

       <div className="app__work-filter">
        {['All', 'Web App', 'Mobile App', 'Cloud', 'Fullstack App', 'API'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork?.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={urlFor(work.imgUrl).url()} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);