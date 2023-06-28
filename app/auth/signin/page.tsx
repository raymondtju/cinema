import SigninForm from "@/components/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin",
}

export default async function SigninPage() {
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
