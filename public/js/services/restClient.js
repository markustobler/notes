'use strict';

import AjaxUtil from '../utils/ajaxUtil.js';

class RestClient {

    constructor () {
        this.ajaxUtil = new AjaxUtil();
    }

    async createNote(note) {
        return await this.ajaxUtil.sendRequest(
            'POST',
            '/notes',
            note,
            {'Content-Type': 'application/json'}
        );
    }

    async getNotes() {
        return await this.ajaxUtil.sendRequest(
            'GET',
            '/notes',
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

}

const restClient = new RestClient();
export default restClient;
