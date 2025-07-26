// Frontend of Quick Poll.
/*
quick-poll-frontend/
├── public/
│   ├── ContactUsImage.jpg
│   ├── Quick-Poll-Fevicon.png
│   └── Quick-Poll-Logo.png
│
├── src/
│   ├── assets/
│   │   └── (for images, icons, future static content)
│   │
│   ├── components/
│   │   ├── Authentication/
│   │   │   ├── Login.jsx             ✅ done (UI + logic wired)
│   │   │   └── SignUp.jsx            ✅ done (UI + logic wired + localStorage)
│   │   ├── Layout/
│   │   │   ├── Header.jsx            ✅ done
│   │   │   ├── Footer.jsx            ✅ done
│   │   │   └── Container.jsx         ✅ done
│   │   ├── CreatePoll.jsx           ⏳ in progress
│   │   ├── Explore.jsx              ✅ static wired
│   │   ├── Home.jsx                 ✅ done
│   │   ├── index.js                 ✅ central export
│   │   ├── Input.jsx                ✅ reusable inputs
│   │   ├── Logo.jsx                 ✅ done
│   │   └── PollCard.jsx             ✅ static version done
│   │
│   ├── features/
│   │   ├── authSlice.js             ✅ basic auth logic
│   │   └── pollSlice.js             ✅ poll logic wired
│   │
│   ├── pages/
│   │   ├── ContactUs.jsx            ✅ done (professional UI + responsive)
│   │   ├── CreatePoll.jsx           ⏳ setup in progress
│   │   ├── Explore.jsx              ✅ static wiring done
│   │   ├── Home.jsx                 ✅ done
│   │   ├── index.js                 ✅ optional page export
│   │   ├── Login.jsx                ✅ wrapper for login
│   │   ├── Logout.jsx               ⏳ placeholder
│   │   ├── PageNotFound.jsx        ⏳ fallback page
│   │   └── SignUp.jsx               ✅ wrapper for signup
│   │
│   ├── router/
│   │   └── routes.jsx               ✅ base routing scaffolded
│   │
│   ├── store/
│   │   └── store.js                 ✅ redux store config
│   │
│   ├── utils/
│   │   └── localStorage.js          ✅ user session (save/get/remove)
│   │
│   ├── App.jsx                      ✅ main layout and logic
│   ├── index.css                    ✅ Tailwind + global styles
│   └── main.jsx                     ✅ React entry point
│
├── .gitignore                      ✅ configured
├── eslint.config.js                ✅ lint rules
├── index.html                      ✅ vite HTML template
├── package-lock.json               ✅ auto-generated lock
├── package.json                    ✅ dependencies and scripts
├── postcss.config.js               ✅ tailwind/postCSS config
├── README.md                       ✅ project guide
├── tailwind.config.js              ✅ tailwind customization
└── vite.config.js                  ✅ vite bundler setup
*/
