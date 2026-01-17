import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'

import heroImage from './assets/images/heroImage.jpg'
import blondHair from './assets/images/blondHari.png'
import helloGorgeous from './assets/images/helloGorgeous.png'
import productShelf from './assets/images/productSchelf.png'
import scissorCut from './assets/images/scissorCut.png'
import vintageSalon from './assets/images/vintageSalon.png'

const products = [
  'Kevin Murphy Hair products',
  'Loma Hair care products',
  'We carry a variety of professional hair care products',
]

const galleryImages = [
  { src: helloGorgeous, alt: 'Hello Gorgeous decor sign' },
  { src: vintageSalon, alt: 'Vintage Salon interior' },
  { src: blondHair, alt: 'Blonde hair styling' },
  { src: scissorCut, alt: 'Precision haircut' },
  { src: productShelf, alt: 'Professional product shelf' },
]

// ✅ helper component (NOT default export)
function RevealWindow({
  src,
  alt = '',
  windowVh = 20,     // window height (% of viewport)
  imageVh = 140,     // image track height (% of viewport) -> bigger = more to “scan”
  speed = 1.7,       // >1 = faster movement through image
  startAt = 0.75,
  className = '',
  style = {},
}) {
  const sectionRef = useRef(null)
  const imgWrapRef = useRef(null)

  const [metrics, setMetrics] = useState({ windowPx: 0, imagePx: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const section = sectionRef.current
      const imgWrap = imgWrapRef.current
      if (!section || !imgWrap) return

      setMetrics({
        windowPx: section.getBoundingClientRect().height,
        imagePx: imgWrap.getBoundingClientRect().height,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let rafId = 0

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0

        const section = sectionRef.current
        const imgWrap = imgWrapRef.current
        if (!section || !imgWrap) return

        const rect = section.getBoundingClientRect()
        const vh = window.innerHeight

        // progress 0..1 while section passes viewport
        // const total = vh + rect.height
        // const traveled = vh - rect.top
        // let progress = traveled / total
        // progress = Math.max(0, Math.min(1, progress))

        // Progress based on section CENTER crossing viewport CENTER
        const sectionCenterY = rect.top + rect.height / 2
        const viewportCenterY = vh / 2

        // When section center is below viewport center => negative
        // When it passes above => positive
        let progress = 0.5 + (viewportCenterY - sectionCenterY) / (vh + rect.height)
        progress = Math.max(0, Math.min(1, progress))

        // const overflow = Math.max(0, metrics.imagePx - metrics.windowPx)

        // let y = progress * overflow * speed
        // y = Math.max(0, Math.min(overflow, y))

        // imgWrap.style.transform = `translate3d(0, ${-y}px, 0)`

        const overflow = Math.max(0, metrics.imagePx - metrics.windowPx)

        // ✅ Offset so at progress=0.5 (section centered), we’re at startAt * overflow
        const base = startAt * overflow
        let y = base + (progress - 0.5) * overflow * speed

        y = Math.max(0, Math.min(overflow, y))
        imgWrap.style.transform = `translate3d(0, ${-y}px, 0)`

      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [metrics, speed])

  return (
    <section
      ref={sectionRef}
      className={`reveal-window ${className}`}
      style={{ height: `${windowVh}vh`, ...style }}
      aria-hidden="true"
    >
      <div
        ref={imgWrapRef}
        className="reveal-window__image"
        style={{ height: `${imageVh}vh` }}
      >
        <img src={src} alt={alt} draggable="false" />
      </div>
    </section>
  )
}

function App() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null)

  const openGallery = (index) => setActiveGalleryIndex(index)
  const closeGallery = () => setActiveGalleryIndex(null)

  const showNextImage = () => {
    setActiveGalleryIndex((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length
    )
  }

  const showPrevImage = () => {
    setActiveGalleryIndex((current) =>
      current === null
        ? galleryImages.length - 1
        : (current - 1 + galleryImages.length) % galleryImages.length
    )
  }
  return (

    <div className="app">
      <header className="site-header">
        <nav className="nav">
          <a className="logo" href="#top">
            Vintage Salon
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#team">Our Team</a>
            <a href="#plans">Plans</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            className="btn btn-primary"
            href="https://www.vagaro.com/vintagesalon100"
            target="_blank"
            rel="noreferrer"
          >
            Book Now
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow" style={{ '--delay': '0.05s' }}>
              An Indulgent Experience
            </p>
            <h1 className="reveal" style={{ '--delay': '0.1s' }}>
              Welcome to Vintage Salon
            </h1>
            <p className="lead" style={{ '--delay': '0.2s' }}>
              Taking Care of Your Needs with a full menu of hair, nail, and
              skincare services.
            </p>
               
            <div className="hero-actions" style={{ '--delay': '0.3s' }}>
              
              <a className="btn btn-primary" href="#services">
                Our Service Menu
              </a>
              <a className="btn btn-ghost" href="#contact">
                Our Doors Are Open
              </a>
            </div>
            <div className="hero-info" style={{ '--delay': '0.4s' }}>
              <div>
                <span className="label">Hours</span>
                <span>M-S: 9am-7pm By Appt.</span>
              </div>
              <div>
                <span className="label">Visit</span>
                <span>1039 Main st Klamath Falls, Or</span>
              </div>
              <div>
                <span className="label">Call</span>
                <span>541 273 8818</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-accent">We're Waiting For You!</div>
            <h2>Our Beauty Menu</h2>
            <p>Signature services with warm, classic styling.</p>
            <div className="pill-row">
              <span>Hair</span>
              <span>Nails</span>
              <span>Facials</span>
              <span>Lashes</span>
            </div>
          </div>
        </section>
          <RevealWindow
            src={heroImage}
            alt="Vintage Salon hero"
            windowVh={45}
            imageVh={160}
            speed={1.8}
          />
        <section id="services" className="section">
          <div className="section-heading">
            <h2 className="">Our Service Menu</h2>
            <p className="">
              Taking Care of Your Needs
            </p>
          </div>
          <div className="service-grid">
            <div
              className="service-card service-styling"
              style={{
                '--delay': '0s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_2213e3bbc1424e08835cb1dd8adc1e05~mv2.jpg/v1/fill/w_460,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2019-05-27_20_05_19.jpg")',
              }}
            >
              <h3>Styling</h3>
              <span>$30 & up</span>
            </div>
            <div
              className="service-card service-cutting"
              style={{
                '--delay': '0.05s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_1d28157ca22b41cb88c16d4f7605bc40~mv2.jpg/v1/fill/w_330,h_251,al_c,lg_1,q_80,enc_avif,quality_auto/textured%20bob.jpg")',
              }}
            >
              <h3>Cutting</h3>
              <span>$30 & up</span>
            </div>
            <div
              className="service-card service-coloring"
              style={{
                '--delay': '0.1s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/35ab053c4ca41f953ae1ff7783c2a616.jpg/v1/fill/w_420,h_320,al_c,lg_1,q_80,enc_avif,quality_auto/Glossy%20Blonde.jpg")',
              }}
            >
              <h3>Coloring</h3>
              <span>Starting at $90 and up</span>
            </div>
            <div
              className="service-card service-facials"
              style={{
                '--delay': '0.15s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/2c5ea0df86d745dbb67a788f51522112.jpg/v1/crop/x_0,y_0,w_5046,h_3840/fill/w_460,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Facial.jpg")',
              }}
            >
              <h3>Facials</h3>
              <span>$75 - $100</span>
            </div>
            <div
              className="service-card service-nails"
              style={{
                '--delay': '0.2s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_3147952813ae4e769ed3cae3817f3b66~mv2.jpg/v1/fill/w_388,h_295,al_c,lg_1,q_80,enc_avif,quality_auto/long%20coffin%20nails.jpg")',
              }}
            >
              <h3>Nails</h3>
              <span>$40 - $60</span>
            </div>
            <div
              className="service-card service-waxing"
              style={{
                '--delay': '0.25s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/290cf180b80a49759532aea6aeac8855.jpg/v1/fill/w_460,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Waxing.jpg")',
              }}
            >
              <h3>Waxing</h3>
              <span>$40 & up</span>
            </div>
            <div
              className="service-card service-brazilian"
              style={{
                '--delay': '0.3s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_2322b83b623c4dea8162030b26a782c5~mv2.jpg/v1/fill/w_460,h_350,al_c,lg_1,q_80,enc_avif,quality_auto/BB%20pic%202.jpg")',
              }}
            >
              <h3>Brazilian Blowout</h3>
              <span>$250 & up</span>
            </div>
            <div
              className="service-card service-lash-extensions"
              style={{
                '--delay': '0.35s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_d4185bea89294e3c85a3aa82527dd0ac~mv2.jpg/v1/fill/w_364,h_277,al_c,lg_1,q_80,enc_avif,quality_auto/lash-extension-2%2520types_edited.jpg")',
              }}
            >
              <h3>Lash Extensions</h3>
              <span>$150 & up</span>
            </div>
            <div
              className="service-card service-pedicure"
              style={{
                '--delay': '0.4s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_62f2372c07904545a044c40a8379e295~mv2.jpg/v1/fill/w_460,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/dark%20pedi%20pix.jpg")',
              }}
            >
              <h3>Pedicure</h3>
              <span>$40 & up</span>
            </div>
            <div
              className="service-card service-lash-lift"
              style={{
                '--delay': '0.45s',
                backgroundImage:
                  'url("https://static.wixstatic.com/media/57b0de_32a7373f277a4a3a84862326c2062227~mv2.jpg/v1/fill/w_460,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/facebook_1610923320448_67567021266508517.jpg")',
              }}
            >
              <h3>Lash Lift & Tint</h3>
              <span>$40 & up</span>
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery">
          <div className="section-heading">
            <h2 className="reveal">Salon Gallery</h2>
            <p className="reveal" style={{ '--delay': '0.1s' }}>
              A peek inside our space and signature moments.
            </p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className="gallery-item"
                style={{ '--delay': `${0.08 * index}s` }}
              >
                <button
                  className="gallery-button"
                  type="button"
                  onClick={() => openGallery(index)}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section split">
          <div className="split-text">
            <h2>A Full-Service Hair Salon</h2>
            <p>
              Vintage Salon blends classic styling with modern indulgence. From
              precision cutting to radiant color and skincare, every service is
              designed to feel personal, relaxed, and elevated.
            </p>
            <div className="inline-note">Our Doors Are Open</div>
          </div>
          <div className="split-panel" style={{ '--delay': '0.15s' }}>
            <h3>Signature Experience</h3>
            <ul>
              <li>Thoughtful consultation and service.</li>
              <li>Warm, welcoming environment.</li>
              <li>Elevated care for hair, nails, and skin.</li>
            </ul>
          </div>
        </section>

        <section id="products" className="section">
          <div className="section-heading">
            <h2 className="reveal">Our Beauty Products</h2>
            <p className="reveal">
              Your One-Stop Beauty Shop
            </p>
          </div>
          <div className="product-list">
            {products.map((item, index) => (
              <div
                key={item}
                className="product-item liftHover"
                style={{}}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="team" className="section">
          <div className="section-heading">
            <h2 className="">Our Beauty Crew</h2>
            <p className="">
              Owner/Stylist Nail tech and Esthetician
            </p>
          </div>
          <div className="team-card" >
            <div>
              <h3>Our Team</h3>
              <p>
                A tight-knit crew delivering classic technique and modern care
                in every appointment.
              </p>
            </div>
            <div className="team-accent">Vintage Salon</div>
          </div>
        </section>

        <section id="plans" className="section split">
          <div className="split-panel">
            <h3>Plans & Pricing</h3>
            <p>No plans available.</p>
            <p>
              Once there are plans available for purchase, you'll see them here.
            </p>
            <a className="text-link" href="#top">
              Back to Home Page
            </a>
          </div>
          <div className="split-text" style={{ '--delay': '0.15s' }}>
            <h2>Programs</h2>
            <p>No available programs.</p>
            <div className="inline-note">Ask about upcoming offerings.</div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-heading">
            <h2 className="reveal">Our Doors Are Open</h2>
            <p className="reveal" style={{ '--delay': '0.1s' }}>
              We're Waiting For You!
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card" style={{ '--delay': '0.15s' }}>
              <h3>Location</h3>
              <p>1039 Main st Klamath Falls, Or</p>
              <p>541 273 8818</p>
            </div>
            <div className="contact-card" style={{ '--delay': '0.2s' }}>
              <h3>Hours</h3>
              <p>M-S: 9am-7pm By Appt.</p>
              <p>Walk-ins welcome when available.</p>
            </div>
            <div className="contact-card" style={{ '--delay': '0.25s' }}>
              <h3>Connect</h3>
              <a href="https://www.facebook.com/vintagesalonkfalls" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href="https://www.instagram.com/vintagesalonkfalls/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://www.vagaro.com/vintagesalon100" target="_blank" rel="noreferrer">
                Book on Vagaro
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Vintage Salon - Klamath Falls, Oregon</p>
        <p>541 273 8818</p>
      </footer>

      {activeGalleryIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={closeGallery}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={closeGallery}>
              Close
            </button>
            <button className="lightbox-nav prev" type="button" onClick={showPrevImage}>
              Prev
            </button>
            <img
              src={galleryImages[activeGalleryIndex].src}
              alt={galleryImages[activeGalleryIndex].alt}
            />
            <button className="lightbox-nav next" type="button" onClick={showNextImage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
