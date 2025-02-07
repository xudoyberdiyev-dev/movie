import {useEffect, useState} from "react";
import {FiSend} from "react-icons/fi";
import "./Comment.css";
import {GetAuto} from "../../service/userService/AppService.js";
import {APP_API} from "../../service/AppApi.js";
import {BASE_CONFIG_CLIENT} from "../../service/BaseConfig.js";
import toast from "react-hot-toast";


export const Comment = ({movieId}) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const maxChars = 500; // Maksimal belgi soni

    const getComment = async () => {
        try {
            const res = await GetAuto(`${APP_API.comment}/${movieId}`)
            setComments(res.data);
        } catch (error) {
            console.error("Izohlarni olishda xatolik:", error);
        }
    };

    const addComment = async () => {
        if (!text.trim()) return;
        try {
            const response = await BASE_CONFIG_CLIENT.doPost(`${APP_API.comment}/${movieId}`, {text});

            if (response.data.success) {
                // 🔥 Yangi izoh API'da saqlanadi, shuning uchun fetchComments chaqiramiz
                getComment();
                setText("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Izoh qoldirish uchun ro‘yxatdan o‘tish kerak!");
        }
    };


    useEffect(() => {
        getComment()
    }, []);

    return (
        <div className="comments-container">
            <h3>Izohlar ({comments.length})</h3>

            <div className="textarea-container">
                <span className="char-count">{maxChars - text.length} belgi qoldi</span>
                <textarea
                    placeholder="Fikringizni yozing..."
                    value={text}
                    maxLength={maxChars}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={() => addComment()} disabled={!text.trim()} className="send-btn">
                    <FiSend size={18}/> Izoh qoldirish
                </button>
            </div>

            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment">
                        <div className="comment-header">
                            <span className="comment-name">{comment.userName} {comment.userSurname}</span>
                            <span className="comment-time">{comment.createdAt.substring(0, 10)}</span>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
