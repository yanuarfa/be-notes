export interface ICreateNoteBody {
  title?: string;
  description?: string;
}

export interface IUpdateNoteBody {
  title?: string;
  description?: string;
}

export interface IUpdateNoteParams {
  noteId: string;
}
