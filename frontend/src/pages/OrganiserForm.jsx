import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { CalendarRange, Users, Info, Trophy, Upload, Globe, MapPin, Lock, Unlock, Layers, Gift, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Nav } from '../components';
import { useHostStore } from '../store/useHostStore';
import { useAuthStore } from '../store/useAuthStore';


function OrganiserForm() {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const participationType = watch('participationType');
    const eventType = watch('eventType');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'judges',  // This will be the array name in form data
    });

    const { HostHackathon } = useHostStore()

    const onSubmit = async (data) => {
        const finalData = {...data,logo : logoPreview,entryFee : "200rs"}
        console.log(finalData);
        await HostHackathon(finalData)
    };

    // const handleLogoChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setLogoPreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleLogoChange = (e) => {
        const file = e.target.files[0]

        if (!file) {
            console.log("image is not selected")
            return
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result;
            setLogoPreview(base64Image)
        }
        console.log(logoPreview)
    }



    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div>
            <Nav />
            <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-[#151515] text-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                            <h1 className="text-3xl font-bold text-white">Event Registration Form</h1>
                            <p className="text-purple-100 mt-2">Create your event and set up registration details</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
                            <motion.div variants={fadeIn} className="space-y-6">
                                <label className="block text-sm text-white mb-1">Title</label>
                                <div className="relative">

                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter The Title"
                                    />
                                </div>
                                <label className="block text-sm text-white mb-1">Organization Name</label>
                                <div className="relative">

                                    <input
                                        type="text"
                                        {...register("orgname", { required: true })}
                                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Organization Name"
                                    />
                                </div>
                                <label className="block text-sm text-white mb-1">Organization Email</label>
                                <div className="relative">

                                    <input
                                        type="text"
                                        {...register("orgemail", { required: true })}
                                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Organization Name"
                                    />
                                </div>
                                <label className="block text-sm text-white mb-1">Organization Number</label>
                                <div className="relative">

                                    <input
                                        type="text"
                                        {...register("orgno", { required: true })}
                                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Organization Name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm text-white mb-1">Add Judges</label>
                                    <div className="relative mb-4">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Search judges..."
                                        />
                                    </div>

                                    {/* Render judges array dynamically */}
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="flex items-center space-x-4 mb-4">
                                            <input
                                                type="text"
                                                {...register(`judges[${index}].name`, { required: 'Judge name is required' })}
                                                placeholder={`Judge ${index + 1} Name`}
                                                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    {/* Button to add more judges */}
                                    <button
                                        type="button"
                                        onClick={() => append({ name: '' })}
                                        className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
                                    >
                                        Add Judge
                                    </button>
                                </div>
                                {/* Logo Upload Section */}
                                <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                                    <Upload className="w-8 h-8 text-white mb-2" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                        id="logo-upload"
                                        
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md border border-gray-300 hover:border-purple-500 transition-colors"
                                    >
                                        Upload Event Logo
                                    </label>
                                    {logoPreview && (
                                        <div className="mt-4">
                                            <img src={logoPreview} alt="Logo preview" className="w-32 h-32 object-contain" />
                                        </div>
                                    )}
                                </div>

                                {/* Event Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            <Globe className="inline-block w-4 h-4 mr-2" />
                                            Event Type
                                        </label>
                                        <select
                                            {...register("eventType", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select event type</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>



                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            <Lock className="inline-block w-4 h-4 mr-2" />
                                            Event Visibility
                                        </label>
                                        <select
                                            {...register("visibility", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="public">Public</option>
                                            <option value="invite">Invite Only</option>
                                        </select>
                                    </div>
                                </div>

                                {eventType === "online" ? <></> :
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            <Globe className="inline-block w-4 h-4 mr-2" />
                                            Location
                                        </label>
                                        <input {...register("location", { required: true })} className='w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent' type="text" />
                                    </div>
                                }


                                {/* Categories */}
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        <Layers className="inline-block w-4 h-4 mr-2" />
                                        Event Categories
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['Hackathon', 'Workshop', 'Webinar'].map((category) => (
                                            <label key={category} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    {...register("categories")}
                                                    value={category}
                                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-white">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Prize Pool Section */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-white mb-2">
                                        <Gift className="inline-block w-4 h-4 mr-2" />
                                        Prize Pool
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-white mb-1">Total Prize Pool Amount</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2 text-white">$</span>
                                                <input
                                                    type="number"
                                                    {...register("totalPrizePool", { min: 0 })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="Enter total prize amount"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white mb-1">Currency</label>
                                            <select
                                                {...register("prizeCurrency")}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                defaultValue="USD"
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="INR">INR (₹)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Prize Distribution */}
                                    <div className="space-y-4 bg-black p-4 rounded-lg">
                                        <h3 className="font-medium text-white">Prize Distribution</h3>
                                        <div className="grid gap-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-whitemb-1">1st Prize</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                                        <input
                                                            type="number"
                                                            {...register("firstPrize", { min: 0 })}
                                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                            placeholder="Amount for 1st place"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white mb-1">2nd Prize</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2 text-white">$</span>
                                                        <input
                                                            type="number"
                                                            {...register("secondPrize", { min: 0 })}
                                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                            placeholder="Amount for 2nd place"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-white mb-1">3rd Prize</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2 text-white">$</span>
                                                        <input
                                                            type="number"
                                                            {...register("thirdPrize", { min: 0 })}
                                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                            placeholder="Amount for 3rd place"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white mb-1">Additional Prizes</label>
                                                    <textarea
                                                        {...register("additionalPrizes")}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                        placeholder="Describe any additional prizes, special mentions, or rewards..."
                                                        rows={1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Participation Type */}
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        <Users className="inline-block w-4 h-4 mr-2" />
                                        Participation Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                                            <input
                                                type="radio"
                                                {...register("participationType")}
                                                value="individual"
                                                className="text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="ml-2">Individual</span>
                                        </label>
                                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                                            <input
                                                type="radio"
                                                {...register("participationType")}
                                                value="team"
                                                className="text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="ml-2">Team</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Team Size (Only shown if team participation is selected) */}
                                {participationType === 'team' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                <Users className="inline-block w-4 h-4 mr-2" />
                                                Minimum Team Size
                                            </label>
                                            <input
                                                type="number"
                                                {...register("minTeamSize", { required: true, min: 1 })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                defaultValue={1}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                <Users className="inline-block w-4 h-4 mr-2" />
                                                Maximum Team Size
                                            </label>
                                            <input
                                                type="number"
                                                {...register("maxTeamSize", { required: true, min: 1 })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                defaultValue={4}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Opportunity Details
                                    </label>
                                    <textarea
                                        {...register("opportunityDetails", { required: true })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        rows={4}
                                        placeholder="Describe your opportunity including rules, eligibility, process, format..."
                                    />
                                    {errors.opportunityDetails && (
                                        <p className="text-red-500 text-sm mt-1">This field is required</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            <CalendarRange className="inline-block w-4 h-4 mr-2" />
                                            Registration Start Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            {...register("registrationStartDate", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            <CalendarRange className="inline-block w-4 h-4 mr-2" />
                                            Registration End Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            {...register("registrationEndDate", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            defaultValue={format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        <Trophy className="inline-block w-4 h-4 mr-2" />
                                        Maximum Registrations
                                    </label>
                                    <input
                                        type="number"
                                        {...register("maxRegistrations")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Leave empty for unlimited registrations"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        <Info className="inline-block w-4 h-4 mr-2" />
                                        Guidelines
                                    </label>
                                    <textarea
                                        {...register("guidelines", { required: true })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        rows={4}
                                        placeholder="Enter eligibility criteria, format details, and other guidelines..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Rules
                                    </label>
                                    <textarea
                                        {...register("rules", { required: true })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        rows={4}
                                        placeholder="Enter competition rules..."
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex justify-end"
                            >
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Create Event
                                </button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default OrganiserForm;