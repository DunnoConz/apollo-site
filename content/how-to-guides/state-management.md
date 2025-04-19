# How to Manage State in Apollo

This guide will show you how to implement state management in your Apollo application using the built-in state management system.

## Problem

You need to manage application state that is shared between multiple components.

## Solution

Apollo provides a simple and powerful state management system. Here's how to use it:

### 1. Create a Store

Create a new store file, e.g., `src/stores/counter.ts`:

```ts
import { Store } from '@apollo/core';

export class CounterStore extends Store {
  state = {
    count: 0
  };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}
```

### 2. Use the Store in Components

```tsx
import { Component } from '@apollo/core';
import { CounterStore } from '../stores/counter';

export class Counter extends Component {
  private store = new CounterStore();

  render() {
    return (
      <div>
        <h2>Count: {this.store.state.count}</h2>
        <button onClick={() => this.store.increment()}>+</button>
        <button onClick={() => this.store.decrement()}>-</button>
      </div>
    );
  }
}
```

### 3. Share State Between Components

To share state between components, create a singleton instance of your store:

```ts
// src/stores/counter.ts
export const counterStore = new CounterStore();
```

Then use it in your components:

```tsx
import { counterStore } from '../stores/counter';

export class AnotherComponent extends Component {
  render() {
    return (
      <div>
        <p>Shared count: {counterStore.state.count}</p>
      </div>
    );
  }
}
```

## Best Practices

1. Keep stores focused on a single responsibility
2. Use TypeScript interfaces for state types
3. Implement actions as methods on the store
4. Use computed properties for derived state

## Related

- [State Management Reference](/reference/state-management)
- [Advanced State Patterns](/tutorials/advanced-state)
- [Performance Optimization](/how-to-guides/performance) 