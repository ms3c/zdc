import About from './components/About'
import Events from './components/Events'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Join from './components/Join'
import Programs from './components/Programs'
import Tracks from './components/Tracks'
import Voices from './components/Voices'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <Events />
        <Tracks />
        <Voices />
        <Join />
      </main>
      <Footer />
    </>
  )
}
