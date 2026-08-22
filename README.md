# Portfolio Website — How to Use

Everything you will ever need to change lives in **`data.js`**. Open it in any text editor (Notepad, VS Code), edit the text between the quotes, save, refresh the browser.

```
portfolio/
├── index.html      the page shell — you don't need to touch this
├── styles.css      the design — only touch it to change colours
├── script.js       the engine — you don't need to touch this
├── data.js         ← ALL YOUR CONTENT LIVES HERE
├── assets/         put your CV, photo, and project images here
└── README.md       this file
```

---

## 1. Open it

Double-click `index.html`. It opens in your browser. No installation, no build step, no server needed.

---

## 2. Change your details

In `data.js`, section 1:

```js
profile: {
  name: "Nguyen Nguyet Minh",
  role: "Financial & Data Analyst",
  headline: "Turning messy data into decisions people can act on.",
  ...
}
```

Edit only the text inside the `"quotes"`. Keep every comma at the end of the line.

**Photo:** save your picture into `assets/` (e.g. `assets/photo.jpg`) then set `photo: "assets/photo.jpg"`. Leave it as `""` to show your initials in a navy card instead — which looks perfectly professional if you'd rather not use a photo.

**CV:** save your PDF into `assets/` and set `cvFile: "assets/CV.pdf"`. If you leave it empty, all "Download CV" buttons disappear automatically.

---

## 3. Add a project

Go to section 5 in `data.js`. Copy one whole block — from `{` down to `},` — paste it below, and edit it:

```js
{
  id: "my-new-project",          // lowercase, no spaces, must be unique
  title: "Project Title",
  category: "Finance",           // Finance / Data / Research — becomes a filter button
  period: "2026",
  featured: true,                // shows a "Featured" badge
  summary: "One or two sentences with a number in them.",
  tags: ["Python", "SQL"],
  cover: "assets/my-chart.png",  // or "" for an automatic navy gradient
  links: [
    { label: "GitHub repo", url: "https://github.com/..." },
    { label: "Full report (PDF)", url: "assets/report.pdf" },
  ],
  detail: {
    context:   "What was the problem, and why did it matter?",
    objective: "What exactly were you trying to find out?",
    approach:  ["Step one.", "Step two.", "Step three."],
    results:   ["Finding one, with a number.", "Finding two."],
    takeaway:  "The one thing that changed because of this work.",
    stack:     ["Python", "SQL", "Power BI"],
  },
},
```

Clicking the card on the homepage opens a full case-study page built from `detail`.

For group work, add a `role` line inside `detail` — it appears as a "My role" card in the sidebar:

```js
detail: {
  role: "Group project, four students. I built the model and ran the sensitivity analysis.",
  context: "...",
}
```

### Filter buttons

The buttons above the project grid come from section 3 of `data.js`:

```js
filters: ["All", "Financial Analysis", "Dashboard", "Machine Learning"],
```

A project appears under a button when its `category` matches that wording **exactly**. To add a new group, add it to this list and use the same words in the project's `category`.

### Screenshots inside a case study

Save the images into `assets/`, then add an `images` list inside `detail`:

```js
detail: {
  ...
  images: [
    { src: "assets/fpa-dashboard-overview.png", caption: "Executive overview." },
    { src: "assets/fpa-dashboard-variance.png", caption: "Variance and drivers." },
  ],
},
```

They appear as a "Screens" block on the case-study page. The four projects added in 2026 already have this list written out and commented — delete the `//` in front of each line once the images are in `assets/`.

### Files people can download

Put the file in `assets/files/` and point a link at it:

```js
links: [
  { label: "Download the model (.xlsx)", url: "assets/files/FPA-Model.xlsx" },
],
```

`assets/files/` already holds the Excel model and the three Power BI reports. Keep the filenames free of spaces and `&` — those break in URLs.

**A note on writing these:** recruiters in finance and analytics skim for *numbers* and *decisions*. "Improved AUC from 0.61 to 0.78" beats "built a predictive model". The `takeaway` field is where you show judgment rather than technique — it is often what gets you the interview.

---

## 4. Show or hide whole sections

Section 3 of `data.js`:

```js
sections: {
  about:      { enabled: true,  label: "About" },
  projects:   { enabled: true,  label: "Projects" },
  skills:     { enabled: true,  label: "Skills" },
  experience: { enabled: true,  label: "Experience" },
  research:   { enabled: false, label: "Research" },   // ← set true to switch on
  writing:    { enabled: false, label: "Writing" },
  contact:    { enabled: true,  label: "Contact" },
},
```

`true` → the section appears on the page and in the menu. `false` → it vanishes from both. Research and Writing are pre-built and switched off; turn them on when you have something to put there.

---

## 5. Change the accent colour

Open `styles.css`, line 10:

```css
--accent:#1A66B0;   /* main accent colour */
```

Some alternatives that still read as corporate: `#0F6E5C` (deep green), `#7A2E3E` (burgundy), `#1F4E79` (conservative blue), `#B8860B` (muted gold).

---

## 6. Put it online (free)

**GitHub Pages** — the standard choice, gives you `yourname.github.io`:

1. Create a free GitHub account.
2. Create a repository named `yourname.github.io` (use your actual username).
3. Upload every file in this folder, including the `assets/` folder.
4. Settings → Pages → Source: `main` branch → Save.
5. Live in about a minute at `https://yourname.github.io`.

**Netlify** — the fastest option: go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this whole folder onto the page. It is live immediately, and you can connect a custom domain later.

Either way, updating the site means re-uploading `data.js` after you edit it.

---

## Troubleshooting

**The page is blank.** Almost always a missing comma or quote in `data.js`. Press `F12` in the browser, open the Console tab, and it will name the line. Undo your last edit and redo it more carefully.

**My image won't show.** Check the filename matches exactly, including capitals and the extension (`Photo.JPG` ≠ `photo.jpg`), and that the file is inside `assets/`.

**Text with an apostrophe breaks things.** Inside `"double quotes"` an apostrophe is fine (`"don't"`). Just never put a double quote inside double quotes.
