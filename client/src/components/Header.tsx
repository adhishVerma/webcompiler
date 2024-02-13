import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    return (
        <nav className='w-full h-[60px] p-3 flex justify-between items-center bottom-2 border'>
            <Link to="/">
                <h2 className="text-2xl font-semibold select-none tracking-wider">CodePen</h2>
            </Link>
            <ul className="flex gap-2 select-none">
                <li>
                    <ModeToggle/>
                </li>
                <li>
                    <Link to="/editor">
                        <Button>Editor</Button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}



