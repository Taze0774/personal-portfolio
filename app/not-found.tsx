import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="page-container flex min-h-[60vh] flex-col justify-center py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-sm leading-7 text-muted">
        The page you were looking for may have moved, or the link might be out
        of date. Head back to the homepage.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
