import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] grid place-items-center bg-burgundy-700 text-paper px-6">
      <div className="max-w-lg text-center space-y-6">
        <p className="font-bebas tracking-[0.22em] text-gold-500 text-sm">404</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight">
          Strona nie została znaleziona
        </h1>
        <p className="text-paper/75">
          Wróć do strony głównej i porozmawiajmy o czystszej przestrzeni.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-burgundy-900 font-medium"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
