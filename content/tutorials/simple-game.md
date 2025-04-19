# Building a Simple Game with Apollo

In this tutorial, we'll create a simple platformer game using Racket and Apollo. We'll cover:
- Setting up the game environment
- Creating player movement
- Adding basic physics
- Implementing simple game mechanics

## Prerequisites

- Apollo compiler installed
- Roblox Studio
- Basic understanding of Racket syntax

## Step 1: Setting Up the Game Environment

First, let's create a basic game environment with a player character and a platform.

```racket
#lang racket/base

(provide create-game-environment)

(define (create-game-environment)
  (let* ([workspace (Instance.new "Workspace")]
         [platform (Instance.new "Part" workspace)]
         [player (Instance.new "Part" workspace)])
    
    ;; Configure platform
    (set! (.-Size platform) (Vector3.new 20 1 20))
    (set! (.-Position platform) (Vector3.new 0 0 0))
    (set! (.-Anchored platform) #t)
    
    ;; Configure player
    (set! (.-Size player) (Vector3.new 2 2 2))
    (set! (.-Position player) (Vector3.new 0 5 0))
    (set! (.-Name player) "Player")
    
    ;; Return the game objects
    (hash 'platform platform
          'player player)))
```

## Step 2: Adding Player Movement

Now, let's add basic player movement controls.

```racket
(define (setup-player-movement player)
  (let ([speed 16]
        [jump-power 50])
    
    ;; Handle keyboard input
    (define (handle-input input)
      (let ([direction (Vector3.new 0 0 0)])
        (when (.-W input)
          (set! (.-Z direction) 1))
        (when (.-S input)
          (set! (.-Z direction) -1))
        (when (.-A input)
          (set! (.-X direction) -1))
        (when (.-D input)
          (set! (.-X direction) 1))
        
        ;; Apply movement
        (let ([velocity (* direction speed)])
          (set! (.-Velocity player) velocity))))
    
    ;; Handle jumping
    (define (handle-jump)
      (when (and (.-Space input)
                 (.-OnGround player))
        (set! (.-Y (.-Velocity player)) jump-power)))
    
    ;; Connect input handlers
    (UserInputService.Connect "InputBegan" handle-input)
    (UserInputService.Connect "JumpRequested" handle-jump)))
```

## Step 3: Adding Basic Physics

Let's add some basic physics to make the game feel more natural.

```racket
(define (setup-physics player)
  (let ([gravity 196.2]
        [max-fall-speed 100])
    
    ;; Apply gravity
    (define (apply-gravity)
      (let ([current-velocity (.-Velocity player)])
        (when (> (.-Y current-velocity) (- max-fall-speed))
          (set! (.-Y current-velocity)
                (- (.-Y current-velocity) gravity)))))
    
    ;; Run physics update
    (RunService.Connect "Heartbeat" apply-gravity)))
```

## Step 4: Putting It All Together

Finally, let's create the main game loop that ties everything together.

```racket
(define (main)
  (let* ([game-objects (create-game-environment)]
         [player (hash-ref game-objects 'player)])
    
    ;; Setup game systems
    (setup-player-movement player)
    (setup-physics player)
    
    ;; Print startup message
    (displayln "Game started!")))

;; Start the game
(main)
```

## Testing the Game

1. Compile the code using Apollo:
```bash
raco apollo game.rkt -o game.luau
```

2. Open Roblox Studio and create a new place
3. Insert the generated `game.luau` file into `ServerScriptService`
4. Press Play to test the game

## Next Steps

Try adding these features to enhance your game:
- Collectible items
- Enemies
- Score system
- Multiple levels

Check out the [Reference Guide](../reference/racket-to-luau.md) for more information about Racket to Luau conversion features. 