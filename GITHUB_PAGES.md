# GitHub Pages & profile setup

Your portfolio is published at **https://danghtran.github.io/homepage/**

## 1. Push code and deploy

```powershell
cd h:\WebProj\homepage
git remote set-url origin https://github.com/danghtran/homepage.git
git add .
git commit -m "Update portfolio and enable Pages deploy"
git push origin master
```

Pushing to `master` runs **Deploy GitHub Pages** (`.github/workflows/deploy-pages.yml`) and updates the live site.

Manual deploy (optional):

```powershell
npm run deploy
```

## 2. Show the site on your GitHub profile (`github.com/danghtran`)

GitHub does not embed your React app on the profile itself. Use these steps so visitors see your homepage:

### A. Profile README (recommended)

Create a **public** repo named exactly **`danghtran`** (same as your username):

1. https://github.com/new → Repository name: `danghtran`
2. Add a README
3. Replace its `README.md` with the contents of [`github-profile/README.md`](./github-profile/README.md) in this project
4. Commit — it appears at the top of https://github.com/danghtran

### B. Profile website link

1. https://github.com/settings/profile
2. **Website** → `https://danghtran.github.io/homepage/`
3. Save

### C. Pin the homepage repo

On https://github.com/danghtran → **Customize your pins** → pin **homepage**.

### D. Repo About box (homepage repo)

On https://github.com/danghtran/homepage → ⚙️ About → Website: `https://danghtran.github.io/homepage/`

## 3. Enable GitHub Pages (if needed)

https://github.com/danghtran/homepage/settings/pages

- **Source:** Deploy from branch **`gh-pages`** (root), *or* **GitHub Actions** if you switch to the official Pages workflow later.

After the first Action run, the site should match your latest `master` build.
