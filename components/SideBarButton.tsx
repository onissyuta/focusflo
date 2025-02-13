import Link from "next/link";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";
import { RefAttributes } from "react";


interface SideBarButtonProps {
    path: string;
    label: string;
    Icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
}


export default function SideBarButton({ path, label, Icon }: SideBarButtonProps) {
    return (
        <Link href={path} className="flex items-center px-2 py-3 hover:bg-slate-300 rounded-xl transition-all">
            <Icon size={20} className="mr-3" />
            {label}
        </Link>
    );
}