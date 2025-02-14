import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/AxiosInstance";

export const useHostStore = create((set, get) => ({
    hackathons: null,
    isCreating: false,

    HostHackathon: async (data) => {
        try {
            set({ isCreating: true })
            const response = await axiosInstance.post("/user/hostEvent", data)
            set({ hackathons: response.data.event })
            toast.success("Event Created SuccessFully")
        } catch (error) {
            console.log("Error while creating event")
            toast.error(error.response.data.message)
        } finally {
            set({ isCreating: false })
        }
    }
}))