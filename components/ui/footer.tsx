"use client";

import type React from "react";
import { Leaf, Twitter, Instagram, Linkedin, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle newsletter subscription
 };

 return (
  <footer className="absolute bottom-0 left-0 right-0 w-full border-t bg-background p-3 lg:pl-72">
   <div className="container max-w-7xl p-8 md:p-12">
    {/* Main footer content */}
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
     {/* Brand column */}
     <div className="space-y-4">
      <div className="flex items-center gap-2 justify-center md:justify-start">
       <Leaf className="h-6 w-6 text-green-500" />
       <span className="font-semibold tracking-tight">EcoTracker</span>
      </div>
      <p className="text-sm text-muted-foreground text-center md:text-left">
       Empowering individuals and businesses to track and reduce their environmental impact for a more sustainable
       future.
      </p>
     </div>

     {/* Quick Links */}
     <div className="space-y-4">
      <h3 className="font-semibold text-center md:text-left">Quick Links</h3>
      <ul className="space-y-2 text-sm text-muted-foreground text-center md:text-left">
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

     {/* Resources */}
     <div className="space-y-4">
      <h3 className="font-semibold text-center md:text-left">Resources</h3>
      <ul className="space-y-2 text-sm text-muted-foreground text-center md:text-left">
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

     {/* Newsletter */}
     <div className="space-y-4">
      <h3 className="font-semibold text-center md:text-left">Stay Updated</h3>
      <p className="text-sm text-muted-foregroun text-center md:text-left">
       Subscribe to our newsletter for the latest sustainability tips and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center md:justify-start">
       <Input type="email" placeholder="Enter your email" className="max-w-[220px]" />
       <Button type="submit" size="icon" variant="outline">
        <ArrowRight className="h-4 w-4" />
       </Button>
      </form>
     </div>
    </div>

    {/* Bottom bar */}
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
