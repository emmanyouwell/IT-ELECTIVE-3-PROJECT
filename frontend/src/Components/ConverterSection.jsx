import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FlipCards from './FlipCards';
import Headers from './Headers';
import step1 from '../assets/image/step1.png';
import step2 from '../assets/image/step2.png';
import step3 from '../assets/image/step3.png';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
const ConverterSection = () => {
  const [fileContent, setFileContent] = useState('');
  const [formattedJSON, setFormattedJSON] = useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('A file is required'),
    }),
    onSubmit: (values) => {
      const file = values.file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        const formatted = formatToJSON(content);
        setFormattedJSON(formatted);
      };
      reader.readAsText(file);
    },
  });

  const handleSectionClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    formik.setFieldValue('file', e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (formik.errors.file && formik.touched.file) {
      toast.error(formik.errors.file);
    }
  }, [formik.errors.file, formik.touched.file]);

  const formatToJSON = (content) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const json = [];
    let currentQuestion = null;
    let currentOptions = { A: '', B: '', C: '', D: '', ans: '' };

    lines.forEach(line => {
      line = line.replace(/\t/g, ' ').trim(); // Replace tabs with spaces and trim the line
      if (!line.startsWith('Answer:') && !line.match(/^[A-D]\.\s/)) {
        if (currentQuestion) {
          json.push({
            q: currentQuestion,
            a: `a. ${currentOptions.A}`,
            b: `b. ${currentOptions.B}`,
            c: `c. ${currentOptions.C}`,
            d: `d. ${currentOptions.D}`,
            ans: currentOptions.ans.toLowerCase()
          });
        }
        currentQuestion = line.trim();
        currentOptions = { A: '', B: '', C: '', D: '', ans: '' };
      } else if (line.startsWith('A.')) {
        currentOptions.A = line.substring(2).trim();
      } else if (line.startsWith('B.')) {
        currentOptions.B = line.substring(2).trim();
      } else if (line.startsWith('C.')) {
        currentOptions.C = line.substring(2).trim();
      } else if (line.startsWith('D.')) {
        currentOptions.D = line.substring(2).trim();
      } else if (line.startsWith('Answer:')) {
        const answerLetter = line.replace('Answer:', '').trim();
        currentOptions.ans = `${answerLetter.toLowerCase()}. ${currentOptions[answerLetter]}`;
      }
    });

    if (currentQuestion) {
      json.push({
        q: currentQuestion,
        a: `a. ${currentOptions.A}`,
        b: `b. ${currentOptions.B}`,
        c: `c. ${currentOptions.C}`,
        d: `d. ${currentOptions.D}`,
        ans: currentOptions.ans.toLowerCase()
      });
    }

    return json;
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formattedJSON, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "formatted.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <Headers />
      <div className="bg-gray-100 p-6">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-white">Upload your .txt to format it as JSON</h1>
          <form onSubmit={formik.handleSubmit}>
            <section
              onClick={handleSectionClick}
              className="flex items-center justify-center px-4 py-2 border-4 border-white-100 hover:border-white-500 hover:cursor-pointer transition-all duration-200 border-dashed text-white w-full h-20 hover:h-24 my-5"
            >
              <input
                type="file"
                accept=".txt"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={formik.values.file !== null}
              />
              {formik.values.file ? (
                <button
                  type="submit"
                  className="font-bold py-2 px-4 rounded-lg border-2 border-white-900 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200 w-32"
                >
                  {formik.values.file.name}
                </button>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Text File
                </>
              )}
            </section>
            {formik.errors.file && formik.touched.file && (
              <div className="text-red-500 text-sm">{formik.errors.file}</div>
            )}
          </form>
          <div className="grid grid-cols-1 gap-4">
            {formattedJSON.length > 0 && (
              <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl font-semibold mb-5 text-white font-concert text-center">Flashcards</h2>
                <FlipCards questions={formattedJSON} />
                <button id="download-btn" className="bg-green-500 text-white p-2 mt-2 rounded text-center flex items-center" onClick={downloadJSON}> <ArrowDownTrayIcon className="w-5 h-5 mr-2" />Download JSON</button>
              </div>
            )}
          </div>
        </div>
        <hr className="my-20 border-blue-gray-100 border-2" />
        <ol className="list-none my-10 grid grid-cols-2 gap-4">
          <li>
            <h2 className="text-xl font-semibold mb-2 text-center">Step 1: Upload your .txt file</h2>
            <div className="p-3 ">
              <img src={step1} alt="step1" className="w-full border-gray-500 border-2 rounded-lg p-3" />
            </div>
          </li>
          <li>
            <h2 className="text-xl font-semibold mb-2 text-center">Step 2: Submit your .txt file</h2>
            <div className="p-3 ">
              <img src={step2} alt="step1" className="w-full border-gray-500 border-2 rounded-lg p-3" />
            </div>
          </li>
          <li className="col-span-2">
            <h2 className="text-xl font-semibold mb-2 text-center">Step 3: Download your JSON file</h2>
            <div className="p-3 flex justify-center items-center">
              <img src={step3} alt="step1" className="w-[50%] border-gray-500 border-2 rounded-lg p-3" />
            </div>
          </li>
        </ol>

      </div>
    </>
  );
};

export default ConverterSection;