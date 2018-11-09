import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar as RNavbar, NavItem, Collapse, NavbarToggler, Nav } from "reactstrap";
import { MailModal } from "./MailModal"
import Simulator from "../Simulator";

export class Navbar extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
			showNav: false,			// navbar collapse
			showModal: false,		// mail modal visibility
			showAdvanced: false		// advanced dropdown menu visibility
	    };

	}

	// close the mail modal
	closeModal(){
		this.setState({showModal: false});
	}

	// show the mail modal
	openModal(){
		this.setState({showModal: true});
	}

	// toggles the navbar collapse state
	toggleNavbar(){
		this.setState(prev => ({showNav: !prev.showNav}));
	}

	// toggle advanced dropdown
	toggleDropdown(){
		this.setState(prev => ({showAdvanced: !prev.showAdvanced}));
	}

	// advanced dropdown error correction option toggle
	toggleErrorCorrection(){
		Simulator.isErrCorrecting = !Simulator.isErrCorrecting;
	}

	render(){
		return (
			<div>
				<RNavbar color="light" expand="md">
					<NavbarToggler onClick={this.toggleNavbar.bind(this)}/>
					<Collapse isOpen={this.state.showNav} navbar>
						<Nav navbar>
							<NavItem>
								<span className="nav-link" onClick={this.openModal.bind(this)}>Contact Us <span className="sr-only">(current)</span></span>
							</NavItem>
							<NavItem>
								<Dropdown isOpen={this.state.showAdvanced} toggle={this.toggleDropdown.bind(this)}>
										<DropdownToggle caret color="light">
											Advanced
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={this.toggleErrorCorrection.bind(this)}>
												Toggle Error Correction (Currently {Simulator.isErrCorrecting ? "Enabled" : "Disabled"})
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
							</NavItem>
						</Nav>
					</Collapse>
				</RNavbar>
				<MailModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} />
	      	</div>
		);
	}
}