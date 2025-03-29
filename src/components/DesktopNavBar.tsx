import { ModeToggle } from './ThemeToggle'
import { UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import AdminLinkButton from './AdminLink'

async function DesktopNavBar() {
  const user = await currentUser()
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      <Button variant="ghost" className='flex items-center gap-2' asChild>
        <Link href={"/"}>
          <HomeIcon className="w-4 h-4"/>
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      {user ?
        <>
          <AdminLinkButton variant="ghost" classes='flex items-center gap-2'/>
          <Button variant="ghost" className='flex items-center gap-2' asChild>
            <Link href={"/notifications"}>
              <BellIcon className="w-4 h-4"/>
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className='flex items-center gap-2' asChild>
            <Link href={`/profile/${user.username ?? user.emailAddresses[0]?.emailAddress.split("@")[0]}`}>
              <UserIcon className="w-4 h-4"/>
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
        :
        <Button className=" ">
          <Link href={"/sign-in"}>
            Sign in
          </Link>
        </Button>
      }
    </div>
  )
}

export default DesktopNavBar