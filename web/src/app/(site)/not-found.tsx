import { Cta } from '@/components/site/Cta'

export default function NotFound() {
  return (
    <section className="phero">
      <p className="phero__eyebrow">ERROR 404</p>
      <h1 className="phero__title">LOST IN<br />SPACE</h1>
      <div className="phero__foot"><p className="phero__text">This page does not exist, or it moved.</p><Cta href="/" label="back home" /></div>
    </section>
  )
}
