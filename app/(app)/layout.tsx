import { getCurrentUser } from "@/lib/actions/user";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="relative">
      <Navbar user={user} />
      <div className="max-w-[1280px] mx-auto px-0 lg:px-2 mt-20">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
