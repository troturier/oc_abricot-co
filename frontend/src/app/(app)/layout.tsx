import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { requireUser } from "@/lib/auth/dal";

/** Layout of every authenticated page: menu, content, footer. */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();
  return (
    <>
      <SkipLink />
      <Header user={user} />
      <main id="main-content" className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-8 lg:px-[100px] lg:pt-[92px] lg:pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
