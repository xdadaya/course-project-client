import React, {useState} from 'react';

const AdditionalFieldInput = ({addField}) => {
    const [inputValue, setInputValue] = useState((addField.inputValue) ? addField.inputValue : '')

    switch (addField.inputType){
        case "Text":
            return(
                <input type='text' id={addField._id} maxLength={32} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                       className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={addField.fieldName} required/>
            )
        case "Textarea":
            return(
                <textarea rows="4" id={addField._id} maxLength={256} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                          className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={addField.fieldName} required/>
            )
        case "Number":
            return(
                <input type='number' id={addField._id} maxLength={16} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                       className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={addField.fieldName} required/>
            )
        case "CheckBox":
            return(
                <input type="checkbox" title={addField.fieldName} id={addField._id} checked={Boolean(inputValue)} onChange={(e)=>setInputValue(e.target.value)}
                       className="mb-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            )
        case "Date":
            return(
                <input type="date" required id={addField._id} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                       className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date"/>
            )
    }
};

export default AdditionalFieldInput;