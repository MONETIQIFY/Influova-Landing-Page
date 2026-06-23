# Influova — Landing Page

A single-page landing site for **Influova**, the agency that monetises personal
brands. Visitors apply to work with you using a short form (name, email,
Instagram handle, phone), and are shown a confirmation that you'll be in contact
by email or phone.

Built as a plain static site (HTML/CSS/JS) — no build step, no database to
manage. Form submissions are handled by **Netlify Forms**.

---

## Files

| File           | Purpose                                            |
|----------------|----------------------------------------------------|
| `index.html`   | The whole page (hero, services, testimonial, form) |
| `styles.css`   | Styling — uses the logo's purple→pink colour scheme |
| `script.js`    | Inline success message after the form is submitted |
| `netlify.toml` | Netlify config (static publish + headers)          |
| `assets/`      | Your logo and client photo go here                 |

---

## 1. Add your images

Drop these two files into the `assets/` folder (keep the exact names):

- **`assets/logo.png`** — the Influova logo (used in the nav + favicon).
  > The hero already shows a built-in SVG version of the logo, so the page looks
  > right even before you add this file.
- **`assets/kieran.jpg`** — a photo of Kieran McCartney for the testimonial.
  > Until you add it, the testimonial automatically shows a gradient "KM" badge,
  > so nothing looks broken.

---

## 2. Deploy to Netlify

**Easiest way (connect your GitHub repo):**

1. Go to <https://app.netlify.com> and log in (use **Continue with GitHub**).
2. Click **Add new site → Import an existing project**.
3. Choose GitHub and pick the `influova-landing-page` repository.
4. Leave the build settings as detected (publish directory `.`, no build
   command) and click **Deploy**.
5. Netlify gives you a live URL like `your-site.netlify.app`. You can add a
   custom domain later under **Domain settings**.

Every time you push to the branch, Netlify redeploys automatically.

---

## 3. Get applications sent to you

The form is already wired up for Netlify Forms (`data-netlify="true"`), so
submissions are captured automatically. To make sure they reach **you**:

1. In Netlify, open your site → **Forms**. You'll see a form named **`apply`**
   and every submission listed there (name, email, Instagram, phone).
2. To get emailed each time someone applies:
   - Go to **Forms → Form notifications → Add notification → Email notification**.
   - Enter **monetiqify@gmail.com** as the recipient.
   - Save. From now on every application lands in that inbox.
3. (Optional) You can also export all submissions to CSV from the Forms page, or
   connect Slack/Zapier/webhooks under the same notifications screen.

> Note: the **Forms** tab only appears after your first deploy. If you don't see
> submissions, make sure form detection is on under
> **Site settings → Forms → Form detection**.

---

## Running locally

It's just static files. Open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

(The form only stores submissions once deployed on Netlify — locally it will
just show the success message.)

---

## Editing copy

All wording lives in `index.html`. Common things you might change:

- **Testimonial text** — search for `Kieran McCartney` in `index.html`.
- **Services** — the four `<article class="card">` blocks.
- **Notification email** — managed in the Netlify dashboard (see step 3), not in
  the code.
