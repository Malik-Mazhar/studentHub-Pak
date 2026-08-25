"use client"
import axios from "axios";
import { Headphones} from "lucide-react";
import { MdEmail, MdHeadsetMic, MdPhone, MdLocationOn, MdAccessTime, } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, } from "react-icons/fa6";
import { useState } from "react";

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.append("access_key", "c35ad528-cbd3-4045-97b8-57b8074c67bf");

        try {
            const response = await axios.post(
            "https://api.web3forms.com/submit",
            Object.fromEntries(formData),
            {
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
            }
            );

            if (response.data.success) {
            alert("Message sent successfully!");
            form.reset();
            } else {
            alert(response.data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send message.");
        }
    };

    const faqs = [
    {
        question: "How can I contact StudentHub support?",
        answer:
        "You can contact our support team by filling out the contact form on this page. Our team will review your message and get back to you as soon as possible.",
    },
    {
        question: "How long does it take to receive a response?",
        answer:
        "We usually respond to support requests within 24 hours during our support hours. Some requests may take longer depending on the issue.",
    },
    {
        question: "How can I report a technical issue?",
        answer:
        "You can report a technical issue through the contact form. Please include a clear description of the problem and, if possible, screenshots or other relevant details.",
    },
    {
        question: "How can I report inappropriate content?",
        answer:
        "If you find inappropriate or harmful content, please contact our support team and provide the post or content details. Our team will review the report and take appropriate action.",
    },
    {
        question: "How can I suggest a new feature?",
        answer:
        "We welcome your suggestions! Send your feature idea through the contact form and explain how it could improve the StudentHub experience.",
    },
    {
        question: "What information should I include when contacting support?",
        answer:
        "Please include your name, email address, a clear subject, and a detailed description of your issue. Screenshots or other relevant information can also help us resolve your problem faster.",
    },
    ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-gray-900 dark:text-gray-100">

      {/* Heading */}
      <div className="mb-6 sm:mb-8 sm:mt-10 mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-[#FBFCFE]">
          Contact Us
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-[30%_40%_25%] gap-5 lg:gap-6">

        {/* Left Side */}
            <div className="lg:col-span-2 min-w-0">

                {/* Hero Card */}
                <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">

                    <div className="grid md:grid-cols-2 items-center">

                    {/* Left */}
                    <div className="px-5 sm:px-8 lg:px-10 py-8 md:py-10">

                        <h2 className="text-2xl sm:text-3xl font-bold text-[#017D63] mb-4 sm:mb-5">
                        We're Here to Help!
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 leading-7 sm:leading-8">
                        Have a question, suggestion, or need support?
                        Fill out the form and our team will get back
                        to you as soon as possible.
                        </p>
                    </div>

                    {/* Right Illustration */}
                    <div className="hidden md:flex items-center justify-center p-8 lg:p-10 bg-linear-to-br from-blue-50 via-white to-green-50   dark:from-[#172554]  dark:via-[#111827] dark:to-[#052e16]">

                        <div className="relative">

                        {/* Envelope */}

                        <div className="w-56 h-40 bg-blue-600 rounded-xl relative shadow-xl">

                            {/* Letter */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-40 h-28 rounded-lg bg-white shadow-md border">

                            <div className="p-4 space-y-2">
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                            </div>

                            </div>

                            {/* Flap */}
                            <div
                            className="absolute inset-0"
                            style={{
                                clipPath:
                                "polygon(0 0,100% 0,50% 55%)",
                                background: "#3B82F6",
                            }}
                            />
                        </div>

                        {/* Decorative Circles */}

                        <div className="absolute -left-6 top-5 w-5 h-5 rounded-full bg-green-300"></div>

                        <div className="absolute -right-4 bottom-6 w-4 h-4 rounded-full bg-blue-300"></div>

                        <div className="absolute right-10 -top-4 w-8 h-8 rounded-full bg-green-100"></div>

                        </div>

                    </div>

                    </div>

                </div>

            
                  {/* Contact Form */}
                <div className="mt-5 sm:mt-6 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm  p-5 sm:p-6 lg:p-8">

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FBFCFE] mb-6 sm:mb-8">
                        Send Us a Message
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-6">

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>

                            <div className="relative">
                                <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="
                                    w-full h-11 sm:h-12
                                    rounded-xl
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-[#0F172A]
                                    text-gray-900 dark:text-gray-100
                                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                                    pl-11 pr-4
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#017D63]
                                    focus:border-[#017D63]
                                    transition
                                    "
                                />

                                <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                >
                                <path d="M20 21a8 8 0 1 0-16 0" />
                                <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className="
                                    w-full h-11 sm:h-12
                                    rounded-xl
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-[#0F172A]
                                    text-gray-900 dark:text-gray-100
                                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                                    pl-11 pr-4
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#017D63]
                                    focus:border-[#017D63]
                                    transition
                                "
                               />

                                <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-10 7L2 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject
                            </label>

                            <select name="subject"   className="w-full h-11 sm:h-12 rounded-xl border border-gray-300 dark:border-gray-600  bg-white dark:bg-[#0F172A]  text-gray-900 dark:text-gray-100 px-4 outline-none focus:ring-2  focus:ring-green-500  focus:border-green-500 transition ">
                                <option>Select a subject</option>
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Bug Repor">Bug Report</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Course Issue">Course Issue</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message
                            </label>

                            <textarea
                                rows={4}
                                name="message"
                                placeholder="Type your message here..."
                                className="
                                    w-full
                                    rounded-xl
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-[#0F172A]
                                    text-gray-900 dark:text-gray-100
                                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                                    p-4
                                    outline-none
                                    resize-none
                                    focus:ring-2
                                    focus:ring-green-500
                                    focus:border-green-500
                                    transition
                                "
                             />
                        </div>

                        {/* Upload Box */}
                        {/* <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-green-500 transition">

                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">

                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>

                            </div>

                            <p className="font-medium text-gray-700">
                                Attach File <span className="text-gray-400">(Optional)</span>
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Upload screenshot or document (Max 5MB)
                            </p>

                            <input type="file" className="hidden" />
                        </label> */}

                        {/* Button */}
                        <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-linear-to-r from-[#017D63] to-[#0aa382] text-white font-semibold transition cursor-pointer"
                        >
                        Send Message
                        </button>

                    </form>

                </div>

                
                <div className="mt-5 sm:mt-6 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 sm:p-6 lg:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-2">

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FBFCFE]">
                            Frequently Asked Questions
                        </h2>

                        <button className="self-start sm:self-auto text-sm sm:text-base text-blue-600 dark:text-blue-400font-medium hover:text-blue-700 dark:hover:text-blue-300 transit ">
                            View All
                        </button>

                    </div>

                    <div className="space-y-3 sm:space-y-4">

                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                key={faq.question}
                                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                                >
                                {/* Question */}
                                <button
                                    type="button"
                                    onClick={() =>
                                    setOpenFaq(isOpen ? null : index)
                                    }
                                    className="w-full flex items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-5 text-left hover:bg-gray-50 dark:hover:bg-[#17223c] transition"
                                >
                                    <span className="min-w-0 flex-1 text-sm sm:text-base font-medium  text-gray-800 dark:text-gray-200 leading-5 sm:leading-6 break- ">
                                    {faq.question}
                                    </span>

                                    <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-xl sm:text-2xl  text-gray-500 dark:text-gray-400">
                                    {isOpen ? "−" : "+"}
                                    </span>
                                </button>

                                {/* Answer */}
                                {isOpen && (
                                    <div className="px-3 sm:px-5 pb-4 sm:pb-5">
                                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-6">
                                        {faq.answer}
                                    </p>
                                    </div>
                                )}
                                </div>
                            );
                            })}

                    </div>

                </div>

                
                <div className="mt-6">

                <h2 className="text-2xl font-bold mb-4">
                    Our Location
                </h2>

                <div className="rounded-2xl overflow-hidden border">

                <iframe
                title="map"
                className="w-full h-37.5 sm:h-55 md:h-75 rounded-xl"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps?q=Ghugi+Bus+Stop,+Bhara+Kahu,+Islamabad&output=embed"
                />

                </div>

                </div>

            </div>

        {/* Right Side */}
        <div className="min-w-0">

            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 sm:p-6">
                
                <h3 className="text-xl font-bold mb-4">
                    We're Here for You
                </h3>

                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-6">

                <Headphones className="w-8 h-8" />

                </div>

                <p className="text-gray-500 dark:text-gray-400 leading-7 mb-8">
                    Our support team is available to assist you.
                </p>

                <div className="space-y-6">

                <div>
                    <h3 className="text-md font-bold text-gray-800">
                        Response Time
                    </h3>

                    <p className="font-bold text-[#00a481] mt-1">
                        Within 24 Hours
                    </p>
                </div>

                <div>
                    <p className="text-md font-bold text-gray-800">
                        Support Hours
                    </p>

                    <p className="font-bold text-[#00a481] mt-1">
                    Mon – Fri: 9AM – 6PM
                    </p>
                </div>

                </div>

            </div>
            
            <div className="mt-9 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none p-6">

                <h3 className="text-xl font-bold text-gray-900 dark:text-[#FBFCFE] mb-4">
                    Contact Information
                </h3>

                <div className="space-y-6">

                    <div className="flex gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <MdEmail className="w-5 h-5 text-[#017D63] dark:text-green-400" />
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-200">Email</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs break-all">
                                jamillmazhar555@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <MdPhone className="w-5 h-5 text-[#017D63] dark:text-green-400" />
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-200">Phone</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs break-all">
                            +92 312 44544478
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <MdLocationOn className="w-5 h-5 text-[#017D63] dark:text-green-400" />
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200">Address</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs break-all">
                            Islamabad, Pakistan
                        </p>
                    </div>
                    </div>

                    <div className="flex gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <MdAccessTime className="w-5 h-5 text-[#017D63] dark:text-green-400" />
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200">Office Hours</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs break-all">
                        Mon - Fri <br />
                        9AM - 6PM
                        </p>
                    </div>
                    </div>

                </div>

            </div>

            
            {/* Social */}
            <div className="mt-6 sm:mt-9 bg-white dark:bg-[#111827] rounded-2xl  border border-gray-200 dark:border-gray-700 shadow-sm p-5 sm:p-6">

                <h3 className="text-xl font-bold mb-4 dark:text-[#FBFCFE]">
                    Connect With Us
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Follow us on social media.
                </p>

                <div className="space-y-4">

                    <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center w-9 h-9 rounded-lg text-white bg-blue-600">
                            <FaFacebookF size={25} />
                        </div>
                        <div>
                            <p className="font-medium">Facebook</p>
                            <p className="text-sm text-gray-500">
                                /studenthubpk
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center w-9 h-9 rounded-lg text-white bg-pink-600">
                            <FaInstagram size={25} />
                        </div>

                        <div>
                            <p className="font-medium">Instagram</p>
                            <p className="text-sm text-gray-500">
                                @studenthubpk
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center w-9 h-9 rounded-lg text-white bg-sky-500">
                            <FaXTwitter size={25} />
                        </div>

                        <div>
                            <p className="font-medium">Twitter</p>
                            <p className="text-sm text-gray-500">
                                @studenthubpk
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center w-9 h-9 rounded-lg text-white bg-red-600">
                            <FaYoutube size={25} />
                        </div>
                        
                        <div>
                            <p className="font-medium">YouTube</p>
                            <p className="text-sm text-gray-500">
                                StudentHub Pakistan
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

      </div>


        <div className="mt-6 sm:mt-8 rounded-2xl  bg-linear-to-r from-green-900 to-cyan-900  px-5 sm:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

        <div>

        <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-white font-bold">
            Never Stop Learning
        </h2>

        <p className="text-sm sm:text-base text-green-100 dark:text-green-100 mt-1">
            Explore thousands of free courses and build your future.
        </p>

        </div>

        <button className="w-full md:w-auto mt-4 md:mt-0 bg-white text-green-700 font-semibold px-6 sm:px-8 py-3 cursor-pointer rounded-xl hover:bg-gray-100 transition">
            Explore All Courses →
        </button>

        </div>

    </div>
  );
}