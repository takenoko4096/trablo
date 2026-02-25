# trablo

“奴”を追加するアドオン

## Usage

### summon
```mcfunction
summon trablo:entity
```

### animation
```mcfunction
# wave
playanimation @n[type=trablo:entity] animation.trablo.wave

# walk
playanimation @n[type=trablo:entity] animation.trablo.walk
```

### component groups

#### brain
```mcfunction
# enable (default)
event entity @n[type=trablo:entity] trablo:enable_brain

# disable
event entity @n[type=trablo:entity] trablo:disable_brain
```
