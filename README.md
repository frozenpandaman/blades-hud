# blades-hud

An online dashboard/[HUD](https://en.wikipedia.org/wiki/Head-up_display) for John Harper's *[Blades in the Dark](https://en.wikipedia.org/wiki/Blades_in_the_Dark)* TTRPG.

## Development

```
$ npm install --legacy-peer-deps
$ npm start
```

Runs on [http://localhost:3000](http://localhost:3000) in the browser.

Config for your [Firebase](https://firebase.google.com/) app goes in `index.tsx`. The Cloud Filestore (NoSQL backend) security rule that enables access with auth only is in `cloud_firestore_rules.txt`.

## Production

```
$ npm run build
```

Optimizes & builds the app into the `build` folder. GitHub Pages deployment specifications are in `package.json`.

---

### Notes

* Player names are currently hardcoded into `Hud.tsx` **and** `ClockPage.tsx`.
* Campaign title & example database connection info are currently hardcoded into `index.tsx`.