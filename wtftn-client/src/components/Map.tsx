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

import EditLocationModal from "./EditLocationModal";
import AddLocationModal from "./AddLocationModal";

import type { Location } from "../types/Location";

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
    }

    function closeEditModal() {
        setEditingLocation(null);
        setEditName("");
        setEditDescription("");
        setEditSelectedFile(null);
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

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[
                            location.latitude,
                            location.longitude,
                        ]}
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

export default Map;