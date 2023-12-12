import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../lib/client';
import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "testimonials"]';
        const data = await client.fetch(query);
        setTestimonials(data); // Set the state with fetched data
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    // IIFE to handle the async operation
    (async () => {
      try {
        const query = '*[_type == "brands"]';
        const data = await client.fetch(query);
        setBrands(data);
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);



  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(testimonials[currentIndex].imgurl).url()}
              alt='testimonial'
            />
            <div className='app__testimonial-content'>
              <p className='p-text'>{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className='bold-text'>{testimonials[currentIndex].name}</h4>
                <h5 className='p-text'>{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' 
            onClick={
              ()=> handleClick(currentIndex === 0 ?
               testimonials.length - 1 : currentIndex - 1 )}>
              <HiChevronLeft />
            </div>

            <div className='app__flex' 
            onClick={
              ()=> handleClick(currentIndex === testimonials.length - 1 ?
                0 : currentIndex + 1 )}>
              <HiChevronRight />
            </div>

          </div>
        </>
      )}

      <div className='app__testimonial-brands app__flex'>
                {brands.map((brand) => (
                  <motion.div
                    whileInView={{opacity: [0, 1]}}
                    transition={{ duration: 0.5, type: 'tween'}}
                    key={brand._id}
                  >
                    <img src={urlFor(brand.imgUrl).url()} alt={brand.name}/>
                  </motion.div>
                ))}

      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);