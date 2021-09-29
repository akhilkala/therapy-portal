import React, { ReactElement } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import uploadImg from "../assets/upload.png";
import Input from "../components/Input";
import useInputState from "../hooks/useInputState";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useToasts } from "react-toast-notifications";
import { post } from "../utils/requests";
import Animation from "../components/Animation";
import useDocumentTitle from "../hooks/useDocumentTitle";

const options = [
  { value: "0", label: "Vision Therapy" },
  { value: "1", label: "Speech Therapy" },
  { value: "2", label: "Occupational Therapy" },
  { value: "3", label: "Play & Art Therapy" },
  { value: "4", label: "Counselling" },
  { value: "5", label: "Clinical Psycology" },
  { value: "6", label: "Special Education" },
  { value: "7", label: "Vocational Training" },
];

export default function Teacher(): ReactElement {
  useDocumentTitle("Manonaya | Therapist Panel");
  const auth = useAuth();
  return (
    <div className="teacher">
      <div className="top">
        <h1>Greetings, {auth?.user?.username}</h1>
        <button onClick={auth?.logout} className="btn">
          Logout <i className="fas fa-sign-in-alt"></i>
        </button>
      </div>
      <nav>
        <NavLink exact to="/" activeClassName="active-link">
          Patient Data
        </NavLink>
        <NavLink to="/upload-report" activeClassName="active-link">
          Upload Report
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={PatientData} />
          <Route path="/upload-report" component={UploadReport} />
        </Switch>
      </main>
    </div>
  );
}

function UploadReport(): ReactElement {
  const username = useInputState();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = React.useState("No Report Chosen");
  const { addToast } = useToasts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    const file = fileRef.current.files[0];

    if (!username.value || !file)
      return addToast("All fields are required", { appearance: "error" });
    if (file.type !== "application/pdf")
      return addToast("File type not supported", { appearance: "error" });

    const data = new FormData();
    data.append("file", file);

    await post("/upload-report", data, {}, true);
  };

  const setFileName = (e: any) => {
    setPlaceholder(e.target.files[0].name);
  };

  return (
    <div className="upload-report">
      <form onSubmit={handleSubmit} className="left">
        <h1>Upload a Patient Report</h1>
        <Input state={username} placeholder="Patient Username" />
        <Dropdown
          options={options}
          value={options[0]}
          placeholder="Select an option"
          className="dropdown"
        />
        <div className="file">
          <input
            style={{ display: "none" }}
            type="file"
            name="report"
            id="report"
            ref={fileRef}
            onChange={setFileName}
          />
          <div className="name">{placeholder}</div>
          <label htmlFor="report" className="btn">
            Upload
          </label>
        </div>
        <button className="btn">Submit</button>
      </form>
      <div className="right">
        <img src={uploadImg} alt="Upload" />
      </div>
    </div>
  );
}

function PatientData(): ReactElement {
  const search = useInputState();
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();
  const [data, setData] = React.useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
    } catch (err) {
      addToast("Something went wrong", { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patinet-data">
      <div className="top">
        <Input
          state={search}
          placeholder="Search for username"
          icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
        />
        <Dropdown
          options={[...options, { value: "8", label: "No Filter" }]}
          value={{ value: "8", label: "No Filter" }}
          placeholder="Select an option"
          className="dropdown"
        />
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
      {loading && <Animation animation="loading2" />}
    </div>
  );
}
