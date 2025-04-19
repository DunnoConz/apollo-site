# Racket to Luau Conversion Reference

This reference guide details how various Racket constructs are converted to Luau code.

## Basic Syntax Conversion

### Function Definitions

```racket
(define (function-name param1 param2)
  body)
```

Converts to:

```lua
local function functionName(param1, param2)
    return body
end
```

### Arithmetic Operations

```racket
(+ a b)    → a + b
(- a b)    → a - b
(* a b)    → a * b
(/ a b)    → a / b
```

### Control Flow

```racket
(if condition
    then-expr
    else-expr)
```

Converts to:

```lua
if condition then
    return thenExpr
else
    return elseExpr
end
```

## Data Structures

### Lists

```racket
(list 1 2 3)
```

Converts to:

```lua
{1, 2, 3}
```

### Hash Tables

```racket
(hash 'key1 value1 'key2 value2)
```

Converts to:

```lua
{
    key1 = value1,
    key2 = value2
}
```

## Special Forms

### Lambda Functions

```racket
(lambda (x) (* x x))
```

Converts to:

```lua
function(x) return x * x end
```

### Let Bindings

```racket
(let ([x 10]
      [y 20])
  (+ x y))
```

Converts to:

```lua
local x = 10
local y = 20
return x + y
```

## Roblox-Specific Features

### Instance Creation

```racket
(Instance.new "Part")
```

Converts to:

```lua
Instance.new("Part")
```

### Property Access

```racket
(.-Position part)
```

Converts to:

```lua
part.Position
```

## Notes

* All Racket identifiers are converted to camelCase in Luau
* Function calls are converted from prefix notation to infix notation
* Parentheses are removed where possible in Luau syntax
* Comments are preserved during conversion 