import { useEffect, useState } from "react";
import {
    CircleMarker,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import EditLocationModal from "./EditLocationModal";
import AddLocationModal from "./AddLocationModal";

import type { Location, LocationCategory } from "../types/Location";

import {
    createLocation,
    deleteLocation,
    getImageUrl,
    getLocations,
    uploadThumbnail,
    updateLocation,
} from "../services/locationService";

import "./Map.css";

type ClickedPosition = {
    latitude: number;
    longitude: number;
};
const demoRoutes = [
    {
        id: "route-1",
        name: "Ruta 1",
        description: "Demo ruta za učesnike",
        color: "#7c3aed",
        points: [
            {
                id: "route-1-point-1",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-1-point-2",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-1-point-3",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-1-point-4",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-1-point-5",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-1-point-6",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-1-point-7",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-1-point-8",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-1-point-9",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
        ],

    },
    {
        id: "route-2",
        name: "Ruta 2",
        description: "Druga demo ruta",
        color: "#2563eb",
        points: [
            {
                id: "route-2-point-1",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-2-point-2",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-2-point-3",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-2-point-4",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-2-point-5",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-2-point-6",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-2-point-7",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-2-point-8",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-2-point-9",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },

        ],

    },
    {
        id: "route-3",
        name: "Ruta 3",
        description: "treca demo ruta",
        color: "#a632a8",
        points: [
            {
                id: "route-3-point-1",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-3-point-2",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-3-point-3",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-3-point-4",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-3-point-5",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-3-point-6",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-3-point-7",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-3-point-8",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-3-point-9",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },

        ],

    },
    {
        id: "route-4",
        name: "Ruta 4",
        description: "Cetvrta demo ruta",
        color: "#a87532",
        points: [
            {
                id: "route-4-point-1",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-4-point-2",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-4-point-3",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-4-point-4",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-4-point-5",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-4-point-6",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-4-point-7",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-4-point-8",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-4-point-9",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },

        ],

    },
    {
        id: "route-5",
        name: "Ruta 5",
        description: "Peta demo ruta",
        color: "#2f646b",
        points: [
            {
                id: "route-5-point-1",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-5-point-2",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-5-point-3",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-5-point-4",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-5-point-5",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-5-point-6",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-5-point-7",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-5-point-8",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-5-point-9",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
        ],

    },
    {
        id: "route-6",
        name: "Ruta 6",
        description: "Sesta demo ruta",
        color: "#326632",
        points: [
            {
                id: "route-6-point-1",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-6-point-2",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-6-point-3",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-6-point-4",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-6-point-5",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-6-point-6",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-6-point-7",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-6-point-8",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-6-point-9",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
        ],

    },
    {
        id: "route-7",
        name: "Ruta 7",
        description: "Sedma demo ruta",
        color: "#40184D",
        points: [
            {
                id: "route-7-point-1",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-7-point-2",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-7-point-3",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-7-point-4",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-7-point-5",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-7-point-6",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-7-point-7",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
            {
                id: "route-7-point-8",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-7-point-9",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
        ],

    },
    {
        id: "route-8",
        name: "Ruta 8",
        description: "Osma demo ruta",
        color: "#801B22",
        points: [
            {
                id: "route-8-point-1",
                name: "Služba smeštaja",
                latitude: 45.245610,
                longitude: 19.849306,
            },
            {
                id: "route-8-point-2",
                name: "NTP",
                latitude: 45.244767,
                longitude: 19.848188,
            },
            {
                id: "route-8-point-3",
                name: "Građevinski institut",
                latitude: 45.244684,
                longitude: 19.850275,
            },
            {
                id: "route-8-point-4",
                name: "Tereni",
                latitude: 45.2444284,
                longitude: 19.8536653,
            },
            {
                id: "route-8-point-5",
                name: "Mašinski",
                latitude: 45.245879,
                longitude: 19.850763,
            },
            {
                id: "route-8-point-6",
                name: "FTN",
                latitude: 45.246117,
                longitude: 19.851423,
            },
            {
                id: "route-8-point-7",
                name: "Rektorat",
                latitude: 45.247416,
                longitude: 19.853590,
            },
            {
                id: "route-8-point-8",
                name: "Menza",
                latitude: 45.246098,
                longitude: 19.849320,
            },
            {
                id: "route-8-point-9",
                name: "Fontana",
                latitude: 45.245686,
                longitude: 19.848968,
            },
        ],

    }
];

function MapClickHandler({
    onMapClick,
}: {
    onMapClick: (position: ClickedPosition) => void;
}) {
    useMapEvents({
        click(event) {
            onMapClick({
                latitude: event.latlng.lat,
                longitude: event.latlng.lng,
            });
        },
    });

    return null;
}

function Map() {
    const [locations, setLocations] =
        useState<Location[]>([]);

    const [clickedPosition, setClickedPosition] =
        useState<ClickedPosition | null>(null);

    const [name, setName] = useState("");

    const [description, setDescription] =
        useState("");

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [editingLocation, setEditingLocation] =
        useState<Location | null>(null);

    const [editName, setEditName] =
        useState("");

    const [editDescription, setEditDescription] =
        useState("");

    const [editSelectedFile, setEditSelectedFile] =
        useState<File | null>(null);

    const [category, setCategory] =
        useState<LocationCategory>("Hrana");

    const [editCategory, setEditCategory] =
        useState<LocationCategory>("Hrana");

    const [selectedCategory, setSelectedCategory] =
        useState<"All" | LocationCategory>("All");

    const [selectedRouteId, setSelectedRouteId] = useState<string | null>("route-1");
    const filteredLocations =
        selectedCategory === "All"
            ? locations
            : locations.filter(
                (location) =>
                    location.category === selectedCategory
            );

    const isAdmin =
        !!sessionStorage.getItem(
            "wtftn_admin_token"
        );

    const universityPosition: [number, number] = [
        45.246182,
        19.851437,
    ];

    useEffect(() => {
        async function loadLocations() {
            try {
                const data = await getLocations();
                setLocations(data);
            } catch (error) {
                console.error(
                    "Failed to load locations:",
                    error
                );
            }
        }

        loadLocations();

        const intervalId = setInterval(() => {
            loadLocations();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function closeModal() {
        setClickedPosition(null);
        setName("");
        setDescription("");
        setSelectedFile(null);
        setCategory("Hrana");
    }

    async function handleCreateLocation() {
        if (!clickedPosition) {
            return;
        }

        if (!name.trim()) {
            alert("Unesi naziv lokacije.");
            return;
        }

        try {
            let thumbnailUrl: string | null = null;

            if (selectedFile) {
                thumbnailUrl =
                    await uploadThumbnail(selectedFile);
            }

            const newLocation =
                await createLocation({
                    name,
                    description,

                    latitude:
                        clickedPosition.latitude,

                    longitude:
                        clickedPosition.longitude,

                    thumbnailUrl,
                    category,
                });

            setLocations((currentLocations) => [
                ...currentLocations,
                newLocation,
            ]);

            closeModal();
        } catch (error) {
            console.error(
                "Failed to create location:",
                error
            );

            alert(
                "Greška pri dodavanju lokacije."
            );
        }
    }

    function openEditModal(location: Location) {
        setEditingLocation(location);
        setEditName(location.name);
        setEditDescription(location.description);
        setEditSelectedFile(null);
        setEditCategory(location.category);
    }

    function closeEditModal() {
        setEditingLocation(null);
        setEditName("");
        setEditDescription("");
        setEditSelectedFile(null);
        setEditCategory("Hrana");
    }

    async function handleUpdateLocation() {
        if (!editingLocation) {
            return;
        }

        if (!editName.trim()) {
            alert("Unesi naziv lokacije.");
            return;
        }

        try {
            let thumbnailUrl =
                editingLocation.thumbnailUrl;

            if (editSelectedFile) {
                thumbnailUrl =
                    await uploadThumbnail(
                        editSelectedFile
                    );
            }

            const updatedLocation =
                await updateLocation(
                    editingLocation.id,
                    {
                        name: editName,
                        description:
                            editDescription,
                        latitude:
                            editingLocation.latitude,
                        longitude:
                            editingLocation.longitude,
                        thumbnailUrl,
                        category: editCategory,
                    }
                );

            setLocations((currentLocations) =>
                currentLocations.map((location) =>
                    location.id ===
                        updatedLocation.id
                        ? updatedLocation
                        : location
                )
            );

            closeEditModal();
        } catch (error) {
            console.error(
                "Failed to update location:",
                error
            );

            alert(
                "Greška pri izmeni lokacije."
            );
        }
    }

    async function handleDeleteLocation(
        location: Location
    ) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${location.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteLocation(location.id);

            setLocations((currentLocations) =>
                currentLocations.filter(
                    (item) =>
                        item.id !== location.id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete location:",
                error
            );

            alert(
                "Greška pri brisanju lokacije."
            );
        }
    }

    return (
        <div className="map-wrapper">
            <div className="map-category-filters">
                {demoRoutes.map((route) => (
                    <button
                        key={route.id}
                        className={
                            selectedRouteId === route.id
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSelectedRouteId(
                                selectedRouteId === route.id
                                    ? null
                                    : route.id
                            )
                        }
                    >
                        {route.name}
                    </button>
                ))}
            </div>
            <MapContainer
                center={universityPosition}
                zoom={16}
                className="map-container"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CircleMarker
                    center={universityPosition}
                    radius={7}
                    pathOptions={{
                        color: "#ffffff",
                        weight: 2,
                        fillColor: "#e53935",
                        fillOpacity: 1,
                    }}
                >
                    <Popup>
                        <div style={{ textAlign: "center" }}>
                            <strong>
                                Trenutno ste ovde
                            </strong>
                            <br />
                            Fakultet tehničkih nauka
                        </div>
                    </Popup>
                </CircleMarker>

                {isAdmin && (
                    <MapClickHandler
                        onMapClick={
                            setClickedPosition
                        }
                    />
                )}


                {selectedRouteId &&
                    demoRoutes
                        .find(
                            (route) =>
                                route.id === selectedRouteId
                        )
                        ?.points.map((point, index) => (
                            <Marker
                                key={point.id}
                                position={[
                                    point.latitude,
                                    point.longitude,
                                ]}
                                icon={L.divIcon({
                                    className: "route-number-marker-wrapper",
                                    html: `
            <div
                class="route-number-marker"
                style="
                    background-color: ${demoRoutes.find(
                                        (route) =>
                                            route.id === selectedRouteId
                                    )?.color ?? "#7c3aed"
                                        };
                "
            >
                ${index + 1}.
            </div>
        `,
                                    iconSize: [36, 36],
                                    iconAnchor: [18, 18],
                                    popupAnchor: [0, -20],
                                })}
                            >
                                <Popup>
                                    <strong>
                                        {index + 1}. {point.name}
                                    </strong>
                                </Popup>
                            </Marker>
                        ))}

                {filteredLocations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[
                            location.latitude,
                            location.longitude,
                        ]}
                        icon={getCategoryIcon(location.category)}
                    >
                        <Popup>
                            <div className="location-popup">
                                <strong className="location-popup-title">
                                    {
                                        location.name
                                    }
                                </strong>

                                {location.thumbnailUrl && (
                                    <img
                                        src={
                                            getImageUrl(
                                                location.thumbnailUrl
                                            ) ?? ""
                                        }
                                        alt={
                                            location.name
                                        }
                                        className="location-popup-image"
                                    />
                                )}

                                <p className="location-popup-description">
                                    {
                                        location.description
                                    }
                                </p>

                                {isAdmin && (
                                    <div className="location-popup-admin">
                                        <button
                                            className="location-edit-button"
                                            onClick={() =>
                                                openEditModal(
                                                    location
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="location-delete-button"
                                            onClick={() =>
                                                handleDeleteLocation(
                                                    location
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {isAdmin &&
                    clickedPosition && (
                        <Marker
                            position={[
                                clickedPosition.latitude,
                                clickedPosition.longitude,
                            ]}
                        />
                    )}
            </MapContainer>
            <br />
            <div className="map-category-filters">
                <button
                    className={selectedCategory === "All" ? "active" : ""}
                    onClick={() => setSelectedCategory("All")}
                >
                    Sve
                </button>

                <button
                    className={selectedCategory === "Hrana" ? "active" : ""}
                    onClick={() => setSelectedCategory("Hrana")}
                >
                    Hrana
                </button>

                <button
                    className={selectedCategory === "Fakultet" ? "active" : ""}
                    onClick={() => setSelectedCategory("Fakultet")}
                >
                    Zgrade fakulteta
                </button>

                <button
                    className={selectedCategory === "Sponzori" ? "active" : ""}
                    onClick={() => setSelectedCategory("Sponzori")}
                >
                    Sponzori
                </button>
            </div>

            {isAdmin && clickedPosition && (
                <AddLocationModal
                    name={name}
                    description={description}
                    latitude={
                        clickedPosition.latitude
                    }
                    longitude={
                        clickedPosition.longitude
                    }
                    selectedFile={selectedFile}
                    category={category}
                    onCategoryChange={setCategory}
                    onNameChange={setName}
                    onDescriptionChange={
                        setDescription
                    }
                    onFileChange={
                        setSelectedFile
                    }
                    onSave={
                        handleCreateLocation
                    }
                    onCancel={closeModal}
                />
            )}

            {isAdmin && editingLocation && (
                <EditLocationModal
                    name={editName}
                    description={
                        editDescription
                    }
                    currentThumbnailUrl={
                        editingLocation.thumbnailUrl
                    }
                    selectedFile={
                        editSelectedFile
                    }
                    category={editCategory}
                    onCategoryChange={setEditCategory}
                    onNameChange={
                        setEditName
                    }
                    onDescriptionChange={
                        setEditDescription
                    }
                    onFileChange={
                        setEditSelectedFile
                    }
                    onSave={
                        handleUpdateLocation
                    }
                    onCancel={
                        closeEditModal
                    }
                />
            )}
        </div>
    );
}

function getCategoryIcon(category: LocationCategory) {
    let categoryClass = "unknown";

    if (category === "Hrana") {
        categoryClass = "hrana";
    } else if (category === "Fakultet") {
        categoryClass = "fakultet";
    } else if (category === "Sponzori") {
        categoryClass = "sponzori";
    }

    return L.divIcon({
        className: "category-marker-wrapper",
        html: `<div class="category-marker ${categoryClass}"></div>`,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36],
    });
}

export default Map;