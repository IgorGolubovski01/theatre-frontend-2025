import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Accept' : 'application/json'
    },
    validateStatus: (status:number) => {
        return status === 200
    }

})

export class ProjectionService{

    
    static async getProjections(){
        return client.request({
            url: '/projection/getProjections',
            method: 'GET'
        })
    }








}


