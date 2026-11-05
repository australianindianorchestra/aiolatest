"use client";

export default function ContactInfo() {
    return(
        <section className="bg-[#F7F3F0] py-0 md:py-16 px-6 overflow-hidden">
            <div className="max-w-8xl mx-auto lg:px-12">

                {/* contact links */}
                <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-8xl mx-auto py-4 px-0 md:px-6">

                    {/* Email */}
                    <a href="mailto:ausindorchestra@gmail.com" className="group bg-white border-t border-red-700 rounded-[24px] p-10 ">
                        <div className="text-[#D10F2F] text-xs uppercase tracking-[0.3em] mb-2 2xl:text-lg">
                        Email
                        </div>

                        <h4 className="font-semibold text-black mb-1 2xl:text-2xl">
                        ausindorchestra@gmail.com
                        </h4>

                        <p className="text-sm text-neutral-500 2xl:text-2xl">
                        Send an enquiry
                        </p>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/61434204870"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white border-t border-red-700 rounded-[24px] p-10 "
                    >
                        <div className="text-[#D10F2F] text-xs uppercase tracking-[0.3em] mb-2 2xl:text-lg">
                        WhatsApp
                        </div>

                        <h4 className="font-semibold text-black mb-1 2xl:text-2xl">
                        Chat With Us
                        </h4>

                        <div className="text-sm text-neutral-500 2xl:text-2xl">
                            {/* WhatsApp */}
                            <div className="w-fit h-auto rounded-md bg-green-500 hover:bg-green-700 flex items-center justify-start transition-all duration-300 border border-white/10 p-2 gap-2">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-5 h-5"
                                >
                                <path d="M20.52 3.48A11.83 11.83 0 0012.04 0C5.43 0 .06 5.37.06 11.98c0 2.11.55 4.18 1.59 6.01L0 24l6.17-1.62a11.92 11.92 0 005.87 1.5h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.2-3.51-8.42zM12.05 21.9a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.66.96.98-3.57-.24-.37A9.88 9.88 0 012.1 11.98c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.16 1.04 7.04 2.91a9.9 9.9 0 012.91 7.03c0 5.49-4.46 9.95-9.95 9.95zm5.46-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.08-.12-.28-.2-.58-.35z" />
                                </svg>
                                <span className="text-sm text-white"> Message us on WhatsApp</span>
                            </div>
                        </div>
                        </a>

                    {/* Social */}
                    <div className="bg-white border-t border-red-700 rounded-[24px] p-10 text-white">
                        <div className="text-[#D10F2F] text-xs uppercase tracking-[0.3em] mb-3 2xl:text-lg">
                        Follow Us
                        </div>

                        <div className="flex gap-3">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/ausindorchestra/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 2xl:w-16 2xl:h-16 rounded-full bg-pink-700 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-5 h-5 2xl:w-10 2xl:h-10"
                            >
                            <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1a1.25 1.25 0 100 2.5A1.25 1.25 0 0016.5 5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/101399399609487"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 2xl:w-16 2xl:h-16 rounded-full bg-blue-500 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-5 h-5 2xl:w-10 2xl:h-10"
                            >
                            <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.4v8h3.1z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@ausindorchestra/videos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 2xl:w-16 2xl:h-16 rounded-full bg-red-500 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-5 h-5 2xl:w-10 2xl:h-10"
                            >
                            <path d="M21.8 8.001a2.75 2.75 0 00-1.936-1.946C18.153 5.5 12 5.5 12 5.5s-6.153 0-7.864.555A2.75 2.75 0 002.2 8.001 28.98 28.98 0 001.75 12c0 1.34.153 2.676.45 3.999a2.75 2.75 0 001.936 1.946C5.847 18.5 12 18.5 12 18.5s6.153 0 7.864-.555a2.75 2.75 0 001.936-1.946c.297-1.323.45-2.659.45-3.999 0-1.34-.153-2.676-.45-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                            </svg>
                        </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}