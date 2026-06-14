import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import TechStack from './components/sections/TechStack'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f1f0ff] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
