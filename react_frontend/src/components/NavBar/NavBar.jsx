import { useState } from 'react';
import './NavBar.scss';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { navLinks } from '../../constants';
import { images } from '../../constants'


const NavBar = () => {

    const [toggle, setToggle] = useState(false);
  return (
    <nav className='app__navbar'>
        <div className='app__navbar-logo'> 
            <a href="/">
                <img src={images.logo} />
            </a>
        </div>
        <ul className='app__navbar-links'>
        
            {navLinks.map(
                (item) => (
                    <li
                        key={`link-${item.label}`}
                        className='app__flex p-text'
                    >
                        <a href={`${item.href}`}>
                            {item.label}
                        </a>
                    </li>
                )
            )}
        </ul>

        <div className='app__navbar-menu'>
            <HiMenuAlt4 
            onClick={() => setToggle(prevValue => !prevValue)}
            />
            {toggle && (
                <motion.div
                 whileInView={{x: [300, 0]}}
                 transaction={{duration: 0.85, ease: 'easeOut'}}
                >
                    <HiX
                    onClick={() => setToggle(prevValue => !prevValue)}
                    />
                    <ul>
                        {navLinks.map(
                            (item) => (
                            <li
                                key={`mobile-${item.label}`}
                                className='app__flex p-text'
                            >
                                <a href={`${item.href}`}
                                onClick={() => setToggle(prevValue => !prevValue)}
                                >
                                    {item.label}
                                </a>
                            </li>)
                        )}
                    </ul>
                </motion.div>)}

        </div>

    </nav>
  )
}

export default NavBar