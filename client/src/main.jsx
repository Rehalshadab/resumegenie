import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.15 })

function observeScrollReveal() {
  document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => observer.observe(el))
}

const domObserver = new MutationObserver(observeScrollReveal)
domObserver.observe(document.body || document.documentElement, {
  childList: true, subtree: true,
})

document.addEventListener('DOMContentLoaded', observeScrollReveal)
setTimeout(observeScrollReveal, 500)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
