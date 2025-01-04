import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 p-14 md:gap-60 md:p-10">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">EVENEXT</h2>
            <p className="text-sm font-bold leading-relaxed">
              Kami menyediakan layanan terbaik untuk acara dan kegiatan Anda. 
              Bergabunglah bersama kami untuk membuat pengalaman yang luar biasa.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">Navigasi</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <p className="hover:text-teal-400">Beranda</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p className="hover:text-teal-400">Biaya</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p className="hover:text-teal-400">Events</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:text-teal-400">Kontak Kami</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">Ikuti Kami</h2>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Evenext.Corp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
