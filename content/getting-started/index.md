# Getting Started with Apollo

Welcome to Apollo! This guide will walk you through installing the Apollo compiler and compiling your first Racket script for Roblox.

## Overview

Apollo is a powerful compiler that transforms Racket code into Luau, enabling Roblox game development with the elegance and power of Racket's functional programming paradigm.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Racket**: Version 8.0 or later. You can download it from [racket-lang.org](https://racket-lang.org/).
*   **Roblox Studio**: Needed for testing the compiled Luau code within a Roblox environment. Download from [roblox.com/create](https://www.roblox.com/create).
*   **Git**: For cloning the Apollo repository.

## Installation

Follow these steps to install the Apollo compiler:

1.  **Clone the Repository**:
    Open your terminal and run:
    ```bash
    git clone https://github.com/yourusername/apollo.git # Replace with the actual repo URL
    cd apollo
    ```

2.  **Install Dependencies**:
    Apollo uses Racket's package manager. Run the following command within the cloned `apollo` directory:
    ```bash
    raco pkg install
    ```
    This command reads the package dependencies (likely defined in `info.rkt`) and installs them.

3.  **Build the Compiler**:
    Compile the Apollo source code:
    ```bash
    raco make src/apollo/main.rkt
    ```
    This creates the executable components for the Apollo compiler.

## Quick Start: Your First Compilation

Let's compile a simple Racket script to Luau.

1.  **Create a Racket File**:
    Create a new file named `game.rkt` and add the following Racket code:

    ```racket
    #lang racket/base

    (provide create-player main) ; Export functions

    ; Example function assuming some Roblox API bindings exist
    (define (create-player name)
      (displayln (string-append "Creating player: " name))
      ; Replace with actual Roblox API calls when running in Studio
      ; Example: (let ([player (Instance.new "Part")]) ... )
      (hash 'name name 'speed 16)) ; Return a simple hash table for now

    (define (set-player-speed! player speed)
      (displayln (string-append "Setting speed for " (hash-ref player 'name) " to " (number->string speed))))
      ; In actual use, this would interact with the player object in Roblox

    (define (main)
      (displayln "Game starting...")
      (let ([player (create-player "Hero")])
        (set-player-speed! player (hash-ref player 'speed)))
      (displayln "Game setup complete!"))

    ; Call main when the script runs
    (main)
    ```
    *Note: This example uses `displayln` for demonstration. Actual Roblox interaction would use Luau-compatible APIs.*

2.  **Compile to Luau**:
    Use the Apollo compiler (assuming `raco apollo` is the command after installation) to convert `game.rkt` to `game.luau`:
    ```bash
    raco apollo game.rkt -o game.luau
    ```
    *(Note: The exact command might differ based on how Apollo is installed or invoked. Check the Apollo project's specific instructions if `raco apollo` doesn't work).*

3.  **Use in Roblox Studio**:
    *   Open Roblox Studio and create a new place or open an existing one.
    *   Insert a `Script` into `ServerScriptService`.
    *   Open the generated `game.luau` file in a text editor.
    *   Copy the entire Luau code from `game.luau`.
    *   Paste the code into the Roblox Studio `Script`.
    *   Run the game (Play button). The Luau code derived from your Racket script will execute on the server. Check the Output window in Studio for messages from `displayln`.

## Next Steps

You've successfully installed Apollo and compiled your first script! Now you can explore:

*   More complex Racket features and how they map to Luau.
*   Interacting with the Roblox API from your Racket code.
*   Setting up your project structure for larger games.

Check out the **Tutorials** section for more guided examples. 