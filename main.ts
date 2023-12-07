namespace SpriteKind {
    export const chimney = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.chimney, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    santa.vy = -40
})
function make_text () {
    present_text = textsprite.create(convertToText(presents_to_deliver), 3, 1)
    present_text.right = 160
    present_text.bottom = 120
    present_text.z = 10
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.allOfKind(SpriteKind.Projectile).length < 1) {
        present = sprites.create(assets.image`present`, SpriteKind.Projectile)
        present.setPosition(santa.x - 5, santa.y + 5)
        present.vy = santa.vy
        present.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
function spawn_chimney () {
    chimney = sprites.create(assets.image`chinmey`, SpriteKind.chimney)
    chimney.left = 159
    chimney.bottom = 120
    chimney.vx = -40
    timer.after(randint(1000, 3000), function () {
        spawn_chimney()
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (santa, bird) {
    info.changeLifeBy(-1)
    bird.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.chimney, function (sprite, otherSprite) {
    presents_to_deliver += -1
    present_text.setText(convertToText(presents_to_deliver))
    if (presents_to_deliver < 1) {
        game.gameOver(true)
    }
    info.changeScoreBy(1000)
    sprites.destroy(sprite)
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    if (sprite.top > 120) {
        info.changeScoreBy(-1500)
    }
})
function move () {
    if (controller.up.isPressed()) {
        santa.vy += speed_up * -1
    } else if (controller.down.isPressed()) {
        santa.vy += speed_up
    }
    santa.vy = santa.vy * slow_down
}
let bird: Sprite = null
let chimney: Sprite = null
let present: Sprite = null
let present_text: TextSprite = null
let presents_to_deliver = 0
let slow_down = 0
let speed_up = 0
let santa: Sprite = null
santa = sprites.create(assets.image`santa`, SpriteKind.Player)
santa.setFlag(SpriteFlag.BounceOnWall, true)
santa.scale = 1.5
santa.x = 30
santa.z = 5
santa.startEffect(effects.trail)
speed_up = 3
slow_down = 0.99
info.setLife(3)
effects.blizzard.startScreenEffect()
scroller.setLayerImage(0, assets.image`background`)
scroller.setLayerImage(1, assets.image`houses back`)
scroller.setLayerImage(2, assets.image`houses`)
scroller.scrollBackgroundWithSpeed(-15, 0, 0)
scroller.scrollBackgroundWithSpeed(-35, 0, 1)
scroller.scrollBackgroundWithSpeed(-40, 0, 2)
timer.after(randint(1000, 3000), function () {
    spawn_chimney()
})
presents_to_deliver = 30
info.startCountdown(120)
make_text()
game.onUpdate(function () {
    move()
    info.changeScoreBy(1)
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.vy += 3
    }
})
game.onUpdateInterval(1000, function () {
    bird = sprites.create(assets.image`bird`, SpriteKind.Enemy)
    animation.runImageAnimation(
    bird,
    assets.animation`bird anim`,
    75,
    true
    )
    bird.left = 159
    bird.y = randint(10, 110)
    bird.vx = -75
})
