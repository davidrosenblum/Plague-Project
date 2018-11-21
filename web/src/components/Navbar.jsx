import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar as RNavbar, NavItem, Collapse, NavbarToggler, Nav, NavLink } from "reactstrap";
import { NavbarBrand } from 'reactstrap';
import { MailModal } from "./MailModal"
import Simulator from "../Simulator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Navbar extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
			showNav: false,			// navbar collapse
			showModal: false,		// mail modal visibility
			showAdvanced: false		// advanced dropdown menu visibility
	    };

	}

	componentDidMount(){
		// error correction changed
		Simulator.on("update", () => this.forceUpdate());
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
				<RNavbar color="light" light expand="md">
					<NavbarBrand>
						<span className="pp-heading">The Plague Project</span>
						&nbsp;
						<FontAwesomeIcon className="skull-icon" icon="skull"></FontAwesomeIcon>
						&nbsp;
						<a href='/'>Disease Simulator</a>
					</NavbarBrand>
					<NavbarToggler color="dark" onClick={this.toggleNavbar.bind(this)}/>
					<Collapse isOpen={this.state.showNav} navbar>					
						<Nav navbar  className="ml-auto">
							{/*<NavItem>
								<NavLink className="pointer" >FAQ</NavLink>
							</NavItem>*/}
							<NavItem>
								<NavLink  className="pointer" selected onClick={this.openModal.bind(this)}>Contact Us</NavLink>
							</NavItem>
							<NavItem>
								<Dropdown isOpen={this.state.showAdvanced} toggle={this.toggleDropdown.bind(this)}>
										<DropdownToggle caret color="light">
											Advanced
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem className="errCorrect" onClick={this.toggleErrorCorrection.bind(this)}>
											{Simulator.isErrCorrecting ? "Disable" : "Enable"}<br />Error Correction
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
							</NavItem>
							<NavItem>
								<NavLink href='https://github.com/davidrosenblum/Plague-Project'>
									<FontAwesomeIcon icon={['fab', 'github']} />
									&nbsp;
									<span className="Version">v0.2</span>
								</NavLink>								
							</NavItem>
						</Nav>
					</Collapse>
				</RNavbar>
				<MailModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} />
	      	</div>
		);
	}
}