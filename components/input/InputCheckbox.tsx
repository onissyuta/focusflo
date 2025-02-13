interface InputCheckboxProps {
    label: string
}


export default function InputCheckbox({ label }: InputCheckboxProps) {
    return (
        <div>
            <label htmlFor="inputCheckbox">{label}</label>
            <input type="checkbox" id="inputCheckbox" />
        </div>
    );
}