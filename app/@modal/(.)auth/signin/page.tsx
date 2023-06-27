import Modal from "@/components/modal";
import SigninForm from "@/components/signin-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

// {/* <Modal>
//   <SigninForm />
// </Modal> */}
