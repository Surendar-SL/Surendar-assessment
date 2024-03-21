import React, { useState } from "react";
import "./Textbox.css";
import RemoveIcon from '@mui/icons-material/Remove';

function TextBox() {
    const allOptions = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' }
    ]

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [availableOptions, setAvailableOptions] = useState(allOptions);
    const [segmentName, setSegmentName] = useState("");
    const [newDropdownOptions, setNewDropdownOptions] = useState([]);
    const [inputValues, setInputValues] = useState({});

    const handleSegmentNameChange = (event) => {
        setSegmentName(event.target.value);
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const selectedLabel = event.target.selectedOptions[0].textContent;
        const newSelectedOptions = [...selectedOptions, { label: selectedLabel, value: selectedValue }];
        setSelectedOptions(newSelectedOptions);
        const newAvailableOptions = availableOptions.filter(option => option.value !== selectedValue);
        setAvailableOptions(newAvailableOptions);
    };

    const handleRemoveOption = (value) => {
        const newSelectedOptions = selectedOptions.filter(option => option.value !== value);
        setSelectedOptions(newSelectedOptions);
        const removedOption = allOptions.find(option => option.value === value);
        if (removedOption) {
            setAvailableOptions([...availableOptions, removedOption]);
        }
    }

    const handleAddNewSchema = () => {
        const newAvailableOptions = availableOptions.filter((option) => !selectedOptions.find((selectedOption) => selectedOption.value === option.value));
        setAvailableOptions(newAvailableOptions);
        const newDropdown = {
            id: Math.random(),
            options: newAvailableOptions
        }
        setNewDropdownOptions([...newDropdownOptions, newDropdown]);
    }

    const handleNewDropdownChange = (event, id) => {
        const selectedValue = event.target.value;
        const selectedLabel = event.target.selectedOptions[0].textContent;
        const updatedNewDropdownOptions = newDropdownOptions.map(dropdown => {
            if (dropdown.id === id) {
                dropdown.selectedOption = { label: selectedLabel, value: selectedValue };
            }
            return dropdown;
        });
        setNewDropdownOptions(updatedNewDropdownOptions)
    }

    const handleInputChange = (event, value) => {
        setInputValues(prevState => ({ ...prevState, [value]: event.target.value }))
    }

    const handleSaveSegment = () => {
        const data = {
            segment_name: segmentName,
            schema: Object.keys(inputValues).map(key => ({ [key]: inputValues[key] })),
        }
    
        console.log(JSON.stringify(data, null, 2))
        setSegmentName("")
        setInputValues({})
    }

   

    return (
        <>
            <div className="popup">
                <nav> <h3>Saving Segment</h3></nav>
                <div className="text-area">
                    <p>Enter the Name of the Segment</p>
                    <input
                        className="segment-input"
                        type="text"
                        placeholder="Name of the Segment"
                        value={segmentName}
                        onChange={handleSegmentNameChange}
                    />
                    <p>To save your segment, you need to add the schemas to build the query</p>
                    <div  className="selected-options-container" >
                        {selectedOptions.map(option => (
                            <div className="selected-option" key={option.value}>
                                <input
                                    className="input-selected-option"
                                    type="text"
                                    placeholder={option.label}
                                    onChange={(event) => handleInputChange(event, option.value)}
                                />
                                <button className="input-selected-option-btn" onClick={() => handleRemoveOption(option.value)}><RemoveIcon /></button>
                            </div>
                        ))}
                    </div>

                    <select onChange={handleSelectChange} value="">
                        <option value="" >Add Schema to segment</option>
                        {availableOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button className="add-schema-btn" onClick={handleAddNewSchema}>+Add new Schema</button>
                    {newDropdownOptions.map((dropdown, index) => (
                        <div key={index}>
                            <select onChange={(event) => handleNewDropdownChange(event, dropdown.id)} value="">
                                <option value="" disabled>Add Schema to segment</option>
                                {dropdown.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </div>
                    ))}
                </div>
                <div className="save-segment-btn">
                    <button className="save-btn" onClick={handleSaveSegment}>Save the Segment</button>
                    <button className="cancel-btn" >Cancel</button>
                </div>
            </div>
        </>
    );
}

export default TextBox;
