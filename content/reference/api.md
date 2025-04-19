# Apollo API Reference

This document provides a comprehensive reference for Apollo's API and core functionality.

## Core Functions

### Compilation

```racket
;; Compile Racket code to Luau
(compile-racket-to-luau racket-code) → luau-code

;; Example:
(compile-racket-to-luau
  '(define (add x y) (+ x y)))
;; Returns: "local function add(x, y) return x + y end"
```

### Roblox Integration

```racket
;; Create a new Roblox instance
(Instance.new class-name [parent]) → instance

;; Example:
(Instance.new "Part" workspace)
```

### Event Handling

```racket
;; Create a new event
(BindableEvent.new) → event

;; Connect to an event
(event-connect event handler) → connection

;; Fire an event
(event-fire event args...) → void
```

## Data Types

### Vectors

```racket
;; Create a 3D vector
(Vector3.new x y z) → vector

;; Vector operations
(vector-add v1 v2) → vector
(vector-sub v1 v2) → vector
(vector-mul v scalar) → vector
(vector-dot v1 v2) → number
```

### Colors

```racket
;; Create a color
(Color3.new r g b) → color
(Color3.fromRGB r g b) → color
(Color3.fromHSV h s v) → color
```

### Instances

```racket
;; Instance properties
(.-Name instance) → string
(.-Parent instance) → instance
(.-ClassName instance) → string

;; Instance methods
(.Destroy instance) → void
(.Clone instance) → instance
(.FindFirstChild instance name) → instance
```

## Services

### Workspace

```racket
;; Access workspace
(workspace) → workspace

;; Common workspace operations
(.GetChildren workspace) → list
(.FindFirstChild workspace name) → instance
```

### UserInputService

```racket
;; Access input service
(UserInputService) → service

;; Input handling
(.GetKeysPressed service) → list
(.IsKeyDown service key) → boolean
(.IsMouseButtonPressed service button) → boolean
```

### RunService

```racket
;; Access run service
(RunService) → service

;; Game loop integration
(.Heartbeat service) → event
(.RenderStepped service) → event
(.Stepped service) → event
```

## Utility Functions

### Math

```racket
;; Common math operations
(math-random) → number
(math-floor x) → number
(math-ceil x) → number
(math-round x) → number
(math-clamp x min max) → number
```

### String

```racket
;; String operations
(string-append str1 str2 ...) → string
(string-split str delimiter) → list
(string-format format-str args...) → string
```

### Debug

```racket
;; Debug utilities
(debug-print message value) → void
(debug-warn message) → void
(debug-error message) → void
```

## Best Practices

1. **Error Handling**
   - Always check return values
   - Use try-catch blocks for critical operations
   - Validate input parameters

2. **Performance**
   - Cache frequently accessed values
   - Use appropriate data structures
   - Minimize object creation in loops

3. **Memory Management**
   - Clean up event connections
   - Destroy unused instances
   - Monitor memory usage

## Common Patterns

### Event Connection Management

```racket
(define (with-event-connection event handler)
  (let ([connection (event-connect event handler)])
    (lambda ()
      (connection-disconnect connection))))
```

### State Management

```racket
(define (create-state initial)
  (let ([state initial]
        [listeners '()])
    (lambda (action . args)
      (case action
        [('get) state]
        [('set! new-state)
         (set! state new-state)
         (for-each (lambda (listener)
                     (listener new-state))
                   listeners)]
        [('subscribe listener)
         (set! listeners (cons listener listeners))
         (lambda ()
           (set! listeners (remove listener listeners)))]))))
```

### Resource Management

```racket
(define (with-resource resource proc)
  (dynamic-wind
    void
    (lambda () (proc resource))
    (lambda () (.Destroy resource))))
``` 