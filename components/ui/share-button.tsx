import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
 const [open, setOpen] = useState(false);
 const shareLink = "https://client3.hyper6xhurmasice.online/achievements";

 const copyToClipboard = () => {
  navigator.clipboard.writeText(shareLink);
  toast.success("Link copied to clipboard!", {
   duration: 3000,
  });
 };

 return (
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
    <Button variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
     Share
    </Button>
   </DialogTrigger>
   <DialogContent className="bg-white">
    <DialogHeader>
     <DialogTitle>Share your achievements</DialogTitle>
    </DialogHeader>
    <div className="flex items-center gap-2">
     <Input value={shareLink} readOnly className="flex-1" />
     <Button onClick={copyToClipboard} size="icon">
      <ClipboardCopy size={18} />
     </Button>
    </div>
   </DialogContent>
  </Dialog>
 );
}
