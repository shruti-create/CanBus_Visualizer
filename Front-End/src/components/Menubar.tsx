import Container from 'react-bootstrap/Container';
import './index.css';
import NodeUtils from '../utilities/NodeUtils'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import { toPng, toJpeg } from "html-to-image";
import download from "downloadjs";

function mapToPng() {
  var map = document.getElementById('download-image') as HTMLElement
  toPng(map, {
      filter: (node) => {
          if(
              node?.classList?.contains('react-flow__minimap') ||
              node?.classList?.contains('react-flow__controls')
          ) {
              return false
          }
          return true
      },
  }).then(function(dataUrl){
      download(dataUrl, 'nodeMap.png')
  });
}

function mapToJpeg() {
  var map = document.getElementById('download-image') as HTMLElement
  toJpeg(map, {
      filter: (node) => {
          if(
              node?.classList?.contains('react-flow__minimap') ||
              node?.classList?.contains('react-flow__controls')
          ) {
              return false
          }
          return true
      },
      quality: 0.95,
  }).then(function(dataUrl){
      download(dataUrl, 'nodeMap.jpeg')
  });
}

export default function Menubar({
      getImageOptions,
      imageOptions,
      showPacketViewSettingsModal,
      hidePacketViewSettingsModal,
      showReplayPacketsModal,
      onAddNode,
      showHideNodeModal,
      showImportImageModal,
      hideImportImageModal
    } : any
    ){
  return (
    <div>
    <Navbar  expand="lg">
      <Container id="rcorners1">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="File" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" href="#action/3.2">Export Project </NavDropdown.Item>
              <NavDropdown.Item id="action" href='/projects/'>Exit</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Packets" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" onClick={showReplayPacketsModal}> Replay Packets </NavDropdown.Item>
              <NavDropdown.Item id='action' onClick={showPacketViewSettingsModal}>Filter and Sort</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Node" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" onClick={() => {onAddNode()}}> Add Node  </NavDropdown.Item>
              <NavDropdown.Item id="action" onClick={showHideNodeModal}>Hide/Show</NavDropdown.Item>
              <NavDropdown.Item id="action" onClick={showImportImageModal}>Import Image</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Download Map" id="basic-nav-dropdown">
              <NavDropdown.Item id="action" onClick={mapToPng}>As Jpeg</NavDropdown.Item>
              <NavDropdown.Item id="action" onClick={mapToJpeg}>As Png</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
