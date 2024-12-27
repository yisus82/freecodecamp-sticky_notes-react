export interface Note {
  $id: number;
  body: string;
  colors: string;
  position: string;
}

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
