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
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab);

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
                                    <h1 className="d-none d-print-block">The Plague Project</h1>
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
                                Juall | Rosenblum | Pojero | Erry 
                            </Col>
                            <Col lg={6}>
                                <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        );
    }
}