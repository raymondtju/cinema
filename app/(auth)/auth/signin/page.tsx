import Redirect from "@/components/redirect";
import SigninForm from "@/components/signin-form";
import { getCurrentUser } from "@/lib/actions/user";
import { User } from "@prisma/client";

interface SigninPageProps {
  user: User;
}

export default async function SigninPage(req: Request) {
  const user = await getCurrentUser();
  if (user) return <Redirect path="/" />
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SigninForm />
        </div>
      </div>
    </>
  );
}
