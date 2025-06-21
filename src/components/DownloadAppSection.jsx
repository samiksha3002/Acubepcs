import Image from "next/image"; // Save your Android logo as 'public/android-logo.png'
import { FaDownload, FaAndroid } from "react-icons/fa";

export default function DownloadAppSection() {
  return (
    <section
      className="bg-cover bg-center py-20 px-6 text-center"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/1.jpg')", // Save your background as 'public/download-bg.jpg'
      }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-10">
        DOWNLOAD APP
      </h2>

      <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-xl p-8 flex items-center justify-center gap-6">
        <FaAndroid className="text-green-500 text-6xl" />
        <span className="text-4xl font-light text-black">android</span>
      </div>

      <div className="mt-10">
        <a
          href="/your-app.apk"
          download
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition-all"
        >
          <FaDownload />
          Download
        </a>
      </div>
    </section>
  );
}
