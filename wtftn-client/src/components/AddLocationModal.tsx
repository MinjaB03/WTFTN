import "./AddLocationModal.css";
import { useEffect, useState } from "react";

type AddLocationModalProps = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    selectedFile: File | null;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onFileChange: (file: File | null) => void;
    onSave: () => void;
    onCancel: () => void;
};

function AddLocationModal({
    name,
    description,
    latitude,
    longitude,
    selectedFile,
    onNameChange,
    onDescriptionChange,
    onFileChange,
    onSave,
    onCancel,
}: AddLocationModalProps) {
    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl =
            URL.createObjectURL(selectedFile);

        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);
    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h2>Add location</h2>

                    <p>
                        Add a new point to the map.
                    </p>
                </div>

                <div className="form-group">
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            onNameChange(event.target.value)
                        }
                        placeholder="Enter location name"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        placeholder="Write a short description"
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <label>Thumbnail</label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) =>
                            onFileChange(
                                event.target.files?.[0] ?? null
                            )
                        }
                    />
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Thumbnail preview"
                            className="thumbnail-preview"
                        />
                    )}

                    {selectedFile && (
                        <p className="selected-file">
                            Selected: {selectedFile.name}
                        </p>
                    )}
                </div>

                <div className="coordinates-box">
                    <div>
                        Latitude: {latitude.toFixed(6)}
                    </div>

                    <div>
                        Longitude: {longitude.toFixed(6)}
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        className="button button-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="button button-primary"
                        onClick={onSave}
                    >
                        Save location
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddLocationModal;