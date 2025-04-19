# Common Tasks in Apollo

This guide covers how to perform common tasks when working with Apollo and Roblox.

## Table of Contents

- [Creating Custom Events](#creating-custom-events)
- [Working with Remote Events](#working-with-remote-events)
- [Handling User Input](#handling-user-input)
- [Managing Game State](#managing-game-state)
- [Debugging Tips](#debugging-tips)

## Creating Custom Events

Here's how to create and use custom events in your game:

```racket
;; Create a custom event
(define my-event (Instance.new "BindableEvent"))

;; Connect to the event
(define (handle-event arg1 arg2)
  (displayln (string-append "Event fired with args: " arg1 " " arg2)))

(.-Event my-event "Connect" handle-event)

;; Fire the event
(.-Fire my-event "hello" "world")
```

## Working with Remote Events

For client-server communication:

```racket
;; Server-side
(define remote-event (Instance.new "RemoteEvent" "ReplicatedStorage"))

(define (handle-remote-event player data)
  (displayln (string-append "Received from " (.-Name player) ": " data)))

(.-OnServerEvent remote-event "Connect" handle-remote-event)

;; Client-side
(define remote-event (.-WaitForChild (.-ReplicatedStorage game) "RemoteEvent"))

(.-FireServer remote-event "Hello from client!")
```

## Handling User Input

Basic input handling example:

```racket
(define (setup-input-handling)
  (let ([input-service (game:GetService "UserInputService")])
    
    ;; Keyboard input
    (define (handle-keyboard input)
      (when (.-KeyCode input "W")
        (displayln "W key pressed")))
    
    ;; Mouse input
    (define (handle-mouse-click()
      (displayln "Mouse clicked")))
    
    ;; Connect handlers
    (.-InputBegan input-service "Connect" handle-keyboard)
    (.-MouseButton1Click input-service "Connect" handle-mouse-click)))
```

## Managing Game State

Example of a simple state management system:

```racket
(define (create-state-manager initial-state)
  (let ([state initial-state]
        [listeners '()])
    
    ;; Update state
    (define (update-state! key value)
      (set! state (hash-set state key value))
      (notify-listeners key value))
    
    ;; Add listener
    (define (add-listener key callback)
      (set! listeners (cons (cons key callback) listeners)))
    
    ;; Notify listeners
    (define (notify-listeners key value)
      (for ([listener listeners])
        (when (equal? (car listener) key)
          ((cdr listener) value))))
    
    ;; Return public interface
    (hash 'update update-state!
          'subscribe add-listener
          'get-state (lambda () state))))
```

## Debugging Tips

1. **Print Debugging**
```racket
(define (debug-print message value)
  (displayln (string-append message ": " (->string value))))
```

2. **Visual Debugging**
```racket
(define (create-debug-sphere position)
  (let ([part (Instance.new "Part")])
    (set! (.-Shape part) "Ball")
    (set! (.-Size part) (Vector3.new 1 1 1))
    (set! (.-Position part) position)
    (set! (.-Transparency part) 0.5)
    (set! (.-Anchored part) #t)
    part))
```

3. **Performance Monitoring**
```racket
(define (measure-time name thunk)
  (let ([start-time (tick)])
    (thunk)
    (let ([end-time (tick)])
      (displayln (string-append name " took " 
                              (number->string (- end-time start-time))
                              " seconds")))))
```

## Best Practices

1. **Error Handling**
```racket
(define (safe-call thunk)
  (with-handlers ([exn:fail? 
                   (lambda (e)
                     (displayln (string-append "Error: " (exn-message e)))
                     #f)])
    (thunk)))
```

2. **Resource Management**
```racket
(define (with-resource resource thunk)
  (dynamic-wind
    void
    thunk
    (lambda () (.-Destroy resource))))
```

3. **Code Organization**
- Keep related functions together
- Use meaningful names
- Add comments for complex logic
- Break down large functions into smaller ones

## Troubleshooting

Common issues and solutions:

1. **Event Not Firing**
- Check if the event is properly connected
- Verify the event is being fired from the correct context
- Ensure all required arguments are provided

2. **State Not Updating**
- Verify the state update function is being called
- Check if listeners are properly registered
- Ensure state updates are happening in the correct order

3. **Performance Issues**
- Use the performance monitoring tools
- Check for unnecessary event connections
- Look for memory leaks in state management 