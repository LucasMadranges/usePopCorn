import {useState} from "react";
import Button from "./Button.jsx";

export default function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <Button isOpen={isOpen}
                    setIsOpen={setIsOpen}/>
            {isOpen && (
                children
            )}
        </div>
    )
}