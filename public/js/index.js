window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('switchToFullscreen').addEventListener('click', e => {
    e.preventDefault()
    document.body.classList.add('fullscreen')
  })
  document.body.addEventListener('keydown', e => {
    if (e.keyCode !== 27) return
    document.body.classList.remove('fullscreen')
  })
})
