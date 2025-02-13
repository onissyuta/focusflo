interface InputStringProps {
    label: string
}

export default function InputString({ label }: InputStringProps) {
    return (
        <div>
            <label htmlFor="inputString">{label}</label>
            <input type="text" id="inputString" placeholder="NO DATA" className="border-2 border-gray-300 rounded-md" />
        </div>
    );
}