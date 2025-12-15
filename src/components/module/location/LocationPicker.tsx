"use client"

import React, { useEffect, useState, useRef } from "react"
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Navigation, MapPin } from "lucide-react"
import toast from "react-hot-toast"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

// Marker icon configuration
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

// Component to handle map centering and cursor style
function MapController({
    center,
    isPicking
}: {
    center: { lat: number; lng: number }
    isPicking: boolean
}) {
    const map = useMap()

    useEffect(() => {
        map.setView([center.lat, center.lng], map.getZoom())
    }, [center.lat, center.lng, map])

    useEffect(() => {
        const container = map.getContainer()
        if (isPicking) {
            container.style.cursor = "crosshair"
        } else {
            container.style.cursor = "grab"
        }
    }, [isPicking, map])

    return null
}

// Component to handle map clicks
function ClickHandler({
    onSelect,
    enabled,
}: {
    onSelect: (lat: number, lng: number) => void
    enabled: boolean
}) {
    useMapEvents({
        click(e) {
            if (enabled) {
                onSelect(e.latlng.lat, e.latlng.lng)
            }
        },
    })
    return null
}

export default function LocationPicker({
    value,
    onChangeAction,
}: {
    value?: { lat: number; lng: number }
    onChangeAction: (lat: number, lng: number) => void
}) {
    const [position, setPosition] = useState<{ lat: number; lng: number }>(() => {
        if (value) {
            return value
        }
        return {
            lat: 23.8103,
            lng: 90.4125,
        }
    })
    const [isPicking, setIsPicking] = useState(false)
    const [isLoading, setIsLoading] = useState(!value)
    const mapRef = useRef<L.Map | null>(null)
    const initRef = useRef(false)

    // Initialize position from value or get user location
    useEffect(() => {
        if (initRef.current) return
        initRef.current = true

        if (value) {
            return
        }

        if (typeof window !== "undefined" && navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    setPosition(newPos)
                    onChangeAction(newPos.lat, newPos.lng)
                    setIsLoading(false)
                },
                () => {
                    setIsLoading(false)
                }
            )
        }
    }, [value, onChangeAction])

    // Get user's current location
    const goToMyLocation = () => {
        if (typeof window === "undefined" || !navigator?.geolocation) {
            alert("Geolocation is not available")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }
                setPosition(newPos)
                onChangeAction(newPos.lat, newPos.lng)

                if (mapRef.current) {
                    mapRef.current.setView([newPos.lat, newPos.lng], 16)
                }
            },
            (err) => {
                toast.error(err?.message || "Unable to get your location.")
            }
        )
    }

    // Handle marker drag
    const handleMarkerDrag = (e: L.DragEndEvent) => {
        const marker = e.target as L.Marker
        const latlng = marker.getLatLng()
        const newPos = { lat: latlng.lat, lng: latlng.lng }
        setPosition(newPos)
        onChangeAction(newPos.lat, newPos.lng)
    }

    // Handle map click
    const handleMapClick = (lat: number, lng: number) => {
        const newPos = { lat, lng }
        setPosition(newPos)
        onChangeAction(newPos.lat, newPos.lng)
    }

    if (isLoading) {
        return (
            <div className="h-[400px] w-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    <Badge variant="outline">
                        <Spinner />
                        Processing
                    </Badge>

                </p>
            </div>
        )
    }

    return (
        <div className="relative w-full">
            {/* Control buttons */}
            <div className="absolute top-3 right-3 z-1000 flex flex-col gap-2">
                {/* My Location button */}
                <Button
                    variant="outline"
                    size='sm'
                    type="button"
                    onClick={goToMyLocation}
                    className="bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    title="Go to my location"
                >
                    <Navigation className="w-5 h-5 text-blue-600" />
                </Button>

                {/* Toggle picking mode */}
                <Button
                    variant="outline"
                    size='sm'
                    type="button"
                    onClick={() => setIsPicking(!isPicking)}
                    className={`p-2.5 rounded-lg shadow-lg transition-colors border ${isPicking
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                    title={isPicking ? "Click map to pick location" : "Enable picking mode"}
                >
                    <MapPin className="w-5 h-5" />
                </Button>
            </div>

            {/* Status indicator */}
            {isPicking && (
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-1000 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                    Click map or drag marker to select location
                </div>
            )}

            {/* Map container */}
            <MapContainer
                center={[position.lat, position.lng]}
                zoom={13}
                className="h-[400px] w-full rounded-lg border-2 border-gray-300"
                ref={(map) => {
                    if (map) mapRef.current = map
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={position} isPicking={isPicking} />

                <ClickHandler enabled={isPicking} onSelect={handleMapClick} />

                <Marker
                    position={[position.lat, position.lng]}
                    icon={markerIcon}
                    draggable={true}
                    eventHandlers={{
                        dragend: handleMarkerDrag,
                    }}
                />
            </MapContainer>

            {/* Location info */}
            <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Selected:</span> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </div>
        </div>
    )
}