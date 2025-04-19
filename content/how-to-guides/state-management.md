# How-To: Manage State in Apollo-Compiled Roblox Games

**Goal:** Understand how to approach state management when developing Roblox games using Racket compiled by Apollo.

**Note:** Apollo primarily focuses on compiling Racket to Luau. State management itself is largely handled by the Roblox engine and Luau scripting patterns. This guide explains how Apollo fits into that picture.

## Understanding the Context

In Roblox, game state is typically managed through:

*   **Instance Properties:** Modifying properties of objects in the DataModel (e.g., a Part's `Position`, a Player's `leaderstats` values).
*   **Attributes:** Storing custom data directly on Instances.
*   **ModuleScripts:** Using ModuleScripts as singletons or state containers to hold and manage data accessible by other scripts.
*   **Events:** Using `RemoteEvents` and `BindableEvents` to communicate state changes between the server and client(s) or between scripts.

Apollo compiles your Racket code into Luau scripts that run within this existing Roblox environment. Therefore, managing state involves writing Racket code that ultimately calls the appropriate Roblox APIs or interacts with Luau ModuleScripts.

## Accessing Roblox APIs from Racket

To manage state, your Racket code needs to interact with Roblox Instances and services. While the specific mechanism depends on how Apollo implements Roblox API bindings (which is not detailed in the base README), the general approach would involve:

1.  **Importing/Requiring Roblox Services:** Your Racket code would need a way to get references to services like `Players`, `Workspace`, `ReplicatedStorage`, `ServerScriptService`, etc.
2.  **Calling Instance Methods/Properties:** You'd use Racket functions that Apollo translates into calls to Roblox methods (e.g., `Instance:FindFirstChild`, `Instance:SetAttribute`, `Player:LoadCharacter`) or property accessors.

**Example (Conceptual Racket):**

```racket
#lang racket/base

(require roblox/players roblox/instance) ; Fictional import for Roblox APIs

(define (get-player-data player-name)
  (let ([player (Players:FindFirstChild player-name)])
    (if player
        (Instance:GetAttribute player "Coins")
        0)))

(define (set-player-data! player-name coins)
  (let ([player (Players:FindFirstChild player-name)])
    (when player
      (Instance:SetAttribute player "Coins" coins))))

; --- Usage ---
(set-player-data! "Hero" 100)
(define current-coins (get-player-data "Hero"))
(displayln (string-append "Hero coins: " (number->string current-coins)))
```

*Disclaimer: The `roblox/...` requires and API call syntax (`Players:FindFirstChild`, `Instance:SetAttribute`) are purely illustrative. You would need to consult the specific Apollo documentation or examples for the actual way to interact with Roblox APIs.* 

## Using ModuleScripts for Shared State

A common pattern is to use ModuleScripts in Roblox to hold shared state or logic. You can interact with these from your Apollo-compiled code:

1.  **Create a ModuleScript** in Roblox Studio (e.g., in `ServerStorage` or `ReplicatedStorage`) containing your state logic.

    ```lua
    -- Example: ServerStorage/StateManager
    local StateManager = {}
    local playerData = {}

    function StateManager.GetPlayerData(player)
        return playerData[player.UserId]
    end

    function StateManager.UpdateCoins(player, amount)
        if not playerData[player.UserId] then
            playerData[player.UserId] = { Coins = 0 }
        end
        playerData[player.UserId].Coins = playerData[player.UserId].Coins + amount
        -- Add logic to maybe save data or fire events
        return playerData[player.UserId].Coins
    end

    return StateManager
    ```

2.  **Require the ModuleScript** in your Apollo-generated Luau code (which means writing Racket code that compiles to a `require`).

    **Example (Conceptual Racket):**

    ```racket
    #lang racket/base
    (require roblox/server-storage roblox/game) ; Fictional imports

    ; Assuming Apollo provides a way to require Roblox ModuleScripts
    (define StateManager (require (ServerStorage:WaitForChild "StateManager")))

    (define (add-coins player-name amount)
      (let ([player (Players:FindFirstChild player-name)])
        (when player
          ; Assuming Apollo translates '.' to ':' or provides a call function
          ; (StateManager.UpdateCoins player amount) or (call StateManager 'UpdateCoins player amount)
          (StateManager:UpdateCoins player amount))))
    ```

## Key Considerations

*   **Server vs. Client:** Remember the Roblox execution model. Server scripts (in `ServerScriptService`) manage authoritative state. Client scripts (`StarterPlayerScripts`, etc.) handle local presentation and user input, often communicating with the server via RemoteEvents.
*   **Apollo's Role:** Apollo doesn't introduce a new state management *system*; it allows you to write the logic for interacting with Roblox's existing systems using Racket.
*   **API Bindings:** The ease of state management heavily depends on how comprehensively Apollo provides bindings or interfaces to the Roblox Luau API.

Refer to Apollo's specific documentation and examples for the precise methods to interact with Roblox APIs and ModuleScripts from your Racket code.

## Related

- [State Management Reference](/reference/state-management)
- [Advanced State Patterns](/tutorials/advanced-state)
- [Performance Optimization](/how-to-guides/performance) 