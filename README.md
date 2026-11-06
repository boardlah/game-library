# BoardLah Game Library

A responsive, static collection website built with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages and does not need a database or paid hosting.

## Files
- `index.html` — page structure
- `styles.css` — visual design and responsive layout
- `script.js` — search, filters, cards and game detail pop-up
- `games.json` — game catalogue data
- `assets/images/` — place game cover images here

## Preview on your computer
1. Extract the ZIP.
2. Open `index.html` in a browser. (For the most reliable preview, use a local web server such as VS Code Live Server, because the site loads `games.json` with `fetch`.)
3. To use VS Code Live Server: open the folder in VS Code, install the Live Server extension, right-click `index.html`, then choose **Open with Live Server**.

## Add or edit games
Open `games.json`. Each game uses this structure:

```json
{
  "id": "unique-lowercase-id",
  "title": "Game title",
  "players": "2–4",
  "minPlayers": 2,
  "maxPlayers": 4,
  "playtime": "30 min",
  "difficulty": "Easy",
  "category": ["Party", "Card Game"],
  "bestFor": ["Families", "Adults"],
  "description": "A short description of the game.",
  "image": "assets/images/game-cover.jpg"
}
```

- `minPlayers` and `maxPlayers` are numbers used by the player-count filter.
- `difficulty` should be `Very Easy`, `Easy`, `Medium` or `Hard`.
- `category` is an array, so a game can have multiple mechanics/categories.
- `image` can be a relative path such as `assets/images/decrypto.jpg`, or a publicly accessible image URL.
- If no image is supplied, the site displays a designed placeholder cover. Replace placeholders by adding cover images and setting the `image` field.
- Keep every `id` unique. Ensure the JSON remains valid (commas and quotation marks matter).

Some initial game details are starter data and should be checked against the exact editions in your collection before publishing. A few titles have intentionally incomplete details where the exact game edition/details were not clear.

## Publish with GitHub Pages
1. Sign in or create an account at https://github.com/.
2. Create a **new public repository** named `boardlah-game-library`.
3. Upload the contents of this folder to the repository root. Upload `index.html`, `styles.css`, `script.js`, `games.json`, and the `assets` folder — not the ZIP file alone.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch **main** and folder **/(root)**, then click **Save**.
7. Wait a few minutes. Your site should be available at:
   `https://YOUR-GITHUB-USERNAME.github.io/boardlah-game-library/`

## Update the live site
Edit `games.json` or replace images in `assets/images/`, then commit the changes to GitHub. GitHub Pages will publish the update automatically.

## Image note
Use game cover images that you have permission to publish. For best results, use JPG or WebP images with a consistent crop (roughly square or portrait).

## Manage the collection without coding
1. Open `admin.html` on your published site (for example, `https://YOUR-GITHUB-USERNAME.github.io/boardlah-game-library/admin.html`).
2. Add, edit or delete listings. You can paste a public image URL or upload a cover image in the admin panel.
3. Click **Download games.json** when you're ready to publish.
4. In GitHub, open your repository, choose **Add file → Upload files**, and upload the downloaded `games.json`, replacing the existing file. Commit the change. GitHub Pages will publish the updated collection.
5. If you use another browser/device, import the latest `games.json` first. Draft changes are stored only in the current browser until exported.

**Important:** This is a static-site admin helper, not a secured multi-user content system. The admin page has no password protection. Keep its URL private. Anyone who knows the URL can access the page, but changes are not published until an updated `games.json` is committed to GitHub. Uploaded cover images are embedded in `games.json`; use reasonably small images to keep the file manageable.
