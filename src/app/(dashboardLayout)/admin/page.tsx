import SectionHeader from '@/components/module/sectionHeader/SectionHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const DashboardPage = () => {
    return (
        <div className='px-4 min-h-[calc(100vh-60px)]'>
            <SectionHeader
                title="Dashboard"
                subtitle="Welcome to your dashboard"
            />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                {/* Total Users */}
                <Card className="w-full my-2 py-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='px-3'>
                        <div className="text-3xl font-bold">1,240</div>
                        <p className="text-xs text-muted-foreground">
                            Registered users in the system
                        </p>
                    </CardContent>
                </Card>

                {/* Active Users */}
                <Card className="w-full my-2 py-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='px-3'>
                        <div className="text-3xl font-bold text-green-600">856</div>
                        <p className="text-xs text-muted-foreground">
                            Currently active users
                        </p>
                    </CardContent>
                </Card>

                {/* Total Posts */}
                <Card className="w-full my-2 py-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Posts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='px-3'>
                        <div className="text-3xl font-bold">3,742</div>
                        <p className="text-xs text-muted-foreground">
                            Posts created by users
                        </p>
                    </CardContent>
                </Card>

                {/* Active Posts */}
                <Card className="w-full my-2 py-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Posts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='px-3'>
                        <div className="text-3xl font-bold text-blue-600">2,981</div>
                        <p className="text-xs text-muted-foreground">
                            Currently published posts
                        </p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default DashboardPage;
