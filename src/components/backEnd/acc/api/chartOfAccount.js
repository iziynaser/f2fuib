import axios from "axios"

const API="/accounts"

export function getAccountTree(){
    return axios.get(API+"/tree")
}

export function createAccount(data){
    return axios.post(API,data)
}

export function updateAccount(id,data){
    return axios.put(API+"/"+id,data)
}

export function getAccount(id){
    return axios.get(API+"/"+id)
}

export function deleteAccount(id){
    return axios.delete(API+"/"+id)
}
