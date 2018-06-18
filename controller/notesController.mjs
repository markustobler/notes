import {noteStore} from '../services/noteStore'

export class NotesController {

    async getNotes(req, res) {
        res.json((await noteStore.all()))
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    };

    async showNote(req, res) {
        res.json(await noteStore.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const notesController = new NotesController();