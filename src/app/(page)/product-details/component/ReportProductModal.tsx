import React, {useEffect, useRef, useState} from "react";
import {Backdrop, Divider, MenuItem, Select} from "@mui/material";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const mpHttp = new MPHttpUtilNoSecure();
    const [reasonsList, setReasonsList] = useState<string[]>([]);
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    // Handle description change
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Only image files are allowed.");
            return;
        }
        if (file.size > 25 * 1024 * 1024) {
            alert("File size must be less than 25MB.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result as string);
            // You can also send it to an API here
        };
        reader.readAsDataURL(file);
    };

    const fetchData = async () => {
        mpHttp.get("v1/Product/ProductReportReason/GetAllProductReportReasons", {}, {}, (result: any, error: any) => {
            if (error) {
                console.error("Error fetching users:", error);
                // Handle the error, e.g., display an error message to the user
            } else {
                setReasonsList(result?.items);
                console.log("Users fetched successfully:", result);
            }
        });
    };


    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={isOpen}>
            <div className="md:w-[500px] w-full px-4 md:px-0">
                <div className="w-full bg-white rounded-[20px] p-6 md:p-[20px] flex flex-col gap-7 relative overflow-hidden">
                    {/* Header */}
                    <h2 className="text-[20px] text-center font-bold">Report Product</h2>
                    <Divider />
                    {/* Form */}
                    <form className="space-y-4 overflow-y-auto">
                        {/* Select Reason */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-[12.57px] md:text-[16px] font-normal text-[#121212] pb-1"
                            >
                                Select your reason
                            </label>
                            <Select
                                fullWidth
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                displayEmpty
                                MenuProps={{
                                    disablePortal: true,
                                    PaperProps: {
                                        sx: {
                                            zIndex: 13000,
                                        },
                                    },
                                }}
                                sx={{
                                    height: "40px",
                                    width: "100%",
                                    borderRadius: "12px", // less rounded
                                    border: "1px solid #828294",
                                    padding: '10px 12px',
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    backgroundColor: "white",

                                    // override outline border radius & border
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "12px",
                                        border: "none",
                                    },

                                    // override root input border radius if needed
                                    "&.MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },

                                    // select box styles
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        height: "40px",
                                    },

                                    "&:focus-visible": {
                                        outline: "none",
                                    },
                                }}
                            >
                                <MenuItem value="">Select option</MenuItem>
                                {reasonsList.map((name:any) => (
                                    <MenuItem key={name.id} value={name.id}>
                                        {name.reportReason}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-[12.57px] md:text-[16px] font-normal text-[#121212]"
                            >
                                Tell us more about the reason (Optional)
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                rows={4}
                                className="mt-1 block w-full resize-none border border-[#828294] rounded-[12px] p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label
                                htmlFor="file"
                                className="block text-[12.57px] md:text-[16px] font-normal text-[#121212]"
                            >
                                Upload a photo reference (Optional)
                            </label>
                            <p className="text-[10.21px] md:text-[13px] text-[#828294] pb-2">
                                Photo reference gives us a better clarity on what the problem is.
                            </p>
                            <div
                                onClick={handleDivClick}
                                className="border focus:outline-none h-[165px] flex flex-col justify-center items-center border-[#828294] w-full rounded-[8px] p-4 text-[14px] font-[400]"
                            >
                                {base64Image ? (
                                    <img src={base64Image} alt="Preview" className="max-h-[120px] object-contain" />
                                ) : (
                                    <>
                                        {" "}
                                        <svg
                                            width="57"
                                            height="57"
                                            viewBox="0 0 57 57"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M28.5008 37.2502C28.965 37.2502 29.4101 37.0658 29.7383 36.7376C30.0665 36.4094 30.2508 35.9643 30.2508 35.5002V9.89649L34.1708 14.4722C34.4728 14.8249 34.9026 15.0432 35.3656 15.0791C35.8285 15.115 36.2868 14.9655 36.6395 14.6635C36.9923 14.3615 37.2106 13.9318 37.2465 13.4688C37.2823 13.0058 37.1328 12.5476 36.8308 12.1948L29.8308 4.02816C29.6666 3.83605 29.4626 3.68181 29.233 3.57605C29.0034 3.47029 28.7536 3.41553 28.5008 3.41553C28.2481 3.41553 27.9983 3.47029 27.7687 3.57605C27.5391 3.68181 27.3351 3.83605 27.1708 4.02816L20.1708 12.1948C20.0213 12.3695 19.9076 12.5719 19.8363 12.7905C19.765 13.0091 19.7375 13.2396 19.7552 13.4688C19.773 13.698 19.8357 13.9215 19.9399 14.1265C20.044 14.3315 20.1875 14.514 20.3622 14.6635C20.5368 14.813 20.7392 14.9267 20.9578 14.998C21.1764 15.0693 21.4069 15.0969 21.6361 15.0791C21.8654 15.0613 22.0889 14.9986 22.2939 14.8945C22.4988 14.7903 22.6813 14.6468 22.8308 14.4722L26.7508 9.89883V35.5002C26.7508 36.4662 27.5348 37.2502 28.5008 37.2502Z"
                                                fill="#FF9D98"
                                            />
                                            <path
                                                d="M37.8327 21.5C36.1947 21.5 35.3757 21.5 34.7853 21.8943C34.5315 22.0642 34.3135 22.2822 34.1437 22.536C33.7493 23.1263 33.7493 23.9453 33.7493 25.5833V35.5C33.7493 36.8924 33.1962 38.2277 32.2117 39.2123C31.2271 40.1969 29.8917 40.75 28.4993 40.75C27.107 40.75 25.7716 40.1969 24.787 39.2123C23.8025 38.2277 23.2493 36.8924 23.2493 35.5V25.5833C23.2493 23.9453 23.2493 23.1263 22.855 22.536C22.6852 22.2822 22.4672 22.0642 22.2133 21.8943C21.623 21.5 20.804 21.5 19.166 21.5C12.5673 21.5 9.26568 21.5 7.21702 23.551C5.16602 25.5997 5.16602 28.8967 5.16602 35.4977V37.831C5.16602 44.4343 5.16602 47.7313 7.21702 49.7823C9.26568 51.8333 12.5673 51.8333 19.166 51.8333H37.8327C44.4313 51.8333 47.733 51.8333 49.7817 49.7823C51.8303 47.7313 51.8327 44.432 51.8327 37.8333V35.5C51.8327 28.899 51.8327 25.5997 49.7817 23.551C47.733 21.5 44.4313 21.5 37.8327 21.5Z"
                                                fill="#FF9D98"
                                            />
                                        </svg>
                                        <div>
                                            <p className="text-[14px] font-[500] text-center">
                                                Click to upload <span className="text-[#6B6A6A]">or drag and drop</span>
                                            </p>
                                            <p className="text-[#6B6A6A]  text-[14px] font-[500] text-center">
                                                PDF, JPG, or PNG (max. 25 MB)
                                            </p>
                                        </div>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="sticky bottom-[-100px] z-10 bg-white">
                            <button
                                // onClick={handleAdd}
                                className="w-full bg-[#000222] text-white text-[14px] font-[400] h-[40px] rounded-lg"
                            >
                                Report Product
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full border mt-3 border-[#000222] text-[#000222] text-[14px] font-[400] h-[40px] rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Backdrop>


    );
};

export default Modal;