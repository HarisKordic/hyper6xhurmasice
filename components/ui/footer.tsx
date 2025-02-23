"use client";

import { useRouter } from "next/router";
import type React from "react";
import Link from "next/link";

import { Leaf, Twitter, Instagram, Linkedin, Github } from "lucide-react";

import SubscriptionForm from "@/utils/subscriptionForm";

export default function Footer() {
 const router = useRouter();
 const isHome = router.pathname === "/home";

 return (
  <footer
   className={`bottom-0 justify-center flex left-0 right-0 w-full border-t bg-background p-3 ${
    !isHome ? "lg:pl-72" : ""
   }`}
  >
   <div className="container max-w-7xl p-8 md:p-12">
    {/* Main footer content */}
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
     {/* Brand column */}
     <div className="space-y-4">
      <div className="flex items-center gap-2 justify-center lg:justify-start">
       <Leaf className="h-6 w-6 text-green-500" />
       <span className="font-semibold tracking-tight">EcoTracker</span>
      </div>
      <p className="text-sm text-muted-foreground text-center lg:text-left">
       Empowering individuals and businesses to track and reduce their environmental impact for a more sustainable
       future.
      </p>
     </div>

     <div className="space-y-4">
      <h3 className="font-semibold text-center lg:text-left">Quick Links</h3>
      <ul className="space-y-2 text-sm text-muted-foreground text-center lg:text-left">
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         About Us
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Features
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Sustainability Tips
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Carbon Calculator
        </Link>
       </li>
      </ul>
     </div>

     <div className="space-y-4">
      <h3 className="font-semibold text-center lg:text-left">Resources</h3>
      <ul className="space-y-2 text-sm text-muted-foreground text-center lg:text-left">
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Documentation
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Blog
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Community
        </Link>
       </li>
       <li>
        <Link href="#" className="hover:text-foreground transition-colors">
         Support
        </Link>
       </li>
      </ul>
     </div>

     <div className="space-y-4">
      <h3 className="font-semibold text-center lg:text-left">Stay Updated</h3>
      <p className="text-sm text-muted-foregroun text-center lg:text-left">
       Subscribe to our newsletter for the latest sustainability tips and updates.
      </p>
      <SubscriptionForm />
     </div>
    </div>

    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
     <p className="text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} EcoTracker. All rights reserved.
     </p>

     <div className="flex items-center gap-4">
      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
       <Twitter className="h-5 w-5" />
       <span className="sr-only">Twitter</span>
      </Link>
      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
       <Instagram className="h-5 w-5" />
       <span className="sr-only">Instagram</span>
      </Link>
      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
       <Linkedin className="h-5 w-5" />
       <span className="sr-only">LinkedIn</span>
      </Link>
      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
       <Github className="h-5 w-5" />
       <span className="sr-only">GitHub</span>
      </Link>
     </div>
    </div>
   </div>
  </footer>
 );
}
