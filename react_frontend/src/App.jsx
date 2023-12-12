import './App.scss';

import {About, Footer, Header, 
  Skills, Testimonial, Work } from './containers';
import { NavBar } from './components';

export default function App() {


  return (
    <main className='app'>
      <NavBar/>
      <Header/>
      <About />
      <Work/>
      <Skills/>
      <Testimonial/>
      <Footer/>
    </main>
  )
}


