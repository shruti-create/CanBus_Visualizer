import {useState} from 'react'
import NewProjectForm from './NewProjectForm'
import ImportProjectForm from './ImportProjectForm'
import ProjectState from './ProjectState'
import './index.css';

function NewProject() {
    const [state, setState] = useState<ProjectState>({
        _id: undefined,
        eventName: '',
        baudRate: 9600,
        initials: '',
        dbcFile: null,
        blacklistFile: null,
        archive: false,
    })

    return (
        <div className='new-project'>
            <h1 className='new-project-title'>Create Project</h1>
            <br/>
            <NewProjectForm state={state} setState={setState}/>
        </div>
    )
}

export default NewProject