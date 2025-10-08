import { LuLoaderCircle } from "react-icons/lu";

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <LuLoaderCircle className="animate-spin text-blue-500" size={25}/>
        </div>
    )
}

export default Loader