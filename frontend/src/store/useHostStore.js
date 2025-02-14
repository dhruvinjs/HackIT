import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/AxiosInstance";

export const useHostStore = create((set, get) => ({
    hackathons: null,
    selectedHackathon: null,
    particpantsCount: null,
    isCreating: false,
    isGettingActiveEvents: false,

    HostHackathon: async (data) => {
        try {
            set({ isCreating: true })
            const response = await axiosInstance.post("/user/hostEvent", data)
            toast.success("Event Created SuccessFully")
        } catch (error) {
            console.log("Error while creating event")
            toast.error(error.response.data.message)
        } finally {
            set({ isCreating: false })
        }
    },
    getActiveEvents: async () => {
        try {
            set({ isGettingActiveEvents: true })
            const response = await axiosInstance.get("/user/events")
            console.log(response)
            set({ hackathons: response.data.events })
            toast.success("Active Events fetched")
        } catch (error) {
            console.log("Error while fetching Active event")
            toast.error(error.response.data.message)
        } finally {
            set({ isGettingActiveEvents: false })
        }
    },
    getParticipants: async () => {
        try {
            const response = await axiosInstance.get("/user/getParticipants")
            console.log(response)
            set({ hackathons: response.data.participantCount })
            toast.success("Participant Count Fetched")
        } catch (error) {
            console.log("Error while fetching Participant Count")
            toast.error(error.response.data.message)
        }
    },
    getEventInfo: async (id) => {
        try {
            const response = await axiosInstance.get(`user/getEventDetails/${id}`)
            set({ selectedHackathon: response.data })
        } catch (error) {
            console.log("Error while fetching Hackthon Info")
            toast.error(error.response.data.message)
        }
    },
    
}))