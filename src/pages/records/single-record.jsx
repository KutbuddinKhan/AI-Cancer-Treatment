import React, { useState } from "react";
import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import { useStateContext } from "../../context/index";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import FileUploadModal from "./components/file-upload-modal";
import RecordDetailsHeader from "./components/record-details-header";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const SingleRecordDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );

  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateRecord } = useStateContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiletype(file.type);
    setFilename(file.name);
    setFile(file);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: filetype,
          },
        },
      ];

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });

      const prompt = `You are a highly experienced expert in cancer diagnosis and personalized treatment planning. Using your extensive medical knowledge, provide a detailed and comprehensive treatment plan tailored to a specific patient’s condition. The treatment plan should be easy to understand, written in clear, concise, and professional language.
        Ensure that the recommendations are well-organized into readable paragraphs, covering every relevant aspect, including surgery, chemotherapy, radiation, immunotherapy, targeted therapy, and supportive care. Break down complex information and medical terminology so that it is accessible, but still accurate. Additionally, address any potential side effects, lifestyle changes, and follow-up care.
        Make sure to provide guidance for the patient’s physical, emotional, and nutritional needs, offering a holistic approach to their recovery.`;

      // Await the generative AI content
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = await response.text(); // Await the response text
      setAnalysisResult(text);

      // Rename the variable to avoid overwriting the function
      const updatedRecordResult = await updateRecord({
        documentID: state.id,
        analysisResult: text,
        kanbanRecords: "",
      });

      if (updatedRecordResult) {
        console.log("Record updated successfully", updatedRecordResult);
      } else {
        console.error("Failed to update the record");
      }

      setUploadSuccess(true);
      setIsModalOpen(false); // Close the modal after a successful upload
      setFilename("");
      setFile(null);
      setFiletype("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
      >
        <IconFileUpload />
        <span>Upload Reports</span>
      </button>

      {/* file Upload modal */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        uploadSuccess={uploadSuccess}
        filename={filename}
      />

      <RecordDetailsHeader recordName={state.recordName} />

      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p1.5 inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    Personalized AI-Driven Treatment Plan
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    A tailored medical strategy leveraging advanced AI insights.
                  </p>
                </div>

                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Analysis Result
                    </h2>
                    <div className="space-y-2">
                      <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                    >
                      View Treatment plan
                      <IconChevronRight size={20} />
                      {processing && (
                        <IconProgress
                          size={10}
                          className="mr-3 h-5 w-5 animate-spin"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex gap-x-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecordDetails;
