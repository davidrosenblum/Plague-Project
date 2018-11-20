import "./ExportsModal.css";
import React from "react";
import { Modal, ModalBody, ModalHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Input } from "reactstrap";
import Simulator from "../Simulator";
import GraphData from "../GraphData";

export class ExportsModal extends React.Component{
    constructor(props){
        super(props);

        // export refs
        this.exportUrlRef = React.createRef();
        this.csvFilenameElement = null;         // later to set an <input> (reactstrap inner ref)

        this.state = {
            exportOption: null,
            exportDropdown: false,
            copyMessage: null,
            csvMessage: null,
            pending: false
        };
    }
    
    // downloads the csv file
    downloadCSV(){
        if(!this.state.pending){
            // disable buttons
            this.setState({pending: true, csvMessage: "Loading..."});

            // optional filename override
            let filename = this.csvFilenameElement ? this.csvFilenameElement.value : null;

            Simulator.downloadCSVFile(this.props.getInputsDictionary(), filename)
                .then(() => this.setState({csvMessage: "Download complete."}))  // good
                .catch(err => this.setState({csvMessage: err.message}))         // err - something went wrong (server did not respond or bad request)
                .then(() => this.setState({pending: false}));                   // always - free buttons
        }
    }

    toggleModal(){
        this.setState({exportOption: null, copyMessage: null, csvMessage: null});
        this.props.toggle();
    }

    toggleExportDropdown(){
        this.setState(prev => ({exportDropdown: !prev.exportDropdown}));
    }

    getExportURL(){
        let dict = this.props.getInputsDictionary();

        let url = `${window.location.origin}?`;

        for(let param in dict){
            url += `${param}=${dict[param]}&`;
        }

        url += `trend_line=${GraphData.trendLineY}`;

        return url;
    }

    copyLinkText(){
        let elem = this.exportUrlRef.current;
        if(elem){
            elem.select();
            document.execCommand("copy");

            this.setState({copyMessage: "(Copied to clipboard)"});
        }
    }

    renderExportOptBody(){
        if(this.state.exportOption === "csv"){
            return (
                <div>
                    <div>
                        Exports a comma separated value (.csv) file containing the results displayed in the table.
                        This file is easily accesible in Excel. 
                    </div>
                    <br/>
                    <div>
                        <Input
                            innerRef={element => this.csvFilenameElement = element}
                            placeholder="Optional filename (.csv automatically appended)"
                            type="text"
                            maxLength={25}
                        />        
                    </div>
                    <br/>
                    <div>
                        <Button color="fade" onClick={this.downloadCSV.bind(this)} disabled={this.state.pending}>Download CSV</Button>
                        <span className="csv-text-container">
                            {this.state.csvMessage}
                        </span>
                    </div>
                </div>
            );
        }
        else if(this.state.exportOption === "sim-link"){
            return (
                <div>
                    <div>
                        Exports a URL for this application with preset values that can be shared.
                    </div>
                    <br/>
                    <div>
                        <textarea ref={this.exportUrlRef} className="modal-url-text" defaultValue={this.getExportURL()} readOnly>
                        </textarea>
                    </div>
                    <br/>
                    <div>
                        <Button color="fade" onClick={this.copyLinkText.bind(this)}>Copy Link</Button>
                        <span className="copy-text-container">
                            {this.state.copyMessage}
                        </span>
                    </div>
                </div>
            );
        }
        return (
            <div>
                Please select an export option.
            </div>
        )
    }
    
    render(){
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    <Dropdown isOpen={this.state.exportDropdown} toggle={this.toggleExportDropdown.bind(this)}>
                        <DropdownToggle color="fade" caret>
                            Export Options
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => this.setState({exportOption: "csv"})}>
                                Table CSV
                            </DropdownItem>
                            <DropdownItem onClick={() => this.setState({exportOption: "sim-link"})}>
                                Simulation Link
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {this.renderExportOptBody()}
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}