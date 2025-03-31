"use client"
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import AdminLinkButton from "./AdminLink";

function MobileNavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isSignedIn } = useUser();

  const closeMenu = useCallback(() => {
    setShowMobileMenu(false)
  }, [])
  return (
    <div className="md:hidden items-center space-x-2">
      <ModeToggle />
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5"/>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px]" aria-describedby={undefined}>
        <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            {isSignedIn ? (
              <>
                {/* <AdminLinkButton variant="ghost" classes="flex items-center gap-3 justify-start" onClick={closeMenu}/> */}
                <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
                  <Link href={`/profile/${user.username ?? user?.emailAddresses[0]?.emailAddress.split("@")[0]}`}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start w-full" onClick={closeMenu}>
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full" onClick={closeMenu}>
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default MobileNavBar