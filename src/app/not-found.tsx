import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-sand-100 px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-fluid-h2 max-w-xl font-semibold text-balance">
        This dune hasn&apos;t been <span className="text-red-500 italic">mapped</span> yet.
      </h1>
      <p className="max-w-md text-ink-600">That page is coming soon. Head back and keep exploring.</p>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center rounded-full bg-red-500 px-7 text-sm font-bold uppercase tracking-[0.12em] text-sand-50 shadow-glow hover:bg-red-600"
      >
        Back to home
      </Link>
    </main>
  );
}
