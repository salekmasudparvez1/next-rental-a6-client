import { Separator } from '@/components/ui/separator';
import Logo from '@/assets/logo/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="w-full max-w-[1130px] mx-auto rounded-t-md overflow-hidden border border-neutral-200 bg-transparent px-3 font-medium text-neutral-600 transition-all duration-100 [box-shadow:3px_3px_3px_rgb(82_82_82)]">
      
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <Link href="#">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Image src={Logo} alt="Logo" height={30} />
              </div>
            </Link>
            <p className="text-sm text-gray-600">Making rentals easier for everyone.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Home</Link>
            <Link href="/rentals" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Find Rentals</Link>
            <Link href="/about-us" className="text-sm text-gray-600 hover:text-red-500 transition-colors">About Us</Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Terms of Use</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-red-500 transition-colors">Cookie Policy</Link>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <a href="mailto:info@example.com" className="text-sm text-gray-600 hover:text-red-500 transition-colors">
              info@example.com
            </a>
            <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-red-500 transition-colors">
              +1 (234) 567-890
            </a>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" aria-label="Facebook">
                <Icon icon="akar-icons:facebook-fill" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
              </a>
              <a href="#" aria-label="Instagram">
                <Icon icon="skill-icons:instagram" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
              </a>
              <a href="#" aria-label="Twitter">
                <Icon icon="akar-icons:twitter-fill" width="20" height="20" className="text-gray-600 hover:text-red-500 transition-colors" />
              </a>
            </div>
          </div>

        </div>
      </div>

      <Separator />

      {/* Copyright Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Findbasa. All rights reserved. Made ❤️ By <Link href="https://salekmasudparvez.netlify.app">Salek Masud Parvez</Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
