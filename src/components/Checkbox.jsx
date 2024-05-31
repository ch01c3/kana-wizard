export default function Checkbox({label, isSelected, onCheckboxChange}) {

    return (
        <div className="checkbox-item">
            <div className="checkbox-wrapper">
                <input type="checkbox" 
                    id={label}
                    checked={isSelected}
                    onChange={onCheckboxChange}
                />
                <label htmlFor={label}></label>
            </div>
                <label htmlFor={label} className="checkbox-text"><strong>{label}</strong></label>
        </div>
    )
}