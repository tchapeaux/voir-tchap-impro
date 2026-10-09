# voir-tchap-impro

Static page to gather info about my improv shows to people (kind of like a personal linktree)

Deployed to [voir.tchap.be](https://voir.tchap.be)

Use Node.js 24 LTS and npm. The Node version is set in `.nvmrc` and in
`package.json` so Vercel uses the same major version. `package-lock.json` is the
only dependency lockfile.

```sh
nvm use
npm ci
npm run dev
```

Show dates are maintained in `src/data/thomas-events.json`. There is one page,
rendered directly by Vue without a router.

```sh
npm run lint          # Check Vue, TypeScript, and configuration files
npm run lint:fix      # Apply automatic lint fixes
npm run format:check  # Check formatting
npm run format        # Apply formatting
npm run build         # Type-check the app and Vite config, then build dist/
npm run preview       # Serve the production build locally
```

The build uses Vite 8 and ESLint uses flat configuration. TypeScript stays on
6.0 until typescript-eslint supports TypeScript 7. Vercel should use `npm ci`
for installation, `npm run build` for the build, and `dist` as the output directory.
