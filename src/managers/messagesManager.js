import { messagesModel } from '../db/models/messages.model.js'

class MessagesManager {

    async createOne(obj) {
        const result = await messagesModel.create(obj)
        return result
    }
}

export const messagesManager = new MessagesManager()