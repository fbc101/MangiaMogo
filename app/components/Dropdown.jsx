'use client';

export default function Dropdown({ options, onChange }) {

    const handleChange = (e) => {
        onChange(e.target.value);
    }

    return (
        <div className="flex flex-row items-center justify-start p-3">
            <select className="border rounded-md p-2 w-20 " onChange={handleChange}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}