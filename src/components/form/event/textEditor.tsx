"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

interface FieldRichTextProps {
  name: string;
  value: string;
  setFieldValue: (field: any, value: any) => void;
}

const RichTextEditor: React.FC<FieldRichTextProps> = ({
  name,
  value,
  setFieldValue,
}) => {
  const [editorValue, setEditorValue] = useState<string>(value);

  const handleChange = (content: string) => {
    setEditorValue(content);
    setFieldValue(name, content);
  };

  useEffect(() => {
    const handleScroll = () => {
      const toolbar = document.querySelector(".ql-toolbar");
      if (toolbar) {
        if (window.scrollY > toolbar.getBoundingClientRect().top) {
          toolbar.classList.add("sticky");
        } else {
          toolbar.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white w-full">
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;
