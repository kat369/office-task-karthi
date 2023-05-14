import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function EditArticleForm4({ setdata, data, setpage }) {
  
  const [filefocus, setfilefocus] = useState(false);
  const [available, setavailable] = useState(true);
  const [edit, setedit]= useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };
  const cancelchange = () => {
    setedit(!edit)
    delete data["file"];
  }
  const focuschange = () => {
    
    setfilefocus(true);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if ("reference" in data) {
      if (data["reference"] == "<p><br></p>") {
        setavailable(false);
      } else {
        setavailable(true);
        console.log(data);
      }
    } else {
      setavailable(false);
    }
  };

  return (
    <>
      <div className="head">Edit Article Page(4/4)</div>
      <form onSubmit={handlesubmit}>
        

        <div className="frm-group">
          <label>PDF File :</label>

          <div className="pdfedit">
            {edit?  <div className="frm-group">
          <input
          className="fil"
            type="file"
            name="file"
            required
            onChange={(e) => {
              setdata({ ...data, [e.target.name]: e.target.files[0] });
            }}
            onBlur={() => {
              setfilefocus(true);
            }}
            focused={filefocus.toString()}
          ></input>
          <span>required</span>
        </div> : <div>kat.pdf</div>}

            <div className="pdfeditbtn">
              {edit? null : <div className="pdf">View PDF</div>}
              <div className="pdf" onClick={cancelchange}>{edit? "Cancel Change" : "Change PDF"}</div>
            </div>
          </div>
        </div>

       
        <div className="form-group app">
          <label>Reference :</label>
          <ReactQuill
            className="reactquill"
            onChange={(e) => {
              setdata({ ...data, ["reference"]: e });
            }}
            value={data.reference || ""}
            theme="snow"
            modules={modules}
            required
          />
          <span className={available ? "" : "noquill"}>required</span>
        </div>
        <div className="buttony">
          <button
            className="subx"
            onClick={() => {
              setpage((currentpage) => currentpage - 1);
            }}
          >
            back
          </button>
        </div>
        <button className="finlsub" onClick={focuschange}>
          submit
        </button>
      </form>
    </>
  );
}

export default EditArticleForm4;
