/*

quick-poll-frontend/
├── public/
│   ├── ContactUsImage.jpg
│   ├── Quick-Poll-Fevicon.png
│   └── Quick-Poll-Logo.png
│
├── src/
│   ├── assets/
│   │   └── (for images, icons, and other static content)
│   │
│   ├── components/
│   │   ├── Authentication/
│   │   │   ├── Login.jsx               ✅ wired to backend + Redux
│   │   │   └── SignUp.jsx              ✅ wired to backend + Redux
│   │   │
│   │   ├── Layout/
│   │   │   ├── Container.jsx           ✅ wraps page content
│   │   │   ├── Footer.jsx              ✅ global footer
│   │   │   └── Header.jsx              ✅ navigation bar
│   │   │
│   │   ├── Button.jsx                  ✅ reusable button
│   │   ├── CreatePoll.jsx              ✅ poll form logic (used inside page)
│   │   ├── Dashboard.jsx               ✅ shows user's created polls
│   │   ├── Explore.jsx                 ✅ shows all polls (active + expired)
│   │   ├── Home.jsx                    ✅ landing page
│   │   ├── Input.jsx                   ✅ reusable input field
│   │   ├── Logo.jsx                    ✅ app logo component
│   │   ├── PollCard.jsx                ✅ dynamic poll box (vote + expired lock)
│   │   └── PollPage.jsx                ✅ single full poll view (in progress)
│   │
│   ├── features/
│   │   ├── authSlice.js                ✅ Redux slice for auth (login/signup/logout)
│   │   └── pollSlice.js                ✅ Redux slice for polls (userPolls etc.)
│   │
│   ├── pages/
│   │   ├── ContactUs.jsx               ✅ completed
│   │   ├── CreatePoll.jsx              ✅ page wrapper for CreatePoll component
│   │   ├── DashBoard.jsx               ✅ shows user poll dashboard
│   │   ├── Explore.jsx                 ✅ all poll listing
│   │   ├── Home.jsx                    ✅ landing page
│   │   ├── index.js                    ✅ optional page-level re-exports
│   │   ├── Login.jsx                   ✅ wraps Login component
│   │   ├── Logout.jsx                  ✅ clears Redux + hits /logout
│   │   ├── PageNotFound.jsx            ✅ fallback 404 page
│   │   ├── PollPage.jsx                ✅ routed full poll page
│   │   └── SignUp.jsx                  ✅ wraps SignUp component
│   │
│   ├── router/
│   │   └── routes.jsx                  ✅ all routing handled here
│   │
│   ├── store/
│   │   └── store.js                    ✅ Redux store config
│   │
│   ├── utils/
│   │   ├── axiosInstance.js            ✅ axios with base URL + token
│   │   ├── fetchUserData.js            ✅ helper for /users/me fetch
│   │   ├── localStorage.js             ✅ session fallback logic
│   │   └── localStoragePoll.js         ❌ deprecated (backend replaced)
│   │
│   ├── App.jsx                         ✅ main app component
│   ├── index.css                       ✅ Tailwind CSS + global styles
│   └── main.jsx                        ✅ React app entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js

*/