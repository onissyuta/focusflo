import Link from "next/link";
import { Pencil, ChartLine, Settings } from "lucide-react";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
    return (
        <aside className="w-64 px-4 py-8 h-screen bg-slate-200">
            <h1 className="mb-8 px-2 text-xl font-bold">FocusFlo</h1>
            <ul className="flex flex-col gap-2">
                <li><SideBarButton path="/app" label="記録" Icon={Pencil} /></li>
                <li><SideBarButton path="/app/graphview" label="グラフビュー" Icon={ChartLine} /></li>
                <li><SideBarButton path="/app/settings" label="設定" Icon={Settings} /></li>
            </ul>
            <a href="/auth/logout">ログアウト</a>
        </aside>
    );
}