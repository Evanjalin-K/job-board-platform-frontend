import { instance } from "./instance"

const homeServices = {

    content: async( description ) => {
        return await instance.post('/home/content', {
            description
    })
    }
}

export { homeServices }