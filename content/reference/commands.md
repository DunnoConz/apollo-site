# Reference: Apollo Commands & Concepts

This section provides a reference for commands and core concepts related to the Apollo Racket-to-Luau compiler, based on information available in the project's main README.

**Note:** This reference is likely incomplete. For a full API or command-line reference, consult the Apollo project's dedicated documentation or use help commands if available (e.g., `raco apollo --help`).

## Installation & Setup Commands

These commands are typically run once when setting up Apollo.

*   **Clone Repository**
    ```bash
    git clone https://github.com/yourusername/apollo.git # Replace with actual URL
    cd apollo
    ```
    Downloads the Apollo source code repository.

*   **Install Dependencies**
    ```bash
    raco pkg install
    ```
    Installs required Racket packages defined within the Apollo project (likely in `info.rkt`). Run this inside the cloned `apollo` directory.

*   **Build Compiler**
    ```bash
    raco make src/apollo/main.rkt
    ```
    Compiles the Apollo source code itself, making the compiler executable.

## Core Compilation Command

*   **Compile Racket to Luau**
    ```bash
    raco apollo <input-racket-file.rkt> -o <output-luau-file.luau>
    ```
    *   `raco apollo`: The primary command to invoke the Apollo compiler (assuming standard Racket command integration).
    *   `<input-racket-file.rkt>`: Path to the Racket source file you want to compile.
    *   `-o <output-luau-file.luau>`: Specifies the path and filename for the generated Luau code.

## Core Racket Concepts (as used in examples)

These are standard Racket features relevant when writing code for Apollo:

*   **`#lang racket/base`**: Specifies the base Racket language level, providing fundamental features.
*   **`(define (function-name arg1 ...) ...)`**: Defines a function.
*   **`(provide identifier ...)`**: Exports identifiers (functions, variables) from a module, making them available for `require` in other modules.
*   **`(require module-path)`**: Imports identifiers provided by another module.
*   **`(let ([binding value] ...) body ...)`**: Creates local bindings.
*   **`(displayln value)`**: Prints a value to the standard output, followed by a newline. Useful for debugging; translates to Luau's `print`.

## Luau / Roblox Concepts (Target Environment)

Understanding these is crucial when writing Racket code intended for Roblox via Apollo:

*   **Luau**: The sandboxed, gradually-typed scripting language derived from Lua, used by Roblox.
*   **Roblox API**: The set of objects, methods, properties, and events provided by the Roblox engine (e.g., `game`, `workspace`, `Players`, `Instance.new`, `FindFirstChild`, `Attributes`, `RemoteEvents`). Your Racket code needs to interact with these via bindings potentially provided by Apollo.
*   **ModuleScript**: A Roblox object used to store reusable code or shared data, loaded using `require()`.
*   **ServerScriptService**: A Roblox container where server-side `Script`s are typically placed to run with full permissions.
*   **Output Window**: The console within Roblox Studio where `print` (and thus `displayln` from Racket) outputs messages.

For detailed information on specific compiler flags, advanced features (like CTFE or pattern matching specifics), or the exact mapping of Racket features to Luau, refer to the official Apollo documentation. 