import assetData from 'assetData'
import charaSpriteData from 'charaSpriteData'
const assets = {
  image: [
    // *
    ...assetData.images,
    // map_image/*
    ...assetData.mapImages,
    // face/*
    ...assetData.faces,
    // enemy/*
    ...assetData.enemies,
    // icon/*
    ...assetData.icons,
    // tileset/*
    ['tileset/room', './img/tilesets/extruded/room.png'],
    ['tileset/town', './img/tilesets/extruded/town.png'],
    ['tileset/forest', './img/tilesets/extruded/forest.png'],
    ['tileset/underpass', './img/tilesets/extruded/underpass.png'],
    ['tileset/catacomb', './img/tilesets/extruded/catacomb.png'],
    ['tileset/temple', './img/tilesets/extruded/temple.png'],
    ...assetData.tilesetImages
  ],
  audio: [
    ...assetData.se,
    ...assetData.bgm
  ],
  json: [
    ...assetData.tilesetTiles
  ],
  tilemapTiledJSON: [
    ...assetData.tilesetMaps
  ],
  spritesheet: [
    // *
    ['check', './img/check.ss.png', { frameWidth: 14, frameHeight: 13, endFrame: 2 }],
    ['virtual_button', './img/virtual_button.ss.png', { frameWidth: 100, frameHeight: 100, endFrame: 2 }],
    ['menu_icons', './img/menu_icons.ss.png', { frameWidth: 72, frameHeight: 72, endFrame: 4 }],
    ['weapon_abilities', './img/weapon_abilities.ss.png', { frameWidth: 18, frameHeight: 18, endFrame: 3 }],
    ['battle_effects', './img/battle_effects.ss.png', { frameWidth: 320, frameHeight: 320, endFrame: 6 }],
    ['tileset/door_gimmick', './img/tilesets/image/door_gimmick.ss.png', { frameWidth: 48, frameHeight: 66, endFrame: 3 }],
    ['tileset/door_gimmick_light', './img/tilesets/image/door_gimmick.ss.png', { frameWidth: 48, frameHeight: 33, endFrame: 7 }],
    // chara_sprite/*
    ...charaSpriteData
  ]
}
if (window.ASSET_HOST) {
  Object.keys(assets).map(k => assets[k]).forEach(arr => {
    const getReplacedPath = path => path.replace(/^\.\/(.*)/, `${window.ASSET_HOST}/$1`)
    if (Array.isArray(arr[1])) {
      arr[1].forEach((_, i) => {
        arr[1][i] = getReplacedPath(arr[1][i])
      })
    } else {
      arr[1] = getReplacedPath(arr[1])
    }
  })
}
console.log(assets)
export default assets
