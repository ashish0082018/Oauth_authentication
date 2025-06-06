"use client";
import React, { useActionState, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Linkedin } from "../../../public/icons/Linkedin";
import { Github } from "../../../public/icons/Github";
import { Twitter } from "../../../public/icons/Twitter";
import { Gmail } from "../../../public/icons/Instagram";
import { Delete } from "../../../public/icons/Delete";
import { createProfile } from "@/app/actions/createprofile";
import Template from "./Template";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import Buttonfor_form from "./Buttonfor_form";



type Profile = { name: string; link: string; icon: React.JSX.Element };

function CreateTemplate1() {
  const router=useRouter();

  const options = [
    { icon: <Linkedin />, name: "LinkedIn" },
    { icon: <Github />, name: "GitHub" },
    { icon: <Twitter />, name: "Twitter" },
    { icon: <Gmail />, name: "Gmail" },
  ];
  const [name, setName] = useState("Your name...");
  const [message, setMessage] = useState("your custom message goes here...");
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
 

  const handleSelectProfile = (profileName: string) => {
    const selectedOption = options.find(
      (option) => option.name === profileName
    );
    if (
      selectedOption &&
      !selectedProfiles.some((profile) => profile.name === profileName)
    ) {
      setSelectedProfiles([
        ...selectedProfiles,
        { name: profileName, link: "", icon: selectedOption.icon },
      ]);
    }
  };

  const handleRemoveProfile = (index: number) => {
    setSelectedProfiles(selectedProfiles.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedProfiles = [...selectedProfiles];
    updatedProfiles[index].link = value;
    setSelectedProfiles(updatedProfiles);
  };

  type formdata = {
    image: File;
    name: string;
    message: string;
    profiles: { name: string; link: string }[];
  };


const [formState,action]=useActionState(createProfile,{error:{}})

if(formState.error.success) {
  // console.log("code pura end tk chala",`/profile/${formState.error.slug}`);
 // router.push(`/profile/${formState.error.slug}`)

   router.push("/");
}



  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const formdatas = new FormData();
    if (!image){
      toast("Please upload image");


      return ;
    }  // Ensure image exists  , use a tost here
    formdatas.append("image", image)

    // Upload image or send the image File to backend
    const images = formdatas.get("image") as File;
   

    const formData: formdata = {
      image: images, // Use the uploaded image URL here
      name,
      message,
      profiles: selectedProfiles
        .filter((profile) => profile.link.trim() !== "")
        .map((profile) => ({
          name: profile.name,
          link: profile.link,
        })),
    };

   
     

     action(formData); // Trigger profile creation action



    

    // Use createProfile action here to save the form data
    // await createProfile(formData);
    // console.log("Form Data:", formData);
  };

  
  const [imagePreview, setImagePreview] = useState<string>("");


  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files ? e.target.files[0] : null;
    
if (uploadedFile) {
      setImage(uploadedFile);
      const previewUrl = URL.createObjectURL(uploadedFile);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-between items-center gap-5 container mx-auto text-black ">
       <ToastContainer />
      <div className="fixed top-10 left-12 w-1/4 h-full">
        <Template
          name={name}
          message={message}
          selectedProfiles={selectedProfiles}
          imagepreview={imagePreview}
        />
      </div>
      <div className="w-1/3 h-full bg-zinc-700 relative "></div>
      <div className="h-full w-2/3 bg-zinc-200 flex items-center justify-center rounded-xl shadow-xl">
        <div className="w-full md:w-5/6">
          <div className="px-12 py-5">
            <div className="text-center">
              <h2 className="text-3xl tracking-tighter font-bold text-zinc-700">
                Create Your Profile
              </h2>
              <h5 className="text-zinc-600 mt-2">
                After the space is created, it will generate a dedicated page
                for your profile.
              </h5>
            </div>

            {/* FORM FILLING */}

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
              <div className="flex gap-5 items-center ">
                {imagePreview ? (
                  <div
  className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${imagePreview})` }}
>
</div>
                ) : (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-600" />
                )}
                <input
                  onChange={uploadHandler}
                  type="file"
                  className="hidden"
                  id="file-upload"
                  name="image"
                />

                <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-3 py-2 tracking-tighter border shadow-lg h-fit bg-white rounded-md transition hover:scale-105 "
                >
                  Upload profile picture.
                </label>
              </div>
              

              <label className="text-sm tracking-tighter font-semibold">
                Name
              </label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="px-2 py-1 border-2 border-gray-300 rounded-md outline-none"
              />
   {formState.error.formerror && typeof formState.error.formerror === "object" && 
    <div className="text-red-500 text-sm">
     
     {"name" in formState.error.formerror && 
      Array.isArray(formState.error.formerror.name) && (
        <p>{formState.error.formerror.name[0]}</p>
    )}
   </div>

     }
              <label className="text-sm tracking-tighter font-semibold">
                Your custom message
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-2 py-1 border-2 border-gray-300 rounded-md outline-none"
              />
   {formState.error.formerror && typeof formState.error.formerror === "object" && 
    <div className="text-red-500 text-sm">
     
     {"message" in formState.error.formerror && 
      Array.isArray(formState.error.formerror.message) && (
        <p>{formState.error.formerror.message[0]}</p>
    )}
   </div>

     }
              <div className="space-y-4 ">
                <Select onValueChange={handleSelectProfile}>
                  <SelectTrigger className="w-[250px] border border-black p-2 rounded-md b shadow-md outline-none">
                    <SelectValue placeholder="Select profile to add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Profiles</SelectLabel>
                      {options.map((elem) => (
                        <SelectItem key={elem.name} value={elem.name}>
                          {elem.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  {selectedProfiles.length < 1 ? (
                    <h2 className="tracking-tight text-sm">Add your profiles links</h2>
                  ) : (
                    selectedProfiles.map((profile, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 border p-3 rounded-md border-zinc-400 shadow-md"
                      >
                        <label className="font-semibold flex items-center gap-2">
                          {profile.icon} {profile.name}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="px-2 py-1 border-2 border-gray-300 rounded-md outline-none w-full"
                            placeholder={`Enter your ${profile.name} link`}
                            value={profile.link}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProfile(index)}
                            className="px-3 py-1 text-white rounded-md hover:bg-zinc-400 transition"
                          >
                            <Delete />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {formState.error.formerror && typeof formState.error.formerror === "object" && 
    <div className="text-red-500 text-sm">
     
     {"profiles" in formState.error.formerror && 
      Array.isArray(formState.error.formerror.profiles) && (
        <p>{formState.error.formerror.profiles.map((elem,key)=>{
          return <p className="flex flex-col"> {elem} </p>
        })}</p>
    )}
   </div>

     }
             <Buttonfor_form/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTemplate1;
