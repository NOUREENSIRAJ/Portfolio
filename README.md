# Noureen Siraj — Portfolio

Poori project. Purane folder ki koi cheez ab nahi chahiye.

## Shuru karne ka tareeqa

1. Ek **naya khali folder** banayein, jaise `C:\Portfolio`
2. Yahan di gayi saari files usme rakh dein, bilkul isi tarteeb se (neeche dekhein)
3. Terminal usi folder mein kholein aur ye do commands chalayein:

```
npm install
```

```
npm run dev
```

Bas. Browser khud khul jayega `http://localhost:5173` par.

**React ka version masla ab nahi aayega** — `package.json` mein React pehle se
`19.2.0` par pin hai, isliye `ERESOLVE` error nahi milega.

## Files ki tarteeb

```
Portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── public/
│   └── Noureen-Siraj-CV.pdf
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── scroll.ts
    ├── click.ts
    ├── vite-env.d.ts
    ├── data/
    │   └── cv.ts
    └── three/
        ├── Scene.tsx
        └── Blossom.tsx
```

`node_modules` khud ban jayega, use banane ki zaroorat nahi.

## Ye ab Figma Make ka project nahi hai

Purane folder mein `.figma/`, `AGENTS.md`, `CLAUDE.md`, `.mise.toml` thay aur
`vite.config.ts` Figma ki `site.json` file par depend karti thi. Maine wo sab
hata diya — ab ye ek saada Vite project hai jo kahin bhi chalta hai. Isi liye
purana folder delete kar dena theek hai.

---

## Content badalna

**Sirf `src/data/cv.ts`** — naam, projects, links, skills, education, sab wahan
hai. Baaki kisi file ko haath lagane ki zaroorat nahi.

## Links

Saare links aapke GitHub se liye gaye hain. Aapke paas 5 repositories hain jin ke
andar folders hain, isliye har link seedha project ke folder par jata hai.

Live jo mile: ArchStudio (Vercel + admin panel), Luna & Spice (PythonAnywhere),
aur saare saat front-end projects (GitHub Pages).

**Teen baatein dhyan dein:**

- **MediBook** add kiya — GitHub par hai magar CV mein nahi tha
- **Scientific Calculator** hata diya — GitHub par folder nahi mila
- **"Password Manager"** ko **"Password Generator"** kar diya, kyunki repo ka
  naam `password-generator` hai. Aapke CV aur GitHub mein farq hai — ek jagah
  theek kar lijiye ga

---

## Project ke screenshots

Har project ke card mein ek browser mockup hai. Us mein aapke project ki
tasveer aati hai. Screenshots `public/projects/` folder mein rakhein, in
exact naamon se:

| Project | File ka naam |
|---|---|
| ArchStudio | `public/projects/archstudio.png` |
| Luna & Spice | `public/projects/luna-spice.png` |
| Gloss | `public/projects/gloss.png` |
| WellCrest | `public/projects/wellcrest.png` |
| DevHire | `public/projects/devhire.png` |
| ShopCart | `public/projects/shopcart.png` |
| TaskFlow | `public/projects/taskflow.png` |
| Gloss (static build) | `public/projects/gloss-static-build.png` |
| MediBook | `public/projects/medibook.png` |
| BudgetBuddy | `public/projects/budgetbuddy.png` |
| QuickBlog | `public/projects/quickblog.png` |
| AES File Encryption Tool | `public/projects/aes-file-encryption-tool.png` |
| Password Generator | `public/projects/password-generator.png` |
| QR Code Generator | `public/projects/qr-code-generator.png` |
| Sentiment Analysis Web App | `public/projects/sentiment-analysis-web-app.png` |

**Behtareen size: 1600 x 1000 pixel (16:10).** PNG ya JPG dono chalte hain.

Jo screenshot abhi nahi hai, wahan card khali nahi lagega — us mein project ka
naam aur file ka naam likha aa jayega, taake aapko pata rahe kya baqi hai.

**Screenshot lene ka aasan tareeqa:** live link kholein, browser ko full screen
karein, phir Windows par `Win + Shift + S` dabayein aur screen ka hissa select
kar lein. Jin projects ka live link hai un ke liye ye seedha ho jayega; Python
aur Flask waale projects locally chala kar screenshot le lein.

## Click ki awaz

Har button aur link par chhoti si "tick" bajti hai. Awaz **code se banti hai**
(`src/click.ts`), koi mp3 file nahi chahiye. Neeche daayen kone mein "Sound
on / off" ka button hai.

Awaz badalni ho to `src/click.ts` mein:

```ts
osc.frequency.setValueAtTime(920, now)  // shuru ki pitch — bara = oonchi
gain.gain.exponentialRampToValueAtTime(0.14, ...)  // kitni oonchi
```

## Contact form

Form **Netlify Forms** ke liye bana hai — koi account ya API key nahi chahiye,
bas site Netlify par deploy honi chahiye.

**Localhost par form kaam nahi karega.** `npm run dev` par "That didn't send"
aayega — ye normal hai, ghabrayein nahi.

Netlify par deploy karne ke baad:

1. Netlify dashboard → aapki site → **Forms** → wahan "contact" dikhega
2. Email notification ke liye: **Forms → Settings → Form notifications →
   Add notification → Email notification** → apna email daalein

Free plan par mahine ke 100 messages.

`index.html` mein ek chhupa hua form hai — **use delete na karein**, Netlify usi
se form ko pehchanta hai.

Agar Vercel par deploy karein to Netlify Forms nahi chalega; us soorat mein
formspree.io use karna parega.

## Welcome screen

Ek second "Welcome" dikhta hai, phir site khulti hai. `src/App.tsx` ke `Welcome`
component mein waqt badal sakti hain.

## Colors aur fonts

`src/index.css` ke `@theme` block mein:

| Token | Kya hai |
|---|---|
| `--color-cream` | background |
| `--color-pink` | buttons, italic headings, gulabi patti |
| `--color-blush` | tags ka halka background |
| `--color-ink` | text |
| `--color-plum` | tags ka text |

Fonts: Bodoni Moda (headings) aur Manrope (body), Google Fonts se.

## 3D phool

`src/three/Blossom.tsx` — sab shape code se bani hai, koi model file nahi.

- `LAYERS` — paankhuriyon ki tehen: ginti, size, rang, khulne ka jhukao
- `KEYFRAMES` — scroll ke sath phool kahan jaye

## Agar site slow chale

`src/three/Scene.tsx` mein `<Sparkles>` hata dein, ya `dpr={[1, 1.75]}` ko
`dpr={[1, 1.25]}` kar dein.

## Deploy karna

```
npm run build
```

`dist` folder ban jayega. Netlify par drag and drop kar dein, ya GitHub se
connect karein (build command `npm run build`, publish directory `dist`).
