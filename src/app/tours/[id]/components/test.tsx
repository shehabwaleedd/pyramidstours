import React from 'react'

export const test = () => {
    return (
        <div className="toDoRi__container">
            {tourDetail.toursDetails.sections.map((section, sectionIndex) => (
                section.options && section.options.length > 0 ? (
                    <div className="toDoRiCo__options" key={`${sectionIndex}-${section.title}`}>
                        <h3>{section.title}</h3>
                        {section.options.map((option, optionIndex) => (
                            <div key={`${sectionIndex}-${optionIndex}`} className="toDoRiCo__option"> {/* Unique key added here */}
                                <div className={`toDoRiCoOp__option ${formData.selectedOptions[option.name] ? 'selected' : ''}`}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.selectedOptions[option.name] || false}
                                            value={option.name}
                                            onChange={() => handleOptionChange(option.name)}
                                        />
                                        {option.name} - ${option.price}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null
            ))}
        </div>
    )
}
