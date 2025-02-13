import InputCheckbox from "./input/InputCheckbox";
import InputNumber from "./input/InputNumber";
import InputString from "./input/InputString";

const data = [
    {
        id: 1,
        type: "number",
        label: "体重",
    },
    {
        id: 2,
        type: "checkbox",
        label: "お薬",
    },
    {
        id: 3,
        type: "string",
        label: "目標",
    },
]


export default function HabitList() {
    return (
        <ul className="max-w-xl mx-auto my-4 p-8 divide-y divide-solid divide-gray-400 text-xl rounded-3xl shadow-lg">
            {data.map(item => (
                <li key={item.id} className="py-4">
                    {item.type === "number" && <InputNumber label={item.label} />}
                    {item.type === "checkbox" && <InputCheckbox label={item.label} />}
                    {item.type === "string" && <InputString label={item.label} />}
                </li>
            ))}
        </ul>
    );
}