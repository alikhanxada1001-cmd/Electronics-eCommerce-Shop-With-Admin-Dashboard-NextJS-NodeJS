import Link from "next/link";
import { navigation } from "@/lib/utils";

const Footer = () => {
  const groups = [
    { title: "Shop", items: navigation.sale },
    { title: "About Pak-Tajarat", items: navigation.about },
    { title: "Buying", items: navigation.buy },
    { title: "Customer Support", items: navigation.help },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-screen-2xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-1">
            <Link href="/" className="inline-flex flex-col" aria-label="Pak-Tajarat home">
              <span className="text-3xl font-extrabold tracking-tight text-white">Pak<span className="text-cyan-400">-</span>Tajarat</span>
              <span className="mt-2 text-sm text-slate-400">Pakistan&apos;s Online Shopping Store</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Discover everyday essentials and electronics with a convenient shopping experience across Pakistan.
            </p>
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-slate-400 transition hover:text-cyan-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pak-Tajarat. All Rights Reserved.</p>
          <p>Developed by <span className="font-semibold text-cyan-300">AK DEV STUDIO</span>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
