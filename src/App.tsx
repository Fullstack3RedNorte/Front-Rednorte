import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen text-slate-200">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col border-x border-white/10 bg-slate-950/70">
        <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center md:py-24">
          <div className="relative h-52 w-52 sm:h-56 sm:w-56">
            <img
              src={heroImg}
              className="absolute inset-0 m-auto w-[170px] rounded-3xl shadow-2xl shadow-violet-950/30"
              alt=""
            />
            <img
              src={reactLogo}
              className="absolute left-1/2 top-8 z-10 h-8 -translate-x-1/2 rotate-[24deg] drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              alt="React logo"
            />
            <img
              src={viteLogo}
              className="absolute left-1/2 top-28 z-0 h-7 -translate-x-1/2 rotate-[24deg] opacity-90 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              alt="Vite logo"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-violet-400">
              Tailwind listo
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Get started
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">
              Edita <span className="rounded bg-white/5 px-2 py-1 font-mono text-slate-200">src/App.tsx</span> y guarda para probar <span className="rounded bg-white/5 px-2 py-1 font-mono text-slate-200">HMR</span>.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2 font-mono text-sm font-medium text-violet-200 transition hover:border-violet-300/60 hover:bg-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </section>

        <div className="h-px w-full bg-white/10" />

        <section className="grid border-t border-white/10 text-left lg:grid-cols-2">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:border-white/10 md:p-8">
            <svg className="mb-4 h-6 w-6 text-violet-400" role="presentation" aria-hidden="true">
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h2 className="text-2xl font-medium tracking-tight text-white">Documentation</h2>
            <p className="mt-2 text-slate-400">Your questions, answered</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              <li>
                <a
                  href="https://vite.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <img className="h-4 w-4" src={viteLogo} alt="" />
                  Explore Vite
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <img className="h-4 w-4" src={reactLogo} alt="" />
                  Learn more
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 md:p-8">
            <svg className="mb-4 h-6 w-6 text-violet-400" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2 className="text-2xl font-medium tracking-tight text-white">Connect with us</h2>
            <p className="mt-2 text-slate-400">Join the Vite community</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              <li>
                <a
                  href="https://github.com/vitejs/vite"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <svg className="h-4 w-4" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#github-icon"></use>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://chat.vite.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <svg className="h-4 w-4" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#discord-icon"></use>
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/vite_js"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <svg className="h-4 w-4" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#x-icon"></use>
                  </svg>
                  X.com
                </a>
              </li>
              <li>
                <a
                  href="https://bsky.app/profile/vite.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <svg className="h-4 w-4" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#bluesky-icon"></use>
                  </svg>
                  Bluesky
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="h-24 border-t border-white/10 md:h-32" />
      </div>
    </main>
  )
}

export default App
