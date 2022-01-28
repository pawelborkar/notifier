import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";

function App() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("https://localhost:5000"));
    }, []);

    useEffect(() => {
        socket?.emit("newUser", user);
    }, [socket, user]);

    return (
        <div className="container">
            {user ? (
                <>
                    <Navbar socket={socket} />
                    {posts.map((post) => (
                        <Card
                            key={post.id}
                            post={post}
                            socket={socket}
                            user={user}
                        />
                    ))}
                    <span className="username">{user}</span>
                </>
            ) : (
                <div className="login">
                    <input
                        className="input"
                        name="username"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <button
                        type="text"
                        className="btn"
                        onClick={() => setUser(username)}
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
