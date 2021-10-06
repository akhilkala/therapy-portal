import React, { ReactElement } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Animation from "../components/Animation";
import Input from "../components/Input";
import useFetch from "../hooks/useFetch";
import useInputState from "../hooks/useInputState";
import ReactTooltip from "react-tooltip";
import cn from "classnames";
import { deleteCall, get, post } from "../utils/requests";
import { useConfirm } from "../hooks/useConfirm";
import Confrim from "../components/Confirm";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from "../context/AuthContext";
import { User } from "../utils/types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const dropdownOptions = [
  { value: "0", label: "Vision Therapy" },
  { value: "1", label: "Speech Therapy" },
  { value: "2", label: "Occupational Therapy" },
  { value: "3", label: "Play & Art Therapy" },
  { value: "4", label: "Counselling" },
  { value: "5", label: "Clinical Psycology" },
  { value: "6", label: "Special Education" },
  { value: "7", label: "Vocational Training" },
];

export default function Admin(): ReactElement {
  useDocumentTitle("Manonaya | Admin");
  const adminFetcher = useFetch("/admin/data");
  const { addToast } = useToasts();
  const auth = useAuth();

  if (adminFetcher.isLoading) {
    return (
      <div className="screen-center">
        <Animation animation="loading" />
      </div>
    );
  }

  const createUser = async (
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    isTeacher: boolean,
    age: string,
    gender: string,
    therapies: any
  ) => {
    if (password !== confirmPassword)
      return addToast("Passwords do not match", { appearance: "error" });
    try {
      await post("/auth/register", {
        fullName,
        username,
        password,
        isTeacher,
        age,
        gender,
        therapies,
      });
    } catch (err: any) {
      addToast(err.response.data.message, { appearance: "error" });
      throw err;
    }
    adminFetcher.fetch(false);
    addToast("User created successfully", { appearance: "success" });
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await deleteCall(`/admin/delete-user/${id}`);
      addToast(res.message, { appearance: "success" });
      adminFetcher.fetch(false);
    } catch (err) {
      addToast("Something went wrong", { appearance: "error" });
    }
  };

  return (
    <div className="admin">
      <section>
        <h1 className="heading">
          Admin Panel
          <div onClick={auth?.logout}>
            <i data-tip="Logout" className="fas fa-sign-out-alt"></i>
            <ReactTooltip type="info" place="right" effect="solid" />
          </div>
        </h1>
        <nav>
          <NavLink exact activeClassName="active-link" to={`/`}>
            User Actions
          </NavLink>
          <NavLink activeClassName="active-link" to={`/patient-actions`}>
            Patient Actions
          </NavLink>
          <NavLink activeClassName="active-link" to={`/feedback`}>
            Feedback
          </NavLink>
        </nav>
      </section>
      <main>
        <Switch>
          <Route
            exact
            path={`/`}
            render={() => (
              <AdminUserPanel
                users={adminFetcher.data.users}
                createUser={createUser}
                deleteUser={deleteUser}
              />
            )}
          />
          <Route
            path={`/feedback`}
            render={() => (
              <AdminFeedback feedback={adminFetcher.data.feedback} />
            )}
          />
          <Route path={`/patient-actions`} render={() => <AdminActions />} />
        </Switch>
      </main>
    </div>
  );
}

interface AdminUserProps {
  users: User[];
  createUser: (
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    isTeacher: boolean,
    age: string,
    gender: string,
    therapies: any
  ) => Promise<void>;
  deleteUser: (username: string) => Promise<void>;
}

