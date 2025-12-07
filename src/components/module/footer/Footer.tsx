import { Separator } from '@/components/ui/separator'
import Logo from '@/assets/logo/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8">

        <Link href="#">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" height={30} />
          </div>
        </Link>

        <div className="flex items-center gap-5 whitespace-nowrap">
          <Link href="#" className="active:text-red-500 hover:text-red-500 transition-all duration-500">Home</Link>
          <Link href="/rentals">Find Rentals</Link>
          <Link href="/about-us">About Us</Link>
         
        </div>

        <div className="flex items-center gap-4">
          {/* Facebook */}
          <Link href="#">
           <Icon icon="akar-icons:facebook-fill" width="24" height="24" />
          </Link>

          {/* Instagram - FIXED SVG ERROR */}
          <Link href="#">
           <Icon icon="skill-icons:instagram" width="24" height="24" />
          </Link>

          {/* Twitter */}
          <Link href="#">
           <Icon icon="akar-icons:twitter-fill" width="24" height="24" />
          </Link>

          {/* Dribbble */} 
          <Link href="#">
           <Icon icon="akar-icons:dribbble-fill" width="24" height="24" />
          </Link>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6">
        <p className="text-center font-medium text-balance">
          ©{new Date().getFullYear()} <Link href="#">Shadcn/studio</Link>, Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default Footer
