import React, { ChangeEvent, useState } from 'react';
import { addSenario } from '../APIs/scenarioCalls';
import { Scenario } from '../types/types';

import '../App.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addscenario } from '../store/ScenarioSlice';


export const ScenarioForm: React.FC<{}> = () => {
    const [scenarioName, setScenarioName] = useState<string>('');
    const [scenarioTime, setScenarioTime] = useState<string>('')
    const [errors, setErrors] = useState<{ scenarioName?: string; scenarioTime?: string }>({})
    const dispatch = useDispatch<AppDispatch>();


    const validateForm = (): boolean => {
        const newErrors: { scenarioName?: string; scenarioTime?: string } = {};
        if (!scenarioName) {
            newErrors.scenarioName = `Scenario Name is required`;
        }
        if (!scenarioTime) {
            newErrors.scenarioTime = `Scenario Time is required`;
        } else if (isNaN(Number(scenarioTime))) {
            newErrors.scenarioTime = `Scenario time must be a number`
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleAddScenario = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const scenarioData: Scenario = { 'id': Date.now(), scenarioName, scenarioTime, 'vehicleList': [] }
            const response = await addSenario(scenarioData)
            console.log(response);
            dispatch(addscenario(scenarioData));
            handleReset();
        } catch (error) {
            console.error(`Error in adding Scenario ${error}`)
        }
    }

    const handleReset = () => {
        setScenarioName('');
        setScenarioTime('');
        setErrors({});
    }

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value)
    }
    return (
        <div>
            <div className="AddScenario">
                <div className='scenarioPath'>Scenario / Add</div>
                <div className='Scenario-heading'>Add Scenario</div>
                <div className='Scenario-body'>
                    <div className={`inputs ${errors.scenarioName ? 'error' : ''}`}>
                        <label htmlFor="name">Scenario Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={scenarioName}
                            className={errors.scenarioName ? 'error' : ''}
                            onChange={handleChange(setScenarioName)}
                        ></input>
                        {errors.scenarioName && <div className='error'>{errors.scenarioName}</div>}
                    </div>

                    <div className={`inputs ${errors.scenarioTime ? 'error' : ''}`}>
                        <label htmlFor="time">Scenario Time</label>
                        <input
                            type="text"
                            name="title"
                            id="time"
                            value={scenarioTime}
                            onChange={handleChange(setScenarioTime)}
                        ></input>
                        {errors.scenarioName && <div className='error'>{errors.scenarioTime}</div>}
                    </div>
                </div>
            
            <div className='button-div'>
                <button className='button' style={{backgroundColor: '#5CB65E' }} onClick={handleAddScenario}>Add</button>
                <button className='button' style={{backgroundColor: '#DF7B36'}} onClick={handleReset}>Reset</button>
                {/* <button className='button' style={{backgroundColor: '#4C9AB8'}} onClick={handleGoBack}>Go Back</button> */}
            </div>
            </div>
        </div>
    )
}