function AdminUserPanel({
  users,
  createUser,
  deleteUser,
}: AdminUserProps): ReactElement {
  const search = useInputState();
  const fullName = useInputState();
  const username = useInputState();
  const age = useInputState();
  const gender = useInputState();
  const password = useInputState();
  const confirmPassword = useInputState();
  const [isTeacher, setIsTeacher] = React.useState(false);
  const { confirmed, options } = useConfirm();

  const [therapies, setTherapies] = React.useState([
    {
      therapist: "",
      therapy: "0",
    },
  ]);

  const handleCreate = () => {
    try {
      createUser(
        fullName.value,
        username.value,
        password.value,
        confirmPassword.value,
        isTeacher,
        age.value,
        gender.value,
        therapies
      );
      username.handleReset();
      password.handleReset();
      confirmPassword.handleReset();
      fullName.handleReset();
      age.handleReset();
      gender.handleReset();
      setIsTeacher(false);
      setTherapies([
        {
          therapist: "",
          therapy: "0",
        },
      ]);
    } catch (err) {}
  };

  const handleSetTherapist = (value: string, index: number) => {
    setTherapies((prev) =>
      prev.map((option: any, i: number) =>
        i === index
          ? {
              ...option,
              therapist: value,
            }
          : option
      )
    );
  };

  const handleDropdownChange = (dropdownOption: any, index: number) => {
    setTherapies((prev) =>
      prev.map((option: any, i: number) =>
        i === index
          ? {
              ...option,
              therapy: dropdownOption.value,
            }
          : option
      )
    );
  };

  return (
    <div className="admin-user">
      <Confrim options={options} />
      <aside className="list">
        <h1>User list</h1>
        <Input
          state={search}
          placeholder="Search"
          icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
        />
        <div className="users">
          {users
            .filter((user) => {
              return user.username
                .toLowerCase()
                .includes(search.value.toLowerCase());
            })
            .filter((user) => {
              return !user.isAdmin;
            })
            .map((user) => {
              return (
                <div className="user-card">
                  <div className="left">
                    <div className="name">{user.username}</div>
                    <div className={cn("role", { therapist: user.isTeacher })}>
                      {user.isTeacher ? "Therapist" : "Patient"}
                    </div>
                  </div>
                  <div
                    onClick={confirmed(
                      () => deleteUser(user._id),
                      `The account ${user.username} will be permanently deleted`
                    )}
                    className="delete"
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              );
            })}
        </div>
      </aside>
      <aside className="create">
        <h1>Create user</h1>
        <div className="switch">
          <button
            onClick={() => setIsTeacher(false)}
            className={cn({ patient: !isTeacher })}
          >
            Patient
          </button>
          <button
            onClick={() => setIsTeacher(true)}
            className={cn({ therapist: isTeacher })}
          >
            Therapist
          </button>
        </div>
        <Input state={fullName} placeholder="Full Name" />
        <Input state={username} placeholder="Username" />
        <Input state={password} placeholder="Password" type="password" />
        <Input
          state={confirmPassword}
          placeholder="Confirm Password"
          type="password"
        />
        {!isTeacher && (
          <>
            <Input state={age} placeholder="Age" />
            <Input state={gender} placeholder="Gender" />
            {[...Array(therapies.length)].map((_, i: number) => (
              <div className="flex center">
                <input
                  placeholder="Therapist Username"
                  className="therapist-input"
                  value={therapies[i].therapist}
                  onChange={(e: any) => handleSetTherapist(e.target.value, i)}
                />
                <Dropdown
                  options={dropdownOptions}
                  value={dropdownOptions[0]}
                  placeholder="Select an option"
                  className="dropdown"
                  onChange={(option: any) => handleDropdownChange(option, i)}
                />
                {i === therapies.length - 1 && (
                  <div
                    onClick={() =>
                      setTherapies((prev: any) => [
                        ...prev,
                        {
                          therapist: "",
                          therapy: "0",
                        },
                      ])
                    }
                    className="add"
                  >
                    <i className="fas fa-plus"></i>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        <button
          onClick={handleCreate}
          className={cn("submit", { therapist: isTeacher })}
        >
          Create
        </button>
      </aside>
    </div>
  );
}

interface AdminFeedbackProps {
  feedback: [
    {
      message: string;
      user: {
        username: string;
      };
    }
  ];
}

function AdminFeedback({ feedback }: AdminFeedbackProps): ReactElement {
  const search = useInputState();

  return (
    <div className="admin-feedback">
      <Input
        state={search}
        placeholder="Search by username"
        icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
      />
      <div className="list">
        {feedback
          .filter((details) =>
            details.user.username
              .toLowerCase()
              .includes(search.value.toLowerCase())
          )
          .map((details) => {
            return (
              <div className="feedback-card">
                <div className="top">
                  <div className="name">
                    <span>Patient:</span> {details.user.username}
                  </div>
                </div>
                <div className="message">{details.message}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function AdminActions(): ReactElement {
  const username = useInputState();
  const username2 = useInputState();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = React.useState("No Report Chosen");
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const { addToast } = useToasts();

  const [data, setData] = React.useState<any>(null);
  const fullName = useInputState();
  const age = useInputState();
  const gender = useInputState();

  const setFileName = (e: any) => {
    setPlaceholder(e.target.files[0].name);
  };

  const handleUploadHistory = async (e: any) => {
    e.preventDefault();

    //@ts-ignore
    const file = fileRef.current.files[0];

    if (!username.value || !file)
      return addToast("All fields are required", { appearance: "error" });
    if (file.type !== "application/pdf")
      return addToast("File type not supported", { appearance: "error" });

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("username", username.value);

    try {
      await post("/history", data, {}, true);
      username.handleReset();
      return addToast("History updated successfully", {
        appearance: "success",
      });
    } catch (err: any) {
      return addToast(err.response.data.message, { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGetData = async (e: any) => {
    e.preventDefault();
    if (!username2.value) return;
    setLoading2(true);
    try {
      const res = await get(`/admin/user-data/${username2.value}`);
      console.log(res);
      setData(res);
      username2.handleReset();

      fullName.setValue(res.user.fullName);
      age.setValue(res.age);
      gender.setValue(res.gender);
    } catch (err: any) {
      return addToast(err.response.data.message, { appearance: "error" });
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="admin-actions">
      <section className="action">
        <h2>Upload History</h2>
        <div className="body">
          <Input state={username} placeholder="Username" />
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
          <button
            disabled={loading}
            onClick={handleUploadHistory}
            className="btn"
          >
            Submit
          </button>
        </div>
      </section>
      <section className="action">
        <h2>Get User Data</h2>
        <div className="body">
          <Input state={username2} placeholder="Username" />
          <button
            onClick={handleGetData}
            disabled={loading2}
            className="btn btn--2"
          >
            Submit
          </button>
        </div>
        {!!data && (
          <>
            <div className="inputs">
              <Input
                state={fullName}
                placeholder="Full Name"
                label="Full Name"
              />
              <Input state={age} placeholder="Age" label="Age" />
              <Input state={gender} placeholder="Gender" label="Gender" />
            </div>
            <button className="btn btn--alt">Update</button>
          </>
        )}
      </section>
    </div>
  );
}
