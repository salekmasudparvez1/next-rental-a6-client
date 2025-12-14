"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/service/auth/AuthService"
import { adminNavigationsData, landlordNavigationsData, tenantNavigationsData } from "@/data/navigations"
import type { NavigationType } from "@/types"
import { useUser } from "@/contexts/UseerContext"


export function useNavigations() {
  const [navigations, setNavigations] = useState<NavigationType[]>([])
  const [loading, setLoading] = useState(true)
  const {setIsLoading}= useUser();
  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);
  


  useEffect(() => {
    const loadNavigations = async () => {
      const user = await getCurrentUser()
     

      switch (user?.role) {
        case "admin":
          setNavigations(adminNavigationsData)
          break
        case "tenant":
          setNavigations(tenantNavigationsData)
          break
        case "landlord":
          setNavigations(landlordNavigationsData)
          break
        default:
          setNavigations([])
      }

      setLoading(false)
    }

    loadNavigations()
  }, [])

  return { navigations }
}
