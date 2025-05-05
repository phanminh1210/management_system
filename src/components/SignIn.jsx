import { Link, useNavigate } from "react-router-dom";
import s from "../styles/sign-in.module.scss";
import { useEffect, useState } from "react";
import { ACCOUNT } from "../constants";
import Logo from '../assets/images/logo.png';

export default function SignIn() {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (userStorage?.username) {
            navigate("/");
        }
    }, [navigate, userStorage]);

    const onSubmit = () => {
        if (!user.username.trim() || !user.password.trim()) {
            setMsgError("Please fill required field!");
            return;
        }

        if (
            user.username.trim() !== ACCOUNT.username ||
            user.password.trim() !== ACCOUNT.password
        ) {
            setMsgError("Account incorrect!");
            return;
        }

        localStorage.setItem("user", JSON.stringify({
            username: ACCOUNT.username,
            password: ACCOUNT.password,
        }));

        setMsgSuccess("Sign in successfully");

        setTimeout(() => navigate("/"), 1000);
    };

    return (
        <div className={s.login}>
            <div className={s.login__container}>
                <div className={s.login__top}>
                    <Link to="/" className={s.login__logoWrapper}>
                        <img src={Logo} alt="Logo" className={s.login__logoImg} />
                        <span className={s.login__logoText}>Management_system</span>
                    </Link>
                    <div className={s.login__heading}>Let's Get Started Minhh!</div>
                    <div className={s.login__subheading}>
                        Sign in to continue to Management_system.
                    </div>
                </div>
                <div className={s.login__form}>
                    {msgError && <div className={s.login__error}>{msgError}</div>}
                    {msgSuccess && (
                        <div className={`${s.login__error} ${s.login__success}`}>
                            {msgSuccess}
                        </div>
                    )}
                    <div>
                        <p className={s.login__label}>Username</p>
                        <input
                            placeholder="Enter username"
                            type="text"
                            value={user.username}
                            onChange={(e) => {
                                setMsgError("");
                                setUser({ ...user, username: e.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <p className={s.login__label}>Password</p>
                        <input
                            placeholder="Enter password"
                            type="password"
                            value={user.password}
                            onChange={(e) => {
                                setMsgError("");
                                setUser({ ...user, password: e.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <button className={s.login__btn} onClick={onSubmit}>
                            Log In <span className={s.login__icon}></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
