"use client"
import React, { useState, useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RentalHouseCreateZodSchema } from './post.validation';
import ImageHandlaer from './ImageHandlaer';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LocationPicker from '../location/LocationPicker';
import { X } from 'lucide-react';
import LocationPreview from '../location/LocationPreview';
import { Spinner } from '@/components/ui/spinner';
import InputCombo, { ComboOption } from './InputCombo';
import { useBdInf } from '@/hooks/use-bdinfo';
import { TDivision, TDistrict, TUpazila } from '@/types/bd-data';
import { useCreatePost } from '@/hooks/use-post';
import { RentalHouseFormData, IFeature } from '@/types/post';
import { createPost } from '@/service/post/postService';
import { useRouter } from 'next/navigation';





const CreatePostFrom = () => {
    // set data localstorage && state management for get data and set data
    const { formData, clearForm, updateFormData, updateLocation, updateMap, updateFeatures } = useCreatePost()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,

    } = useForm<RentalHouseFormData>({
        resolver: zodResolver(RentalHouseCreateZodSchema),
        defaultValues: {
            status: formData?.status || "available",
            title: formData?.title || "",
            description: formData.description || "",
            location: {
                division: formData.location.division || "",
                district: formData.location.district || "",
                subDistrict: formData.location.subDistrict || "",
                streetAddress: formData.location.streetAddress || "",
                map: {
                    lat: formData.location.map.lat || 0,
                    lng: formData.location.map.lng || 0,
                },
            },
            rentAmount: formData.rentAmount || 0,
            bedroomNumber: formData.bedroomNumber || 1,
            features: formData?.features || [],
            images: [],
        },
    });
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [openLocationDialog, setOpenLocationDialog] = useState(false);
    const [divisionOptions, setDivisionOptions] = useState<ComboOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<ComboOption[]>([]);
    const [subdistrictOptions, setSubDistrictOptions] = useState<ComboOption[]>([]);
    const { useDivision } = useBdInf();
    const divisionData = useDivision();
    const [fileData, setFileData] = useState<File[]>([])
    const [features, setFeatures] = useState<IFeature[]>(formData?.features || [])
    const [newFeature, setNewFeature] = useState<IFeature>({ name: '', color: '#3b82f6' })
    const router = useRouter()


    const status = watch("status");
    const division = watch("location.division");
    const district = watch("location.district");

    // Sync location state with form data on load
    useEffect(() => {
        const formLocation = watch("location.map");
        if (formLocation?.lat && formLocation?.lng) {
            setLocation(formLocation);
            updateMap({ lat: formLocation.lat, lng: formLocation.lng });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // update features
    useEffect(() => {
         updateFeatures(features)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [features]);

    useEffect(() => {
        if (divisionData?.divisions && Array.isArray(divisionData.divisions)) {
            // Set division options
            const divisionOptions = divisionData.divisions.map((division: TDivision) => ({
                label: division.name,
                value: division.name,
            }));
            setDivisionOptions(divisionOptions as ComboOption[]);

            // Get districts for selected division
            if (division) {
                const selectedDivision = divisionData.divisions.find(
                    (d: TDivision) => d.name === division
                );
                if (selectedDivision && selectedDivision.districts) {
                    const firstDistrict = selectedDivision.districts[0].name;
                    // Only update if different from current value
                    if (firstDistrict !== district) {
                        updateLocation({ "district": firstDistrict });
                        setValue("location.district", firstDistrict, { shouldValidate: true });
                    }
                    const districtOpts = selectedDivision.districts.map((district: TDistrict) => ({
                        label: district.name,
                        value: district.name,
                    }));
                    setDistrictOptions(districtOpts as ComboOption[]);

                    // Get subdistricts for selected district
                    const selectedDistrict = selectedDivision.districts.find(
                        (d: TDistrict) => d.name === (firstDistrict !== district ? firstDistrict : district)
                    );
                    
                    if (selectedDistrict && selectedDistrict.upazilas) {
                        const subdistrictOpts = selectedDistrict.upazilas.map((subdistrict: TUpazila | string) => {
                            // Handle both string and object formats
                            const label = typeof subdistrict === 'string' ? subdistrict : subdistrict.name;
                            return {
                                label,
                                value: label,
                            };
                        });
                        const firstSubDistrict = subdistrictOpts[0].value;
                        // Only update if value exists
                        if (firstSubDistrict) {
                            updateLocation({ "subDistrict": firstSubDistrict });
                        }
                        setSubDistrictOptions(subdistrictOpts as ComboOption[]);
                    }
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [divisionData, division, district]);

    const addFeature = () => {
        if (newFeature.name.trim()) {
            const updatedFeatures = [...features, { ...newFeature }];
            setFeatures(updatedFeatures);
            setValue('features', updatedFeatures, { shouldValidate: true });
            setNewFeature({ name: '', color: '#3b82f6' });
            toast.success(`Feature "${newFeature.name}" added`);
        } else {
            toast.error('Please enter a feature name');
        }
    };

    const removeFeature = (index: number) => {
        const featureName = features[index].name;
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
        setValue('features', updatedFeatures, { shouldValidate: true });
        toast.success(`Feature "${featureName}" removed`);
    };

    const handleFeatureKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addFeature();
        }
    };

    const onSubmit = async (data: RentalHouseFormData) => {
        console.log('click');

        try {
            // upload to db process
            const formDataForDb = new FormData();

            formDataForDb.append('data', JSON.stringify(data));

            if (fileData.length) {
                fileData.forEach((file) => {
                    formDataForDb.append('images', file)
                })
            }
          
            const res = await createPost(formDataForDb)

            if (res.success) {
                toast.success(`Rental post created successfully named ${res?.data?.title}` ||
                    " Rental post created successfully"
                )
            }
            clearForm()
            router.push("/landlord/view-posts")

        } catch (error) {
            toast.error((error as Error)?.message || "Failed to create rental house");
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-5xl mx-auto p-4 md:p-6 '>
            <Card className='shadow-lg '>

                <CardContent className='pt-2'>
                    <div className="space-y-8">

                        {/* SECTION 1: Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h3>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-base font-medium">Property Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Modern 2BR Apartment in Downtown"
                                    {...register("title")}
                                    onChange={(e) => updateFormData({ "title": e.target.value })}
                                    className="h-11"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-base font-medium">Description *</Label>
                                <textarea
                                    id="description"
                                    placeholder="Describe your property in detail..."
                                    rows={5}
                                    className="w-full transition-all duration-100 [box-shadow:2px_2px_rgb(82_82_82)] px-3 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...register("description")}
                                    onChange={(e) => updateFormData({ "description": e.target.value })}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>
                        </div>

                        {/* SECTION 2: Location */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Location Details</h3>

                            {/* Location Grid - appears first for better UX */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Division */}
                                <div className="space-y-2">
                                    <Label htmlFor="division" className="font-medium">Division *</Label>
                                    <InputCombo
                                        options={divisionOptions}
                                        value={watch("location.division")}
                                        onChange={(val) => setValue("location.division", val, { shouldValidate: true })}
                                        
                                        placeholder="Select division"
                                        error={errors.location?.division?.message}
                                    />
                                    {errors.location?.division && (
                                        <p className="text-xs text-red-500">{errors.location.division.message}</p>
                                    )}
                                </div>

                                {/* District */}
                                <div className="space-y-2">
                                    <Label htmlFor="district" className="font-medium">District *</Label>
                                    <InputCombo
                                        options={districtOptions}
                                        value={watch("location.district")}
                                        onChange={(val) => setValue("location.district", val, { shouldValidate: true })}
                                        placeholder="Select district"
                                        error={errors.location?.district?.message}
                                    />
                                    {errors.location?.district && (
                                        <p className="text-xs text-red-500">{errors.location.district.message}</p>
                                    )}
                                </div>

                                {/* Upazila */}
                                <div className="space-y-2">
                                    <Label htmlFor="upozela" className="font-medium">Upazila *</Label>
                                    <InputCombo
                                        options={subdistrictOptions}
                                        value={watch("location.subDistrict")}
                                        onChange={(val) => setValue("location.subDistrict", val, { shouldValidate: true })}
                                        placeholder="Select upazila"
                                        error={errors.location?.subDistrict?.message}
                                    />
                                    {errors.location?.subDistrict && (
                                        <p className="text-xs text-red-500">{errors.location.subDistrict.message}</p>
                                    )}
                                </div>

                                {/* Street Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="streetAddress" className="font-medium">Street Address *</Label>
                                    <Input
                                        id="streetAddress"
                                        placeholder="e.g., 123 Main St"
                                        {...register("location.streetAddress")}
                                        className="h-10"
                                    />
                                    {errors.location?.streetAddress && (
                                        <p className="text-xs text-red-500">{errors.location.streetAddress.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Map Picker - appears after selects */}
                            <div className="space-y-2 mt-6">
                                <Label className="text-base font-medium">Property Location (Map) *</Label>
                                {location && !openLocationDialog && (
                                    <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200 relative z-0">
                                        <div className="flex gap-2">
                                            <Button onClick={() => setOpenLocationDialog(true)} variant="outline" size="sm">
                                                Change Location
                                            </Button>
                                            <Button onClick={() => setLocation(null)} variant="outline" size="sm">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <LocationPreview lat={location.lat} lng={location.lng} />                                        <p className="text-xs text-gray-600 mt-2">
                                            📍 Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
                                        </p>                                    </div>
                                )}
                                {!location &&
                                    <Button onClick={() => setOpenLocationDialog(true)} type='button' variant="outline" className="w-full h-11">
                                        📍 Pick Location on Map
                                    </Button>
                                }
                            </div>

                            {/* Map Dialog */}
                            <Dialog open={openLocationDialog} onOpenChange={setOpenLocationDialog}>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Select Property Location</DialogTitle>
                                    </DialogHeader>
                                    <LocationPicker
                                        value={location ?? undefined}
                                        onChangeAction={(lat, lng) => {
                                            setLocation({ lat, lng });
                                            setValue("location.map", { lat, lng });
                                        }}
                                    />
                                    {location && (
                                        <p className="text-sm text-muted-foreground">
                                            📍 Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
                                        </p>
                                    )}
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button onClick={() => {
                                                setLocation(null)
                                                setOpenLocationDialog(false)
                                            }} variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button onClick={() => setOpenLocationDialog(false)} type="button">Confirm Location</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* SECTION 3: Property Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Property Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Rent Amount */}
                                <div className="space-y-2">
                                    <Label htmlFor="rentAmount" className="font-medium">Monthly Rent ($) *</Label>
                                    <Input
                                        id="rentAmount"
                                        type="number"
                                        placeholder="e.g., 1200"
                                        {...register("rentAmount", { valueAsNumber: true })}
                                        className="h-10"
                                    />
                                    {errors.rentAmount && (
                                        <p className="text-xs text-red-500">{errors.rentAmount.message}</p>
                                    )}
                                </div>

                                {/* Bedrooms */}
                                <div className="space-y-2">
                                    <Label htmlFor="bedroomNumber" className="font-medium">Bedrooms *</Label>
                                    <Input
                                        id="bedroomNumber"
                                        type="number"
                                        min="1"
                                        max="20"
                                        placeholder="e.g., 2"
                                        {...register("bedroomNumber", { valueAsNumber: true })}
                                        className="h-10"
                                    />
                                    {errors.bedroomNumber && (
                                        <p className="text-xs text-red-500">{errors.bedroomNumber.message}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="font-medium">Status *</Label>
                                    <Select
                                        value={status}
                                        
                                        
                                        onValueChange={(value) => {
                                            setValue("status", value as "available" | "rented" | "maintenance", { shouldValidate: true });
                                            updateFormData({ status: value as "available" | "rented" | "maintenance" });
                                        }}
                                    >
                                        <SelectTrigger className="h-10" type="button">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent avoidCollisions={true} className='overflow-auto'>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="rented">Rented</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-xs text-red-500">{errors.status.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: Features */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Property Features</h3>
                            
                            {/* Add Feature */}
                            <div className="flex gap-2 items-end">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="featureName" className="font-medium">Feature Name</Label>
                                    <Input
                                        id="featureName"
                                        placeholder="e.g., Parking, WiFi, Pool"
                                        value={newFeature.name}
                                        onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                                        onKeyPress={handleFeatureKeyPress}
                                        className="h-10"
                                    />
                                </div>
                                <div className="w-32 space-y-2">
                                    <Label htmlFor="featureColor" className="font-medium">Color</Label>
                                    <Input
                                        id="featureColor"
                                        type="color"
                                        value={newFeature.color}
                                        onChange={(e) => setNewFeature({ ...newFeature, color: e.target.value })}
                                        className="h-10"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={addFeature}
                                    variant="outline"
                                    className="h-10 px-4"
                                >
                                    + Add
                                </Button>
                            </div>

                            {/* Features List */}
                            {features.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                                            style={{ backgroundColor: feature.color, color: '#fff' }}
                                        >
                                            <span>{feature.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="hover:bg-white/20 rounded-full p-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* SECTION 5: Images */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Property Images</h3>
                            <ImageHandlaer setFileData={setFileData} />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse md:flex-row gap-3 justify-end pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="md:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="md:w-auto"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner /> Creating...
                                    </>
                                ) : (
                                    '✓ Create Property'
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

export default CreatePostFrom;
