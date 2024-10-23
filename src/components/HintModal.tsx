import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HintModalProps {
  setShow: (show: boolean) => void;
}

const HintModal: React.FC<HintModalProps> = ({ setShow }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [copyStatus, setCopyStatus] = useState<string>("");

  useEffect(() => {
    setShow(true);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 10;
    setMousePosition({ x: xPos, y: yPos });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText("4242 4242 4242 4242");
    setCopyStatus("Copied! ✅");
    setTimeout(() => {
      setCopyStatus("");
    }, 2000);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Crafty Project 🎨</h2>
            <p className="text-gray-600 mb-2">
              Unlock your creative potential with a robust set of features
              designed to bring your ideas to life!
            </p>
            <p className="text-gray-600 mb-2">
              ✨ <strong>Intuitive Drag-and-Drop Editor:</strong> Effortlessly
              arrange elements, text, and images with our easy-to-use interface.
            </p>
            <p className="text-gray-600 mb-2">
              🌈 <strong>Beautiful Template Options:</strong> Choose from
              stylish designs to kickstart your projects.
            </p>
            <p className="text-gray-600 mb-2">
              🎨 <strong>Customizable Elements:</strong> Adjust colors, fonts,
              and sizes to match your unique style and vision.
            </p>
            <p className="text-gray-600 mb-2">
              🚀 <strong>Export and Share:</strong> Save your creations in
              multiple formats and share them directly to social media with a
              single click!
            </p>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Sign In? 🔑</h2>
            <p className="text-gray-600 mb-2">
              As a full-stack application, I integrated essential
              functionalities like login and registration.
            </p>
            <p className="text-gray-600 mb-2">
              Users can seamlessly sign in using their Google or GitHub
              accounts, making the process quick and hassle-free.
            </p>
            <p className="text-gray-600 mb-2">
              Or you can sign in by clicking "Sign Up" and register using a
              fake, non-existent email—just ensure it includes{" "}
              <strong>@mail.com</strong>!
            </p>
            <p className="text-gray-600 mb-2">
              This allows users to securely save their work and access their
              projects anytime, ensuring a seamless experience.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Payments? 💳</h2>
            <p className="text-gray-600 mb-2">
              Payment integration was added to showcase my ability to work with
              payment systems and deliver enterprise-ready products.
            </p>
            <p className="text-gray-600 mb-2">
              The payments are currently in test mode. You can use the following
              test card number:
            </p>
            <p className="text-gray-600 mb-4">
              <button
                onClick={handleCopyCardNumber}
                className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300"
              >
                4242 4242 4242 4242
              </button>
              {copyStatus && (
                <span className="ml-2 text-green-600">{copyStatus}</span>
              )}
            </p>
            <p className="text-gray-600 mb-2">
              You can use any expiration date, such as{" "}
              <span className="font-bold">05/55</span>, and any three-digit CVC
              along with any name.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentPage < 3) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg w-11/12 sm:w-96"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        animate={{
          rotate: currentPage === 1 ? 0 : 360, // Spin effect
          scale: [1, 1.05, 1], // Scale up and down
          opacity: [0, 1, 1], // Fade in effect
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Shadow effect
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          opacity: { duration: 0.4 }, // Duration for opacity change
        }}
        whileHover={{
          scale: 1.05, // Slightly scale on hover
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)", // Shadow on hover
        }}
      >
        <div className="mb-6">{renderPageContent()}</div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            } font-semibold`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-500">Page {currentPage} of 3</span>
          <button
            onClick={handleNext}
            disabled={currentPage === 3}
            className={`${
              currentPage === 3
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            } font-semibold`}
          >
            Next
          </button>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
      </motion.div>
    </div>
  );
};

export default HintModal;
