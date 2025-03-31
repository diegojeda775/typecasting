import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import AdminLinkButton from './AdminLink'
import { getCurrentUser } from '@/services/clerk'

async function DesktopNavBar() {
  const {user} = await getCurrentUser({allData: true})
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
            <Link href={`/profile/${user.username ?? user.email.split("@")[0]}`}>
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