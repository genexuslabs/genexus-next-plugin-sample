## Frontend

The frontend is responsible for implementing the user interface and interactions of the plugin. This includes defining new UI components, custom objects, parts, tool windows, dialogs, commands, and more. These contributions extend the IDE, enabling the functionality required by the plugin on the frontend side.

The project is organized as a monorepo using JavaScript/TypeScript packages. We rely on **Yarn** as our package manager. Additionally, **Lerna** is used to manage the monorepo, allowing us to streamline development across multiple packages, synchronize changes, and handle shared dependencies efficiently.

## Packages

The frontend consists of several packages, each with a specific responsibility:

- **comm-layer**: Implements the communication layer of the plugin. It facilitates interaction with the service layer found in the backend.
- **components**: Contains the implementation of new user interface components, specifically as web components. For this project, we use **Stencil.js** to create reusable and framework-agnostic components.
- **main**: Defines the contributions made by the plugin. This includes the declaration of new objects and parts, tool windows, dialogs, commands, and other elements that enhance the IDE.
- **sdk**: Provides the IDE SDK, enabling integration and development of plugin functionalities.

## Dependencies

This project relies on a range of dependencies to support its functionality. Among these, two notable dependencies are:

- **Chameleon Controls Library**: A library of white-label, highly customizable, and reusable web components. This library allows us to build consistent and flexible UI components across the IDE.

- **Mercury**: A design system for GeneXus Next IDE. Mercury provides the foundational design elements and guidelines necessary for creating a cohesive and user-friendly interface within the IDE. This design system also provides styles for Chameleon controls, which we can use for other elements as well.

These highlighted dependencies play a crucial role in ensuring a seamless user experience and efficient development.

Note that these dependencies are peerDependencies because they are managed by the IDE. The IDE ensures that the same versions are used by both the IDE itself and all the plugins. You can declare your own versions, but at runtime, the plugin will use the versions of the dependencies provided by the IDE. The IDE is responsible for maintaining and specifying the actual versions.

## Setup

### Requirements

1.  Yarn package manager. To install Yarn, run:

    ```bash
    npm i -g yarn
    ```

### Build and run

1. Install dependencies:
    
    ```bash
    cd frontend
    yarn
    ```

2. Build all packages:

    ```bash
    yarn build
    ```

3. Run main project

    ```bash
    co packages/main
    yarn preview
    ```

### Watch mode

To test changes as you make them, you can use the watch mode feature.

To enable watch mode, run the following command in each project you are modifying, as well as in the `main` package:

    ```bash
    yarn watch
    ```

After change, you need to reload GeneXus Next IDE.