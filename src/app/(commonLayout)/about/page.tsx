"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            About Our Rental House
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            We provide comfortable, secure, and affordable rental homes designed
                            for modern living. Whether you&apos;re staying short-term or long-term,
                            our goal is to make you feel truly at home.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Button size="lg">
                                <Link href="/view">
                                    View Available Rooms
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline">
                                <Link href="email:example@gmail.com">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-semibold">Our Story</h2>
                        <p className="mt-4 text-muted-foreground">
                            Our rental house started with a simple idea: create a living space
                            that balances affordability with quality. Over the years, we&apos;ve
                            grown into a trusted place for students, professionals, and families
                            who value peace of mind and a friendly environment.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            We carefully maintain our properties, listen to our tenants, and
                            continuously improve our facilities to meet modern living standards.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <Home className="h-8 w-8 text-primary" />
                                <CardTitle>Well Maintained</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground px-2 py-4">
                                Clean rooms, regular maintenance, and modern amenities.
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <ShieldCheck className="h-8 w-8 text-primary" />
                                <CardTitle>Safe & Secure</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground px-2 py-4">
                                Secure entry, CCTV coverage, and a peaceful neighborhood.
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <Users className="h-8 w-8 text-primary" />
                                <CardTitle>Friendly Community</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground px-2 py-4">
                                Respectful tenants and a welcoming living environment.
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <MapPin className="h-8 w-8 text-primary" />
                                <CardTitle>Great Location</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground px-2 py-4">
                                Easy access to transport, markets, and daily necessities.
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="bg-muted/50">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h2 className="text-3xl font-semibold">Our Mission</h2>
                        <p className="mt-4 text-muted-foreground">
                            To offer reliable, comfortable, and affordable rental housing where
                            tenants feel safe, respected, and at home.
                        </p>
                    </motion.div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Transparency</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground px-2 py-4 ">
                                Clear rental terms with no hidden charges.
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Comfort</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground px-2 py-4">
                                Designed spaces that support everyday living.
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Responsibility</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground px-2 py-4">
                                We care for our property and our tenants equally.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border bg-card p-10 text-center"
                >
                    <h2 className="text-3xl font-semibold">Looking for a Place to Stay?</h2>
                    <p className="mt-4 text-muted-foreground">
                        Explore our available rooms and find the perfect rental home for you.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button size="lg">Check Availability</Button>
                        <Button size="lg" variant="outline">
                            Get in Touch
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

