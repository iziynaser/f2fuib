import axios from "axios"

const API="/transactions"

export function searchTransactions(filter){

    return axios.post(API+"/search",filter)

}

export function getTransaction(id){

    return axios.get(API+"/"+id)

}
