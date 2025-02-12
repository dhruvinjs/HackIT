import {create} from "zustand";
import { axiosInstance } from "../lib/AxiosInstance";
import toast from "react-hot-toast"
import {io} from "socket.io-client"

export const useAuthStore = create((set,get)=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingAuth : true,



    checkAuth : async()=>{
        try {
            const response = await axiosInstance.get("/user/checkAuth");
            console.log("checkAuth response : ",response.data);
            set({authUser:response.data})
        } catch (error) {
            console.log('Error in checkAuth : ',error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth : false})
        }
    },
    signup:async(details)=>{
        try {
            set({isSigningUp : true})
            const response = await axiosInstance.post("/user/signUp",details)
            set({authUser : response.data.user})
            toast.success(`Welcome ${details.name}.`)
        } catch (error) {
            console.log('Error in signup : ',error.message)
            toast.error(error.response.data.message)
            set({authUser:null})
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(details)=>{
        try {
            set({isLoggingIn : true});
            const response = await axiosInstance.post("/user/login",details);
            console.log(response.user.data)
            set({ authUser: response.data });
            toast.success(`Successfully logged in .`)
        } catch (error) {
            console.log("Error occured in login : ",error);
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn : false})

        }
    },
}))