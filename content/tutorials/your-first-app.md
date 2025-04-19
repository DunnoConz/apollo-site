# Your First Apollo Application

In this tutorial, we'll create a simple Apollo application from scratch. By the end, you'll have a working application that demonstrates Apollo's core features.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Basic understanding of JavaScript/TypeScript

## Step 1: Create a New Project

First, let's create a new Apollo project:

```bash
npx create-apollo-app my-first-app
cd my-first-app
```

## Step 2: Project Structure

Your new project will have the following structure:

```
my-first-app/
├── src/
│   ├── components/
│   ├── pages/
│   └── app.ts
├── package.json
└── tsconfig.json
```

## Step 3: Create a Simple Component

Let's create a simple component. Create a new file at `src/components/HelloWorld.tsx`:

```tsx
import { Component } from '@apollo/core';

export class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Apollo!</h1>
        <p>Welcome to your first Apollo application.</p>
      </div>
    );
  }
}
```

## Step 4: Add the Component to Your App

Update `src/app.ts` to use your new component:

```tsx
import { App } from '@apollo/core';
import { HelloWorld } from './components/HelloWorld';

const app = new App({
  components: [HelloWorld]
});

app.mount('#app');
```

## Step 5: Run the Application

Start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:3000` to see your application running.

## Next Steps

- Learn about [Components](/reference/components)
- Explore [State Management](/tutorials/state-management)
- Check out [Advanced Features](/tutorials/advanced-features) 