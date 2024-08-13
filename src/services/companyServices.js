import { instance, protectedInstance } from "./instance"

const companyServices= {
    getcompanies: async () =>{
        return await protectedInstance.get('/company/get')
    },
    getNames: async () =>{
        return await protectedInstance.get('/company/getnames')
    },
    getLogos: async () => {
        return await instance.get('/company/logo')

    },
    addCompany: async (name, location, logoUrl) => {
        return await protectedInstance.post('/company/add', name, location, logoUrl)
    }
}

export {companyServices}