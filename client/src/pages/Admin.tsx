import React, { ReactElement } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Animation from "../components/Animation";
import Input from "../components/Input";
import useFetch from "../hooks/useFetch";
import useInputState from "../hooks/useInputState";
import ReactTooltip from "react-tooltip";
import cn from "classnames";
import { deleteCall, post } from "../utils/requests";
import { useConfirm } from "../hooks/useConfirm";
import Confrim from "../components/Confirm";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from "../context/AuthContext";
import { User } from "../utils/types";

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
    username: string,
    password: string,
    confirmPassword: string,
    isTeacher: boolean
  ) => {
    if (password !== confirmPassword)
      return addToast("Passwords do not match", { appearance: "error" });
    try {
      await post("/auth/register", { username, password, isTeacher });
    } catch (err: any) {
      return addToast(err.response.data.message, { appearance: "error" });
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
    username: string,
    password: string,
    confirmPassword: string,
    isTeacher: boolean
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

  const handleCreate = () => {
    createUser(
      username.value,
      password.value,
      confirmPassword.value,
      isTeacher
    );
    username.handleReset();
    password.handleReset();
    confirmPassword.handleReset();
    setIsTeacher(false);
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
  return (
    <div className="admin-feedback">
      <div className="list">
        {feedback.map((details) => {
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

  return (
    <div className="admin-actions">
      <section className="action">
        <h2>Upload History</h2>
        <div className="body">
          <Input state={username} placeholder="Username" />
        </div>
      </section>
    </div>
  );
}
