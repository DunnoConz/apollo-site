# Components Reference

This reference document provides detailed information about Apollo's component system.

## Component Class

The base class for all Apollo components.

### Properties

| Name | Type | Description |
|------|------|-------------|
| `props` | `object` | Component properties passed from parent |
| `state` | `object` | Component's local state |
| `context` | `object` | Shared context from parent components |

### Methods

#### `render()`

```tsx
render(): JSX.Element
```

Returns the JSX element to be rendered. Must be implemented by all components.

Example:
```tsx
class MyComponent extends Component {
  render() {
    return <div>Hello World</div>;
  }
}
```

#### `componentDidMount()`

```tsx
componentDidMount(): void
```

Called after the component is mounted to the DOM. Use for initialization that requires DOM access.

Example:
```tsx
class MyComponent extends Component {
  componentDidMount() {
    // Initialize third-party library
    this.chart = new Chart(this.ref.current);
  }
}
```

#### `componentWillUnmount()`

```tsx
componentWillUnmount(): void
```

Called before the component is removed from the DOM. Use for cleanup.

Example:
```tsx
class MyComponent extends Component {
  componentWillUnmount() {
    // Clean up event listeners
    window.removeEventListener('resize', this.handleResize);
  }
}
```

## Lifecycle

1. `constructor(props)`
2. `render()`
3. `componentDidMount()`
4. `componentWillUnmount()`

## Examples

### Basic Component

```tsx
import { Component } from '@apollo/core';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Stateful Component

```tsx
import { Component } from '@apollo/core';

class Counter extends Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## Related

- [Component Lifecycle](/reference/lifecycle)
- [State Management](/reference/state)
- [Props and Context](/reference/props) 