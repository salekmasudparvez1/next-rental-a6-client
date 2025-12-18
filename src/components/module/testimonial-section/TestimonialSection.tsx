"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Girl from "@/assets/profile/1.png"
import TestimonialCard from "./TestimonialCard"
import { StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeader from "../sectionHeader/SectionHeader"


type Testimonial = {
    name: string
    role?: string
    company?: string
    quote: string
    rating?: number
    image?: StaticImageData | string
}

export function TestimonialSection() {
    // Create a single autoplay plugin instance and reuse it so it isn't recreated every render
    const autoplay = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))
    const [api, setApi] = React.useState<CarouselApi | undefined>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", onSelect)
        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    const testimonials: Testimonial[] = React.useMemo(
        () => [
            {
                name: "Johne Doe",
                role: "Product Manager",
                company: "Acme Corp",
                quote: "This is the best service I have ever used. Highly recommended!",
                rating: 5,
                image: Girl,
            },
            {
                name: "Jane Smith",
                role: "CTO",
                company: "Beta Inc",
                quote: "The team delivered more than expected. Exceptional quality.",
                rating: 5,
                image: Girl,
            },
            {
                name: "Samuel Green",
                role: "Designer",
                company: "Studio X",
                quote: "Beautiful, intuitive, and fast — we've seen great results.",
                rating: 5,
                image: Girl,
            },
            {
                name: "Aisha Khan",
                role: "Founder",
                company: "Khan Labs",
                quote: "Support was great and features are thoughtfully designed.",
                rating: 5,
                image: Girl,
            },
            {
                name: "Carlos Ruiz",
                role: "Engineer",
                company: "DevCo",
                quote: "Reliable and fast. Would recommend to any team.",
                rating: 5,
                image: Girl,
            },
        ],
        []
    )

    return (
        <section aria-label="Customer testimonials" className="flex py-6 flex-col items-center">
            <SectionHeader
                title="Customer Testimonials"
                subtitle="What our clients say"
                alignment="center"
                showDivider
                className="mb-8"
            />
            <Carousel
                // reuse the same autoplay plugin instance
                plugins={[autoplay.current]}
                setApi={setApi}
                className="w-full max-w-xl border-0"
                onMouseEnter={() => autoplay.current?.stop()}
                onMouseLeave={() => autoplay.current?.reset()}
            >
                <CarouselContent>
                    {testimonials.map((t, index) => (
                        <CarouselItem key={index} className="border-0">
                            <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
                                <CardContent className=" px-6 border-0">
                                    {/* Use the reusable, "pro" TestimonialCard component */}
                                    <TestimonialCard
                                        name={t.name}
                                        role={t.role}
                                        company={t.company}
                                        quote={t.quote}
                                        rating={t.rating}
                                        imageSrc={t.image}
                                        imageAlt={`${t.name} profile`}
                                        className="mx-auto"
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="md:flex hidden justify-center gap-4 mt-4 items-center ">
                    <CarouselPrevious>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/80 hover:bg-white shadow"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </CarouselPrevious>

                    <div className="text-sm text-muted-foreground">
                        Slide {current} of {count}
                    </div>

                    <CarouselNext>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/80 hover:bg-white shadow"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </CarouselNext>
                </div>




            </Carousel>
        </section>
    )
}