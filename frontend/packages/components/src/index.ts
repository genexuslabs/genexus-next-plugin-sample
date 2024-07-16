export * from "./components";

// Add types from Chameleon, without importing any JS in the final bundle.
// Don't use 'import "@genexus/chameleon-controls-library"'
typeof import("@genexus/chameleon-controls-library/dist/types/index");
