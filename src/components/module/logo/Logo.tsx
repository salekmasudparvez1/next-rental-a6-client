import Image from 'next/image';
import logourl from '@/assets/logo/logo.png';

const Logo = () => {
    return (
        <div className="relative h-7 sm:h-8 md:h-10 w-auto">
            <Image 
                src={logourl} 
                alt="Logo" 
                width={120} 
                height={40} 
                priority 
                className="h-full w-auto object-contain" 
                style={{ maxWidth: '100%' }}
            />
        </div>
    );
}

export default Logo;
