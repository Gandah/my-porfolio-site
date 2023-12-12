import { NavigationDots, SocialMedia } from '../components';


const AppWrap = (Component, idName, classNames) => function HOC() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <section id={idName} className={`app__container ${classNames}`}>
        <SocialMedia/>

        <div className='app__wrapper app__flex'>
            <Component />

            <div className='copyright'>
                <p className='p-text link_text'>&copy;{currentYear} <a href='https://www.linkedin.com/in/gandahkelvin'> ganderson</a></p>
            </div>
        </div>

        <NavigationDots active={idName} />
    </section>
  )
}

export default AppWrap