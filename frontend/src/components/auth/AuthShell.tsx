import Image from "next/image";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

/**
 * Mockup "Log In" / "Sign In": a 562px form panel (#f9fafb) on the left and a
 * photo on the right. On small screens the photo is hidden and the panel is full width.
 */
export function AuthShell({
  title,
  image,
  children,
  footer,
}: {
  title: string;
  image: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <main
        id="main-content"
        className="flex w-full flex-col items-center justify-between gap-16 bg-gray-50 px-6 py-[55px] lg:w-[562px] lg:shrink-0 lg:px-[140px]"
      >
        <Logo className="w-[200px] text-brand sm:w-[252px]" />
        <div className="flex w-full max-w-[282px] flex-col items-center gap-[30px]">
          <h1 className="font-heading text-[40px] leading-[1.37] font-bold text-brand-strong">
            {title}
          </h1>
          {children}
        </div>
        <div className="w-full max-w-[282px]">{footer}</div>
      </main>
      <div className="relative hidden flex-1 lg:block">
        <Image src={image} alt="" fill priority sizes="(min-width: 1024px) calc(100vw - 562px), 0px" className="object-cover" />
      </div>
    </div>
  );
}
