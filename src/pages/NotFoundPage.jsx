import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function MaskArt() {
  return (
    <svg
      className="notfound__mask relative h-auto w-[min(82%,380px)] rotate-[-4deg] drop-shadow-[9px_9px_0_#171717] max-[860px]:w-[min(60%,260px)]"
      viewBox="0 0 280 200"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <polygon points="16,100 74,48 140,70 140,184 50,160" fill="#ffffff" />
        <polygon
          points="140,70 206,48 264,100 230,160 140,184"
          fill="var(--color-ink)"
        />
        <polygon points="74,48 28,16 64,66" fill="var(--color-ink)" />
        <polygon points="206,48 252,16 216,66" fill="#ffffff" />
        <polygon points="56,104 108,90 108,112 56,124" fill="var(--color-persona-red)" />
        <polygon
          points="224,104 172,90 172,112 224,124"
          fill="var(--color-persona-red)"
        />
        <path d="M140 70 L140 184" />
      </g>
    </svg>
  );
}

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Halaman tidak ditemukan | Manajemen Produk';
  }, []);

  return (
    <main className="notfound grid min-h-svh grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] bg-page max-[860px]:min-h-svh max-[860px]:grid-cols-1 max-[860px]:grid-rows-[auto_1fr]">
      <section
        className="notfound__content flex flex-col justify-center gap-4 px-[clamp(32px,7vw,96px)] py-12 max-[860px]:px-5 max-[860px]:pb-10 max-[860px]:pt-14"
        aria-labelledby="notfound-title"
      >
        <p className="notfound__tag w-fit -rotate-2 rounded-none border-[3px] border-ink bg-persona-red px-[14px] py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_#171717]">
          Error 404
        </p>

        <h1
          className="notfound__title -ml-1.5 flex skew-x-[-8deg] font-display text-[clamp(88px,17vw,190px)] font-extrabold leading-[0.78] max-[420px]:text-[88px]"
          id="notfound-title"
          aria-label="404"
        >
          <span className="notfound__digit [&+span]:-ml-[0.05em]" aria-hidden="true">
            4
          </span>
          <span
            className="notfound__digit text-persona-red [-webkit-text-stroke:3px_var(--color-ink)] [&+span]:-ml-[0.05em]"
            aria-hidden="true"
          >
            0
          </span>
          <span
            className="notfound__digit text-transparent [-webkit-text-stroke:3px_var(--color-ink)]"
            aria-hidden="true"
          >
            4
          </span>
        </h1>

        <p className="notfound__lead mt-2 font-display text-[clamp(22px,3vw,30px)] font-extrabold leading-[1.15]">
          Halaman ini tidak ada.
        </p>
        <p className="notfound__copy max-w-[46ch] text-base text-subtext">
          Alamat yang kamu buka salah, atau halamannya sudah dipindah. Tidak ada
          yang menunggu di balik pintu ini.
        </p>

        <Link
          className="notfound__cta mt-3 inline-flex min-h-[52px] w-fit items-center self-start rounded-none border-[3px] border-ink bg-persona-red px-6 font-display text-[15px] font-extrabold text-white no-underline shadow-[5px_5px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#171717] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong motion-reduce:transform-none"
          to="/"
        >
          Kembali ke daftar produk
        </Link>
      </section>

      <div className="notfound__art relative grid min-h-0 place-items-center overflow-hidden border-l-[3px] border-ink bg-persona-red bg-[radial-gradient(rgba(23,23,23,0.22)_1.4px,transparent_1.5px)] bg-size-[9px_9px] p-[clamp(24px,5vw,64px)] max-[860px]:min-h-[300px] max-[860px]:border-l-0 max-[860px]:border-t-[3px] max-[420px]:min-h-[240px]" aria-hidden="true">
        <div className="absolute inset-[22%_10%] skew-x-[-10deg] rotate-[-3deg] border-[3px] border-ink bg-surface shadow-[10px_10px_0_rgba(23,23,23,0.35)]" />
        <span className="absolute right-[clamp(16px,4vw,48px)] top-[clamp(20px,4vw,48px)] z-10 rotate-[6deg] border-[3px] border-white bg-ink px-4 py-2 font-display text-[13px] font-extrabold uppercase tracking-[0.22em] text-white max-[420px]:right-[14px] max-[420px]:top-[14px] max-[420px]:px-[10px] max-[420px]:py-1.5 max-[420px]:text-[11px]">
          Not Found
        </span>
        <MaskArt />
      </div>
    </main>
  );
}
