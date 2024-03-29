import './index.css';
import APIUtil from '../utilities/APIutils';
import {useNavigate} from "react-router-dom";
import NewProject from './new';
import { Button, ButtonGroup, Col, Nav, Dropdown, Row, Tab, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ProjectState from './new/ProjectState';
import { useEffect, useState } from 'react';
import swal from 'sweetalert'
import ImportProjectForm from './new/ImportProjectForm';

function Projects() {

  let navigate = useNavigate();

  const onBackButtonClick = ()=> {
    const path = '/'
    navigate(path)
  }

  const setArchive=(projectId: string, projectInfo: ProjectState)=> {
    const updatedProject: ProjectState = {...projectInfo, archive: true}
    api.editProjectInfo(projectId, updatedProject)
    .then((response) => {
      getActiveProjects()
      getArchiveProjects()
    })
    .catch((error: any) => console.log(error))

  }

  const getActiveProjects = () => {
    // Get active projects
    api.getProjects(false)
    .then((response) => {
      setActiveProjects(response.data)
    })
    .catch((error: any) => console.log(error))
  }

  const getArchiveProjects = () => {
    // Get archied projects
    api.getProjects(true)
    .then((response) => {
      setArchivedProjects(response.data)
    })
    .catch((error: any) => console.log(error))

  }


  const exportFile = (projectId: string, projectInfo: ProjectState, fileType: string) => {
    // Export project to JSON
    api.exportProject(projectId, projectInfo, fileType)
    .then((response) => {
      swal({
        
        text: 'Exported to: Back-End/Projects/' + projectInfo.eventName + '.' +fileType
      });
    })
    .catch((error: any) => console.log(error))

  }

  const setActive=(projectId: string, projectInfo: ProjectState)=> {
    const updatedProject: ProjectState = {...projectInfo, archive: false}
    api.editProjectInfo(projectId, updatedProject)
    .then((response) => {
      getActiveProjects()
      getArchiveProjects()
      
    })
    .catch((error: any) => console.log(error))

  }

  useEffect(() => {
    getActiveProjects()
    getArchiveProjects()
    
  }, [])

  const onNavigateProject = (path: string) => {
    navigate(path)
  }
    
  const api = new APIUtil()

  const [activeProjects, setActiveProjects] = useState<ProjectState[]>([])
  const [archivedProjects, setArchivedProjects] = useState<ProjectState[]>([])

  let newProjectForm = NewProject()

  const activeProjectCards = activeProjects.map((project) => {
    return (
      <Dropdown as={ButtonGroup} className='mock-project'>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id='tooltip'>{project.eventName}</Tooltip>}
        >
        <Button
          className='inside-mock'
          variant='warning'
          onClick={() => {
            const path = project.eventName
            onNavigateProject('/projects/' + path)
          }}
        >
          <div className='card-event-name'>{project.eventName}</div>
        </Button>
        </OverlayTrigger>
        <Dropdown.Toggle className='inside-mock-dropdown'split variant="warning" id="dropdown-split-basic"/>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => setArchive(project._id!, project)}>Archive</Dropdown.Item>
        <Dropdown.Item onClick={() => exportFile(project._id!, project, "json")}>Export to JSON </Dropdown.Item>
        <Dropdown.Item onClick={() => exportFile(project._id!, project, "csv")}>Export to CSV </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  })

  
  const archivedProjectCards = archivedProjects.map((project) => {
    return (
      <Dropdown as={ButtonGroup} className='mock-project'>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id='tooltip'>{project.eventName}</Tooltip>}
        >
          <Button
            className='inside-mock'
            variant='secondary'
            onClick={() => {
              const path = project._id
              onNavigateProject('/projects/' + path)
            }}
          >
            {project.eventName}
          </Button>
        </OverlayTrigger>
        <Dropdown.Toggle className='inside-mock-dropdown'split variant="secondary" id="dropdown-split-basic"/>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => setActive(project._id!, project)}>Move to Active</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  })

  useEffect(() => {
    // Get active projects
    api.getProjects(false)
    .then((response) => {
      setActiveProjects(response.data)
    })
    .catch((error: any) => console.log(error))

    // Get archied projects
    api.getProjects(true)
    .then((response) => {
      setArchivedProjects(response.data)
    })
    .catch((error: any) => console.log(error))
  }, [])

  return (
    <div>
    <Tab.Container id='projectTabs' defaultActiveKey='activeProjects'>
      <Row>
        <Col sm={3} className='tabColumn'>
          <Nav variant='pills' className='flex-column'>
            <Nav.Item>
              <Nav.Link eventKey='importProject'>
                Import Project
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='newProject'>
                Create Project
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='activeProjects'>
                Active Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='archivedProjects'>
                Archived Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='backToHome' onClick={onBackButtonClick}>
                Back to Home
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey='newProject'>
              {newProjectForm}
            </Tab.Pane>
            <Tab.Pane eventKey='importProject'>
              <h3 className='projectHeader3'> </h3>
              <ImportProjectForm/>
            </Tab.Pane>
            <Tab.Pane eventKey='activeProjects'>
              <h3 className='projectHeader3'>Active Projects</h3>
              {activeProjectCards}
            </Tab.Pane>
            <Tab.Pane eventKey='archivedProjects'>
              <h3 className='projectHeader3'>Archived Projects</h3>
              {archivedProjectCards}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  );
}

export default Projects;
