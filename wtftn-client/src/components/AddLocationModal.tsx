import "./AddLocationModal.css";
import { useEffect, useState } from "react";
import type { LocationCategory } from "../types/Location";

type AddLocationModalProps = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    selectedFile: File | null;
    category: LocationCategory;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onCategoryChange: (value: LocationCategory) => void;
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
    category,
    onNameChange,
    onDescriptionChange,
    onCategoryChange,
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
                    <h2>Dodaj lokaciju</h2>

                    <p>
                        Dodaj novo mesto na mapi.
                    </p>
                </div>

                <div className="form-group">
                    <label>Naziv</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            onNameChange(event.target.value)
                        }
                        placeholder="Unesi ime lokacije"
                    />
                </div>

                <div className="form-group">
                    <label>Opis</label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        placeholder="Napiši kratak opis"
                        rows={5}
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <label>Sličica</label>

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
                        Geografska širina: {latitude.toFixed(6)}
                    </div>

                    <div>
                        Geografska dužina: {longitude.toFixed(6)}
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        className="button button-secondary"
                        onClick={onCancel}
                    >
                        Poništi
                    </button>

                    <button
                        className="button button-primary"
                        onClick={onSave}
                    >
                        Sačuvaj lokaciju
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddLocationModal;