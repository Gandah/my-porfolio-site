import { navLinks } from '../constants';


const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
            {navLinks.map(
                (item, index) => (
                        <a
                            href={`${item.href}`}
                           key={item.label + index}
                           className="app__navigation-dot"
                           style={active === item.label ? {backgroundColor: '#313BAC'} : {}}
                        />
                )
            )}
    </div>
  )
}


export default NavigationDots;