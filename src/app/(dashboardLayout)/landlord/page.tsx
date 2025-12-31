"use client";

import React, { useEffect } from "react";
import { getDashbordInfoForLandlord } from "@/service/dashbord/dashbordService";
import { Spinner } from "@/components/ui/spinner";
import { ILandlordDashboardInfo } from "@/types/dashbord";
import toast from "react-hot-toast";


const LandlordPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [dashboardData, setDashboardData] = React.useState<ILandlordDashboardInfo | null>(null);

  useEffect(() => {
   const fetchDashboardData = async () => {
     try {
       const data = await getDashbordInfoForLandlord();
       setDashboardData(data);
     } catch (error) {
       toast.error(error instanceof Error ? error.message : "Failed to load dashboard data.");
     }finally {
       setLoading(false);
     }
   };
   fetchDashboardData();
  }, []);
    if (loading) {
          return (
              <div className="loader-overlay flex justify-center items-center">
                  <Spinner variant="ring" />
              </div>
          );
      }
    
  return (
    <div className=" bg-gray-100 p-4">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
        <p className="text-gray-600">Overview of your properties & income</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Properties", value: dashboardData?.totalProperties ?? "N/A" },
          { title: "Occupied Houses", value: dashboardData?.occupiedHouses ?? "N/A" },
          { title: "Vacant Houses", value: dashboardData?.vacantHouses ?? "N/A" },
          { title: "Monthly Income", value: dashboardData?.monthlyIncome ?? "N/A" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 border border-gray-300 shadow-[5px_5px_rgb(82_82_82)]"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 border border-gray-300 shadow-[5px_5px_rgb(82_82_82)]">
          <h3 className="font-semibold mb-4">Monthly Earnings</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-300 shadow-[5px_5px_rgb(82_82_82)]">
          <h3 className="font-semibold mb-4">Property Occupancy</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>

    

      

    </div>
  );
}

export default LandlordPage;