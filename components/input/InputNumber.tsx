interface InputNumberProps { 
    label: string
}

export default function InputNumber({ label }: InputNumberProps) {
    return (
        <div>
            <label htmlFor="inputNumber">{label}
                <input type="number" id="inputNumber" placeholder="0" className="border-2 border-gray-300 rounded-md" />
            </label>
        </div>
    );
}