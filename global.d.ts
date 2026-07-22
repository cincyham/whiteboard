// Ambient declarations for global stylesheet side-effect imports.
// Next.js only ships types for `*.module.scss` (CSS modules), not for
// plain global stylesheets imported for their side effects.
declare module "*.scss";
declare module "*.css";
declare module "*.sass";
