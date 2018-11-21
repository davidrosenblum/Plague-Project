import "../lib/bootstrap.min.css";
import "./App.css";
import "./Print.css";
import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Inputs } from "./Inputs";
import { Navbar } from "./Navbar";
import { Table } from "./Table";
import { Graph } from "./Graph";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleLeft, faAngleDoubleRight, faSkull, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faAngleDoubleLeft, faAngleDoubleRight, faSkull, faBalanceScale);
let d = new Date();

export class App extends React.Component{
    render(){
        return (
            <div>
                <Navbar/>
                <br/>
                <main>
                    <Container>
                        <Card color="light">
                            <CardBody>
                                <Row className="text-center input-graph-container">
                                    <div className="print-title-containter d-none d-print-block">
                                        <h1>The Plague Project</h1>
                                        <FontAwesomeIcon className="skull-icon" icon="skull" size="lg"></FontAwesomeIcon>
                                        <h2>Disease Simulator</h2>                                        
                                    </div>
                                    <Col lg={6}>
                                        <Inputs/>
                                    </Col>
                                    <Col lg={6}>
                                        <Graph/>
                                    </Col>
                                </Row>
                                <br/>
                                <div>
                                    <Table/>
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                </main>
                <footer>
                    <Container className="text-center">
                        <hr/>
                        <Row>
                            <Col lg={6}>
                                Juall
                                &nbsp;
                                <a href="https://github.com/rjuall">
                                    <FontAwesomeIcon icon={['fab', 'github-square']}></FontAwesomeIcon>
                                </a>
                                &nbsp;
                                <a href="https://www.linkedin.com/in/rjuall/">
                                    <FontAwesomeIcon icon={['fab', 'linkedin']}></FontAwesomeIcon>
                                </a>
                                &nbsp;|&nbsp; 
                                Rosenblum
                                &nbsp;
                                <a href="https://github.com/davidrosenblum">
                                    <FontAwesomeIcon icon={['fab', 'github-square']}></FontAwesomeIcon>
                                </a>
                                &nbsp;|&nbsp;
                                Pojero
                                {/*&nbsp;
                                <a href="/">
                                    <FontAwesomeIcon icon={['fab', 'github-square']}></FontAwesomeIcon>
                                </a>
                                &nbsp;
                                <a href="/">
                                    <FontAwesomeIcon icon={['fab', 'linkedin']}></FontAwesomeIcon>
                                </a>*/}
                                &nbsp;|&nbsp;
                                Erry
                                &nbsp;
                                <a href="https://linkedin.com/in/karanerry">
                                    <FontAwesomeIcon icon={['fab', 'linkedin']}></FontAwesomeIcon>
                                </a>
                            </Col>
                            <Col lg={6}>                                
                                <a href="https://github.com/davidrosenblum/Plague-Project/blob/master/LICENSE" target="_blank">
                                    <FontAwesomeIcon icon="balance-scale" size="sm"></FontAwesomeIcon>
                                    &nbsp;
                                    MIT License
                                    &copy;
                                    { d.getFullYear() }
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        );
    }
}