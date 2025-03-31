import gordon from "../assets/Gordon_Ramsay.png";
import Avatar from "../components/Avatar";

export default async function UserPage({ params }) {
    const { user } = await params;
    const cleanedUser = user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>{cleanedUser}</h1>
            {cleanedUser === "Gordon Ramsay" && (
                <Avatar src={gordon} alt="Gordon Ramsay" />
            )}
        </div>
    );
}