# trablo

“奴”を追加するアドオン

## Usage

### summon
```mcfunction
summon trablo:entity
```

### entity tags

#### `trablo:has_ai`
```
# AIが有効化されているときのみ自動付与、無効化されているとき自動削除
execute as @e[type=trablo:entity, tag=trablo:has_ai] ...
```

### scoreboard objectives

#### `trablo:variant`
```
# バリアント値 インパルス=0, リピート=1, チェーン=2 ↓のコマンドはリピートのトラブロ君を指定
execute if score @n[type=trablo:entity] trablo:variant matches 1 ...
```

### animations
```mcfunction
# wave
playanimation @n[type=trablo:entity] animation.trablo.wave

# walk
playanimation @n[type=trablo:entity] animation.trablo.walk
```

### events

#### `trablo:toggle_ai`
```mcfunction
# AIの有効化／無効化 (デフォルト: 有効)
event entity @n[type=trablo:entity] trablo:toggle_ai
```

#### `trablo:impulse`
```mcfunction
# コマンドブロックの見た目をインパルスにする
event entity @n[type=trablo:entity] trablo:impulse
```

#### `trablo:repeat`
```mcfunction
# コマンドブロックの見た目をリピートにする
event entity @n[type=trablo:entity] trablo:repeat
```

#### `trablo:chain`
```mcfunction
# コマンドブロックの見た目をチェーンにする
event entity @n[type=trablo:entity] trablo:chain
```
