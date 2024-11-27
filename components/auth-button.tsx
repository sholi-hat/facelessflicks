"use client"

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { useAuth } from '@/app/providers'
import { SignInDialog } from '@/components/sign-in-dialog'

export function AuthButton() {
  const [showSignIn, setShowSignIn] = useState(false)
  const { session } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>
      {session ? (
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      ) : (
        <Button onClick={() => setShowSignIn(true)} variant="outline">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      )}
      <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />
    </>
  )
}