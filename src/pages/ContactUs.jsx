import React from 'react';
import { Input, Button } from "../components/index.js";
import { useForm } from 'react-hook-form';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const ContactUs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // console.log("Contact form submitted:", data);
    reset();
    toast.success("Thanks for reaching out! We'll get back to you soon.", {
      position: "top-center",
      autoClose: 3800,
      theme: "colored"
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 px-4 py-10 gap-8">

      {/* Image Section */}
      <div className="md:w-1/2 w-full flex justify-center mb-10 md:mb-0">
        <img
          src="ContactUsImage.jpg"
          alt="Contact Illustration"
          className="w-full max-w-xs sm:max-w-md h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full bg-white/50 backdrop-blur-sm text-black rounded-2xl shadow-lg p-4 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Contact Us</h1>
        <p className="text-center text-gray-700 text-sm">
          Have a question, suggestion, or just want to say hi? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email"
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="bg-blue-500 hover:bg-sky-600 text-white w-full py-2 rounded-lg shadow">
            Send Message
          </Button>
        </form>

        <div className="text-center pt-6 border-t border-gray-300">
          <p className="text-gray-700 text-sm mb-2">You can also reach us at:</p>
          <p className="text-gray-800 font-semibold">support@quickpoll.com</p>

          <div className="flex justify-center gap-4 mt-4 text-xl text-gray-800">
            <Link to="https://x.com/Raman__Gupta"><FaTwitter /></Link>
            <Link to="https://github.com/cyphering101Raman"><FaGithub /></Link>
            <Link to="https://www.linkedin.com/in/raman--gupta/"><FaLinkedin /></Link>
          </div>
          
          <p className="text-xs text-gray-600 mt-4">Made by Quick Poll Team</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
