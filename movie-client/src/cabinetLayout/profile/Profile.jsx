export const Profile = () => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const name = localStorage.getItem("name")
    const surname = localStorage.getItem("surname")
    const email = localStorage.getItem("email")
    return (
        <>
            <div>{id}</div>
            <div>{name}</div>
            <div>{surname}</div>
            <div>{email}</div>
        </>
    );
};
