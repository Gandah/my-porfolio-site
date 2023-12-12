import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../lib/client';
import './Skills.scss';

const Skills = () => {

  const [experience, setExperience] = useState([])
  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "experiences"]';
        const data = await client.fetch(query);
        setExperience(data); // Set the state with fetched data
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

  const [skills, setSkills] = useState([])
  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "skills"]';
        const data = await client.fetch(query);
        setSkills(data);
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

  return (
    <>
    <h2 className="head-text">Skills & Experience</h2>

    <div className="app__skills-container">
      <motion.div className="app__skills-list">
        {skills?.map((skill) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__skills-item app__flex"
            key={skill._id}
          >
            <div
              className="app__flex"
              style={{ backgroundColor: skill.bgColor }}
            >
              <img src={urlFor(skill.icon)} alt={skill.name} />
            </div>
            <p className="p-text">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="app__skills-exp">
        {experience?.map((experience) => (
          <motion.div
            className="app__skills-exp-item"
            key={experience._id}
          >
            <div className="app__skills-exp-year">
              <p className="bold-text">{experience.year}</p>
            </div>
            <motion.div className="app__skills-exp-works">
              {experience?.works?.map((work) => (
                <>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    key={work._id}
                  >
                    <h4 className="bold-text">{work.name}</h4>
                    <p className="p-text">{work.company}</p>
                  </motion.div>
                  <ReactTooltip
                    id={work.name}
                    data-tooltip-id={work.name}
                    data-tooltip-content={work.desc}
                    effect="solid"
                    arrowColor="#fff"
                    className="skills-tooltip"
                  />
                    
                </>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);