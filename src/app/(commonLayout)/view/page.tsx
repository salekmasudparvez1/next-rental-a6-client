import { ViewHeroSection } from '@/components/module/hero-section/ViewHeroSection';
import HouseURL from "@/assets/house/house.svg"

const ViewAllPostPage = () => {
    return (
        <div>
            {/* hero section part */}
            <ViewHeroSection 
            badge='Book Your House'
            heading='View All Rental House Post'
            description='Here you will find all the rental house post from diffrent place in our country and you can request to book them'
            image={{
                src:HouseURL,
                alt:"Findbasa"
            }}
            buttons={{
                primary:{
                    text:"View All Request",
                    url:"/tenat/view-all"
                }
                ,
                secondary:{
                   text :"View All History",
                   url:"/tenant/history"
                }
            }}
            />
            
        </div>
    );
}

export default ViewAllPostPage;
