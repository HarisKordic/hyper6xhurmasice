import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendSubscriptionConfirmation } from "@/helpers";

const SubscriptionForm = () => {
 const [email, setEmail] = useState<string>("");
 const [message, setMessage] = useState<string>("");

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
   await sendSubscriptionConfirmation(email);
   setMessage("Subscription successful! Check your email for confirmation.");
   console.log(message);
   toast.success("Subscription successful! Check your email for confirmation.", {
    duration: 3000,
   });
  } catch (error) {
   setMessage("Failed to subscribe. Please try again.");
   console.log(message);
   toast.error("Failed to subscribe. Please try again.", {
    duration: 3000,
   });
   console.error("Error sending email:", error);
  }
 };

 return (
  <div>
   <form onSubmit={handleSubmit} className="flex gap-2 justify-center md:justify-start">
    <Input
     type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     placeholder="Enter your email"
     className="max-w-[220px]"
    />
    <Button type="submit" size="icon" variant="outline">
     <ArrowRight className="h-4 w-4" />
    </Button>
   </form>
  </div>
 );
};

export default SubscriptionForm;
