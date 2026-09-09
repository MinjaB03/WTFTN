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
    <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => setSelectedCategory("All")}
    >
        All
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