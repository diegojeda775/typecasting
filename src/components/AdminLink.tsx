
import { ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/services/clerk';
import { canAccessAdminPages } from '@/permissions/general';
import { Button } from './ui/button';

interface AdminButtonProps {
  classes?: string
  onClick?: () => void
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null
}

async function AdminLinkButton(props: AdminButtonProps) {
  const {classes, onClick, variant = "default"} = props;
  const user = await getCurrentUser();
  if(!canAccessAdminPages(user)) return null;
  return (
    <Button variant={variant} className={classes} onClick={onClick} asChild>
      <Link href={"/admin"}>
        <ShieldUser className="w-4 h-4"/>
        <span className="hidden lg:inline">Admin</span>
      </Link>
    </Button>
  );
}

export default AdminLinkButton;