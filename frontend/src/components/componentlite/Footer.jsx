
const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold">
              Job<span className="text-[#6A3Bc2]">Portal</span>
            </h2>
            <p className="text-gray-500 mt-3">
              Find your dream job and connect with top companies across
              the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-[#6A3Bc2] cursor-pointer">
                Home
              </li>
              <li className="hover:text-[#6A3Bc2] cursor-pointer">
                Browse Jobs
              </li>
              <li className="hover:text-[#6A3Bc2] cursor-pointer">
                Companies
              </li>
              <li className="hover:text-[#6A3Bc2] cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Contact
            </h3>

            <p className="text-gray-500">
              support@jobportal.com
            </p>

            <p className="text-gray-500 mt-2">
              Pune, Maharashtra, India
            </p>

            {/* <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#6A3Bc2]" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#6A3Bc2]" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-[#6A3Bc2]" />
              <Github className="w-5 h-5 cursor-pointer hover:text-[#6A3Bc2]" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-[#6A3Bc2]" />
            </div> */}
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;