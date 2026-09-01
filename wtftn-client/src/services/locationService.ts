import type { Location } from "../types/Location";

const API_ORIGIN = `http://${window.location.hostname}:8080`;

const API_URL = `${API_ORIGIN}/api/Locations`;

function getAdminToken() {
  return sessionStorage.getItem("wtftn_admin_token");
}

export async function getLocations(): Promise<Location[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
}

export async function createLocation(data: {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
}): Promise<Location> {
  const token = getAdminToken();

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create location");
  }

  return response.json();
}

export async function deleteLocation(
  id: string
): Promise<void> {
  const token = getAdminToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete location");
  }
}

export async function uploadThumbnail(
  file: File
): Promise<string> {
  const token = getAdminToken();

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/upload-thumbnail`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload thumbnail");
  }

  return response.text();
}

export function getImageUrl(
  thumbnailUrl: string | null
): string | null {
  if (!thumbnailUrl) {
    return null;
  }

  if (thumbnailUrl.startsWith("/")) {
    return `${API_ORIGIN}${thumbnailUrl}`;
  }

  try {
    const url = new URL(thumbnailUrl);

    return `${API_ORIGIN}${url.pathname}`;
  } catch {
    return thumbnailUrl;
  }
}

export async function updateLocation(
  id: string,
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    thumbnailUrl: string | null;
  }
): Promise<Location> {
  const token = getAdminToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update location");
  }

  return response.json();
}