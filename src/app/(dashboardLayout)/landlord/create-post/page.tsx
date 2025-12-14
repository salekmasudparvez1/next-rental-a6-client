import CreatePostFrom from "@/components/module/create-post/CreatePostFrom";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";


const CreatePostPage = () => {
    return (
        <div>
             <SectionHeader
                title="Create Rental Property"
                subtitle="New Post"
                description="Add a new rental property to your listings."
            />
            <CreatePostFrom />  
        </div>
    );
}

export default CreatePostPage;
