import React from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {deleteAdditionalField} from "../redux/features/additionalFields/additionalFieldsSlice";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const AdditionalField = ({addField}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    return (
        <div className='flex items-center bg-gray-200 dark:bg-gray-800 border-1 px-2 py-2 rounded-md mx-2 dark:text-white text-lg h-8 mb-2'>
            {addField.inputType} : {addField.inputName} | <AiOutlineDelete title={t('delete')} onClick={() => dispatch(deleteAdditionalField({inputName: addField.inputName, inputType: addField.inputType}))}/>
        </div>
    );
};

export default AdditionalField;