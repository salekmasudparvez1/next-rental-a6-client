import Image from 'next/image';
import logourl from '@/assets/logo/logo.png';

const Logo = () => {
    return (
        <div >
            <Image src={logourl} alt="Logo" width={120} priority height={40} />
        </div>
    );
}

export default Logo;
