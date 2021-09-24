import React, { ReactElement } from "react";
import {
  Link,
  NavLink,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
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

export default function Admin({ match }: RouteComponentProps): ReactElement {
  useDocumentTitle("Manonaya | Admin");
  const adminFetcher = useFetch("/admin/data");
  const { addToast } = useToasts();

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

  const deleteUser = async (username: string) => {
    try {
      const res = await deleteCall(`/admin/delete-user/${username}`);
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
          <Link to="/">
            <i data-tip="Exit Admin Panel" className="fas fa-sign-out-alt"></i>
            <ReactTooltip type="info" place="left" effect="solid" />
          </Link>
        </h1>
        <nav>
          <NavLink exact activeClassName="active-link" to={`${match.path}`}>
            User Actions
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to={`${match.path}/patient-actions`}
          >
            Patient Actions
          </NavLink>
          <NavLink activeClassName="active-link" to={`${match.path}/feedback`}>
            Feedback
          </NavLink>
        </nav>
      </section>
      <main>
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={() => (
              <AdminUserPanel
                users={adminFetcher.data.users}
                createUser={createUser}
                deleteUser={deleteUser}
              />
            )}
          />
          <Route
            path={`${match.path}/feedback`}
            render={() => (
              <AdminFeedback
              // feedback={adminFetcher.data.users}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

interface AdminUserProps {
  users: [
    {
      username: string;
      isTeacher: boolean;
      isAdmin: boolean;
    }
  ];
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
  const username = useInputState();
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
                      () => deleteUser(user.username),
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
        <Input state={username} placeholder="Username" />
        <Input state={password} placeholder="Password" type="password" />
        <Input
          state={confirmPassword}
          placeholder="Confirm Password"
          type="password"
        />
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

interface AdminFeedbackProps {}

function AdminFeedback({}: AdminFeedbackProps): ReactElement {
  const search = useInputState();
  return (
    <div className="admin-feedback">
      <Input
        state={search}
        placeholder="Search by patient or therapist"
        icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
      />
      <div className="list">
        <div className="feedback-card">
          <div className="top">
            <div className="name">
              <span>Patient:</span> {"Akhil"}
            </div>
            <div className="faculty-name">
              <span>Therapist:</span> {"Akhil"}
            </div>
          </div>
          <div className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, est
            voluptatum obcaecati ducimus eligendi quis facilis non praesentium,
            incidunt vel ratione officia aperiam, sunt quo nam impedit error
            dolor dignissimos.
          </div>
        </div>
      </div>
    </div>
  );
}
