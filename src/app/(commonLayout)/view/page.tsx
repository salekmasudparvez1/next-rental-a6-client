import { ViewHeroSection } from '@/components/module/hero-section/ViewHeroSection';
import HouseURL from "@/assets/house/house.svg"
import AllPost from '@/components/module/all-post/AllPost';

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
                    text:"view profile",
                    url:"https://github.com/salekmasudparvez1/next-rental-a6-client"
                }
                ,
                secondary:{
                   text :"Contact with us",
                   url:"/contact"
                }
            }}
            />
             <AllPost />
            
            
        </div>
    );
}

export default ViewAllPostPage;
