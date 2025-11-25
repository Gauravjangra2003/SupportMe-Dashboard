import { Button } from "@/components/ui/button"
import { PersonStandingIcon } from "lucide-react"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div >
      <h1 className="flex gap-2 text-center items-center md:text-7xl font-black tracking-tight text-white relative z-10 leading-tight drop-shadow-[0_0_20px_rgba(170,170,255,0.25)]">
        <PersonStandingIcon size={50} className="text-pink-500"/> Support Me
      </h1>
      <span className="block text-[18px] md:text-[22px] font-light tracking-wide mt-3 opacity-70">
          Best Dashboard to manage customer support.
      </span>

      <div className="mt-10 flex justify-center items-center gap-5 relative z-10">
        <Button asChild
          className="px-10 py-5 text-lg rounded-full font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_20px_rgba(120,120,255,0.35)] hover:shadow-[0_0_30px_rgba(140,140,255,0.55)] hover:scale-[1.05] transition-all duration-300"
        >
          <Link href="/login">Log in</Link>
        </Button>
        <small>or</small>
        <Button asChild
          variant="outline"
          className="px-10 py-5 text-lg rounded-full font-semibold border border-white/20 text-white backdrop-blur-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300"
        >
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>

    </div>
  )
}

export default LandingPage