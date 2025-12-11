import { Separator } from '@/components/ui/separator'
import Logo from '@/assets/logo/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 ">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="#">
              <div className="flex items-center gap-3">
                <Image src={Logo} alt="Logo" height={30} />
              </div>
            </Link>
            <p className="text-sm text-gray-600">Making rentals easier for everyone.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Home</Link>
              <Link href="/rentals" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Find Rentals</Link>
              <Link href="/about-us" className="text-sm text-gray-600 hover:text-red-500 transition-colors">About Us</Link>
            </div>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Terms of Use</Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@example.com" className="text-sm text-gray-600 hover:text-red-500 transition-colors">
                info@example.com
              </a>
              <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-red-500 transition-colors">
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-4 mt-2">
                {/* Facebook */}
                <a href="#" aria-label="Facebook">
                  <Icon icon="akar-icons:facebook-fill" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram">
                  <Icon icon="skill-icons:instagram" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
                </a>
                {/* Twitter */}
                <a href="#" aria-label="Twitter">
                  <Icon icon="akar-icons:twitter-fill" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Shadcn/studio. All rights reserved. Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default Footer
