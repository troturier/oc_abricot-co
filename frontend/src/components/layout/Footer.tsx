import { Logo } from "@/components/ui/Logo";

/** Mockup "Footer": black logo on the left, "Abricot <year>" on the right. */
export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-[30px] lg:pr-[55px]">
        <Logo className="w-[101px] text-ink" />
        <p className="text-base text-black">Abricot {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
