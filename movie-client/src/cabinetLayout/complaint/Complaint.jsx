import {FiSend} from "react-icons/fi";
import {useState} from "react";
import {BASE_CONFIG_CLIENT} from "../../service/BaseConfig.js";
import {APP_API} from "../../service/AppApi.js";
import toast from "react-hot-toast";

export const Complaint = () => {
    const [message, setMessage] = useState('')
    const maxChars = 300; // Maksimal belgi soni
    const addComplaint = async () => {
        if (!message.trim()) return;
        try {
            await BASE_CONFIG_CLIENT.doPost(APP_API.complaintSend, {message});
            setMessage('')
            toast.success("Habar yuborildi")

        } catch (error) {
            toast.error("Izoh qoldirish uchun ro‘yxatdan o‘tish kerak!");
        }
    };
    return (
        <div>
            <div className="textarea-container">
                <span className="char-count">{maxChars - message.length} belgi qoldi</span>
                <textarea
                    placeholder="Fikringizni yozing..."
                    value={message}
                    maxLength={maxChars}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => addComplaint()} disabled={!message.trim()} className="send-btn">
                    <FiSend size={18}/> Izoh qoldirish
                </button>
            </div>
        </div>
    )
}