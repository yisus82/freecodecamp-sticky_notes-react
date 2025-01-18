import { Models } from 'appwrite';

export interface Note {
  $id: string;
  body: string;
  colors: string;
  position: string;
}

export type NoteAttribute = 'body' | 'colors' | 'position';

export interface NoteColor {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
}

export interface NotePosition {
  x: number;
  y: number;
}

export interface DBNote {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: unknown[];
  $updatedAt: string;
  body: string;
  colors: string;
  position: string;
}

export interface DBCollection {
  name: string;
  id: string;
  dbId: string;
}

export interface NotePayload {
  body?: string;
  colors?: string;
  position?: string;
}

export interface CollectionMethods {
  create: (payload: NotePayload, id?: string) => Promise<Models.Document>;
  update: (id: string, payload: NotePayload) => Promise<Models.Document>;
  delete: (id: string) => Promise<object>;
  get: (id: string) => Promise<Models.Document>;
  list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>;
}

export interface Database {
  [collectionName: string]: CollectionMethods;
}
