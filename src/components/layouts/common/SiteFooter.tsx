import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";

const FOOTER_NAV_ITEMS: [string, string][] = [
  ["Home", "/"],
  ["Features", "/features"],
  ["Process", "/process"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-700 bg-[#191D27] py-10 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white"
            aria-label="AI Hub Home"
          >
            AI ✨
          </Link>

          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium md:justify-start">
              {FOOTER_NAV_ITEMS.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label} {label === "Process" ? "▾" : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {[
              {
                Icon: LinkedInIcon,
                label: "LinkedIn",
                url: "#",
              },
              {
                Icon: TwitterIcon,
                label: "Twitter",
                url: "#",
              },
              {
                Icon: InstagramIcon,
                label: "Instagram",
                url: "#",
              },
            ].map(({ Icon, label, url }, i) => (
              <Link
                key={i}
                href={url}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-colors hover:border-gray-400 hover:text-white"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          © {new Date().getFullYear()} AI Hub. All images are for demo purposes.
        </div>
      </div>
    </footer>
  );
}
