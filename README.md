# react-seo

SEO metatags for React apps, best used with Gatsby + react-helmet.

Motive for this was the infuriating complexity of SEO coupled with the fact there wasn't really any good SEO packages out there for React.

# How to develop locally

Requires: Node.js >= 8.

1) Clone this repo & run `npm i`.
2) To use with the example project, install its dependencies too: `cd example & npm i`.
3) Back in the root directory, link `react-seo` to your local npm libraries: `npm link`. It should be now available as a global dependency for any npm projects, link it to your example-app: `cd example & npm link react-seo`. It creates a symlink pointing to this library's root folder.
4) Start the TypeScript compiler in one bash session: `npm run ts:watch`.
5) Start the example Gatsby site with: `npm start`.
6) The app should open in http://localhost:8000. The changes to the source code should be reloaded automatically and be seen in the `<head>`'s metatags. Happy hacking!

As one script:
```bash
#!/bin/bash
npm i
cd example & npm i
cd .. & npm link
cd example & npm link react-seo
cd .. & npm run ts:watch
# Open another terminal session
cd example & npm start
```

# How to publish changes

This one is more for the maintainers such as me. All the changes should go through PR issues first.

First you have to login to your npm account: `npm login`.

After making changed to the code, you can publish the project simply by `npm publish`. Npm will prompt you for a new version number so you don't have to change it manually. Version your changes **semantically** so big breaking changes are new version, general changes or bug fixes are minor versions and patches are just some general maintenance or refactoring. After giving the new version npm will run scripts depending on the hooks you have defined in your `"scripts"` eg. probably `"prepublishOnly"` and perhaps `"version"` etc. to run git commands automatically. Mostly only `"prepublishOnly"` is needed. After that npm will just copy the current contents (minus those in `.npmignore` and `node_modules` by default) and push it to the remote repository which is probably our npm registry.

# How to contribute

Create issues or PRs for bug reports/feedback/feature requests.