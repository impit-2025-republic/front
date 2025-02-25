import {useMutation} from "@tanstack/react-query"
import axios from "axios"

export const useLogin =()=>useMutation({
    mutationKey:["login"],
    mutationFn:(data:any)=>{
        const resp = axios.post('https://api.b8st.ru/login',{},{
            headers:{
                Authorization:`${"tma "+data}`
            }
        })
        return resp
    },
})