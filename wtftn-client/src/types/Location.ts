export type LocationCategory =
| "Hrana"
| "Fakultet"
| "Sponzori";

export interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
  category: LocationCategory;
  createdAt: string;
}