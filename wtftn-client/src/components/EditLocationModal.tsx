import "./EditLocationModal.css";
import { useEffect, useState } from "react";
import { getImageUrl } from "../services/locationService";
import type { LocationCategory } from "../types/Location";

type EditLocationModalProps = {
    name: string;
    description: string;
    currentThumbnailUrl: string | null;
    selectedFile: File | null;
    category: LocationCategory;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onCategoryChange: (value: LocationCategory) => void;
    onFileChange: (file: File | null) => void;
    onSave: () => void;
    onCancel: () => void;
};

function EditLocationModal({
    name,
    description,
    currentThumbnailUrl,
    selectedFile,
    category,
    onNameChange,
    onDescriptionChange,
    onCategoryChange,
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
                    <h2>Izmeni lokaciju</h2>

                    <p>
                        Izmeni infomracije o ovoj lokaciji.
                    </p>
                </div>

                <div className="edit-form-group">
                    <label>Naziv</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            onNameChange(event.target.value)
                        }
                    />
                </div>

                <div className="edit-form-group">
                    <label>Opis</label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        rows={5}
                    />
                </div>

                <div className="edit-form-group">
                    <label>Kategorija</label>

                    <select
                        value={category}
                        onChange={(event) =>
                            onCategoryChange(
                                event.target.value as LocationCategory
                            )
                        }
                    >
                        <option value="Hrana">Hrana</option>
                        <option value="Fakultet">Fakultet</option>
                        <option value="Sponzori">Sponzori</option>
                    </select>
                </div>

                <div className="edit-form-group">
                    <label>Promeni sliku</label>

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
                        Poništi
                    </button>

                    <button
                        className="edit-button edit-button-primary"
                        onClick={onSave}
                    >
                        Sačuvaj izmene
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditLocationModal;