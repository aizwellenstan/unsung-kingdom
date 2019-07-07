export default (scene, dog, key) => {
  if (scene.storage.state.event.dogs[key] === 1) {
    dog.destroy()
  } else {
    dog.setDisplayName('ワンさん').setTapEvent().on('tap', wansan => {
      if (!scene.storage.state.event.dogs.started) {
        scene.talk([{ chara: wansan, text: 'ワン！' }])
      } else {
        scene.talk([{ chara: wansan, text: 'ワンワン！' }])
        scene.storage.state.event.dogs[key] = 1
        dog.destroy()
      }
    })
  }
}
