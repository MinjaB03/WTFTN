import "./EditLocationModal.css";
import { useEffect, useState } from "react";
import { getImageUrl } from "../services/locationService";

type EditLocationModalProps = {
    name: string;
    description: string;
    currentThumbnailUrl: string | null;
    selectedFile: File | null;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onFileChange: (file: File | null) => void;
    onSave: () => void;
    onCancel: () => void;
};

function EditLocationModal({
    name,
    description,
    currentThumbnailUrl,
    selectedFile,
    onNameChange,
    onDescriptionChange,
    onFileChange,
    onSave,
    onCancel,
}: EditLocationModalProps) {
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
        <div className="edit-modal-overlay">
            <div className="edit-modal-card">
                <div className="edit-modal-header">
                    <h2>Edit location</h2>

                    <p>
                        Update information about this location.
                    </p>
                </div>

                <div className="edit-form-group">
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            onNameChange(event.target.value)
                        }
                    />
                </div>

                <div className="edit-form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        rows={5}
                    />
                </div>

                <div className="edit-form-group">
                    <label>Change thumbnail</label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) =>
                            onFileChange(
                                event.target.files?.[0] ?? null
                            )
                        }
                    />
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="New thumbnail preview"
                            className="edit-thumbnail-preview"
                        />
                    ) : currentThumbnailUrl ? (
                        <img
                            src={getImageUrl(currentThumbnailUrl) ?? ""}
                            alt="Current thumbnail"
                            className="edit-thumbnail-preview"
                        />
                    ) : null}

                    {selectedFile && (
                        <p className="edit-selected-file">
                            Selected: {selectedFile.name}
                        </p>
                    )}

                    {!selectedFile && currentThumbnailUrl && (
                        <p className="edit-current-image">
                            Current image will be kept.
                        </p>
                    )}
                </div>

                <div className="edit-modal-actions">
                    <button
                        className="edit-button edit-button-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="edit-button edit-button-primary"
                        onClick={onSave}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditLocationModal;