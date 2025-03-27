
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignInButton, SignUpButton } from "@clerk/nextjs";



export default async function Home() {

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly">
      <div className="">
        <h1 className="text-5xl font-semibold">Welcome to the</h1>
        <h1 className="text-5xl font-semibold">TypeCasting App!</h1>
      </div>
      <div className="sticky top-20 mt-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-full">
                <div className="flex justify-evenly">
                    <p className="text-sm">Please sign in to access your account</p>
                </div>
                <Separator className="my-4"/>
              </div>
              <div className="w-full space-y-2">
                <SignInButton mode="modal">
                <Button variant="outline" className="m-5">
                  Sign in
                </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="default" className="m-5">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
