import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import NeuralOS from '@/components/NeuralOS'
import Contact from '@/components/Contact'
import CyberCursor from '@/components/CyberCursor'

export default function Home() {
  return (
    <>
      <CyberCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <NeuralOS />
        <Contact />
      </main>
    </>
  )
}
