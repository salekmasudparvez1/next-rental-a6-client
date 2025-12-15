import { MoveLeft, MoveRight, Upload, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"





const ImageHandler = ({setFileData}: {setFileData: React.Dispatch<React.SetStateAction<File[]>>}) => {
    const [items, setItems] = React.useState<{ file: File; url: string }[] | null>(null);
    const [openImageDialog, setOpenImageDialog] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        
        const fileArray = Array.from(files);
        const currentCount = items?.length || 0;
        const totalCount = currentCount + fileArray.length;
        
        // Check if total exceeds 4 images
        if (totalCount > 4) {
            toast.error(`Maximum 4 images allowed. You can only add ${4 - currentCount} more image(s).`);
            event.target.value = ''; // Reset input
            return;
        }
        
        const imageUrls = fileArray.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        
        // Append new images to existing ones
        setItems((prev) => prev ? [...prev, ...imageUrls] : imageUrls);
        setFileData((prev) => [...prev, ...fileArray]);
        
        event.target.value = ''; // Reset input for re-selection
    };
    const handleMoveRight = (item: { file: File; url: string }) => {
        setItems((prevItems) => {
            if (!prevItems) return prevItems;
            const index = prevItems.indexOf(item);
            if (index === -1 || index === prevItems.length - 1) return prevItems;
            
            const newItems = [...prevItems];
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
            
            // Sync file order
            setFileData(newItems.map(i => i.file));
            return newItems;
        });
    }
    const handleMoveLeft = (item: { file: File; url: string }) => {
        setItems((prevItems) => {
            if (!prevItems) return prevItems;
            const index = prevItems.indexOf(item);
            if (index <= 0) return prevItems;
            
            const newItems = [...prevItems];
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
            
            // Sync file order
            setFileData(newItems.map(i => i.file));
            return newItems;
        });
    }
    const handleDelete = (item: { file: File; url: string }) => {
        setItems((prevItems) => {
            if (!prevItems) return prevItems;
            return prevItems.filter((i) => i !== item);
        });
        setFileData((prevFiles) => prevFiles.filter((f) => f !== item.file));
    }
  

    return (
        <div className="flex flex-wrap gap-4">
            
            {/* Upload button */}
            {(!items || items.length < 4) && (
                <div className="relative h-24 w-28 border-dashed border-2 border-gray-300 rounded-md overflow-hidden flex-shrink-0">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded-md pointer-events-none">
                        <Upload className="mx-auto text-gray-600" />
                        <p className="text-xs font-light text-gray-700 mt-1">Upload images</p>
                        <p className="text-[10px] text-gray-500">{items?.length || 0}/4</p>
                    </div>
                </div>
            )}
            
            {items && items.length >= 4 && (
                <div className="h-24 w-28 border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center bg-gray-50">
                    <p className="text-xs text-gray-600 text-center px-2">Max 4 images<br/>reached</p>
                </div>
            )}

            {/* Preview images */}
            {items && items.length > 0 &&
                items.map((item, index) => (
                    <div
                        key={index}
                        className="h-24 w-28 relative rounded-md overflow-hidden border border-gray-300 shrink-0"
                    >
                        <MoveRight onClick={() => handleMoveRight(item)} className='absolute bottom-0 right-0 w-5 h-5 bg-gray-500 hover:bg-black transition-all duration-300 text-white' />
                        <MoveLeft onClick={() => handleMoveLeft(item)} className='absolute bottom-0 left-0 w-5 h-5 bg-gray-500 hover:bg-black transition-all duration-300 text-white' />
                        <X onClick={() => handleDelete(item)} className='absolute top-0 right-0 w-5 h-5 bg-gray-500 hover:bg-black transition-all duration-300 text-white' />
                            
                        <ZoomIn onClick={()=>setOpenImageDialog(true)} className='absolute top-0 left-0 w-5 h-5 bg-gray-500 hover:bg-black transition-all duration-300 text-white' />
                        <Image
                            src={item.url}
                            alt={`Preview ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
                <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
               
                 
                    <DialogContent className="sm:max-w-[425px]">
                        <Image
                            src={items && items[0] ? items[0].url : ''}
                            alt="Preview Image"
                            width={400}
                            height={400}
                            className="object-cover w-full h-auto"
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
               
            </Dialog>
        </div>

    );
};

export default ImageHandler;

