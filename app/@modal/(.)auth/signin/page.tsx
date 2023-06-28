import SigninForm from "@/components/signin-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin",
}

export default async function SigninModal() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signin</DialogTitle>
          <SigninForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
