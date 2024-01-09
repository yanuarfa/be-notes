import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import NoteModel from "../models/note";
import {
  ICreateNoteBody,
  IUpdateNoteBody,
  IUpdateNoteParams,
} from "../utils/interfaces";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid noteId!");
    }

    const note = await NoteModel.findById(noteId).exec();

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  ICreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title!");
    }

    const newNote = await NoteModel.create({
      title,
      description,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  IUpdateNoteParams,
  unknown,
  IUpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, description } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid noteId!");
    }

    if (!title) {
      throw createHttpError(400, "Note must have a title!");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    note.title = title;
    note.description = description;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid noteId!");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    await note.deleteOne({ _id: noteId });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
