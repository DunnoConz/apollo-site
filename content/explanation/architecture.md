# Apollo Compiler Architecture

This document provides a high-level overview of the Apollo compiler's architecture, explaining how it transforms Racket code into executable Luau code for the Roblox platform.

## Core Philosophy

Apollo aims to bring the power and expressiveness of the Racket language to Roblox development. It achieves this by compiling Racket source code into optimized Luau, the scripting language used by Roblox.

## Major Components

Based on the project structure outlined in the Apollo repository, the compilation process likely involves several key stages:

1.  **Parsing (`src/apollo/compiler/parser.rkt`)**:
    *   The compiler first reads the Racket source code (`.rkt` files).
    *   It parses the Racket syntax, transforming the text into a structured representation that the compiler can understand, often an Abstract Syntax Tree (AST).
    *   This stage handles Racket's unique syntax features, including macros and the module system.

2.  **Intermediate Representation (`src/apollo/compiler/ir.rkt`)**:
    *   The parsed code is likely converted into an Intermediate Representation (IR).
    *   The IR is a language-agnostic format that simplifies the code and makes it easier to analyze and optimize before generating the final output.
    *   This stage might involve expanding macros, resolving module dependencies, and performing initial type checks or inferences if applicable.

3.  **Code Generation (`src/apollo/compiler/codegen.rkt`)**:
    *   The compiler takes the IR and translates it into equivalent Luau code.
    *   This is the core transformation step, mapping Racket concepts (functions, pattern matching, modules) to their Luau counterparts.
    *   Optimization techniques might be applied here to ensure the generated Luau code is efficient and performs well within the Roblox environment.

4.  **Entry Point (`src/apollo/main.rkt`)**:
    *   This is the main executable part of the compiler, orchestrating the parsing, IR transformation, and code generation stages.
    *   It handles command-line arguments (like input files and output destinations) and manages the overall compilation process.

## Key Features in Architecture

*   **Module System Handling**: The compiler needs to correctly interpret Racket's `require` and `provide` and map them to Luau's module system (e.g., `require`, `return`).
*   **Compile-Time Function Evaluation (CTFE)**: Features like CTFE would be handled during the IR or code generation phase, evaluating Racket code at compile time and embedding the results directly into the Luau output.
*   **Pattern Matching**: The code generator translates Racket's powerful pattern matching into efficient Luau conditional logic.

## Development and Testing

*   **Tests (`tests/`)**: The project includes a dedicated test suite to verify the compiler's correctness across various Racket features and edge cases.
*   **Examples (`examples/`)**: Example projects demonstrate how to use Apollo in practical scenarios.

This architecture allows Apollo to leverage Racket's strengths while producing code compatible with the target Luau runtime environment on Roblox. 