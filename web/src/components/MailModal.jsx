import React from "react";
import ReactModal from "react-modal"
import { Ajax } from "../Ajax";

export class MailModal extends React.Component{

	constructor(props){
        super(props);

        // input refs
        this.textRef = React.createRef();
        this.errorRef = React.createRef();
        this.headerRef = React.createRef();

        this.type = null;
        this.typeError = true;
        this.errorTime = false;
        this.errorMsg = "";

        this.state = { 
			other: false,
			errMessage:null,
			successMessage:null
        };

        //Modal.setAppElement(this.props.app);
	}

	componentDidUpdate(prevProps){
		// clear messages when the visibility changes
		if(prevProps.showModal && !this.props.showModal){
			this.setState({errMessage: null, successMessage: null});
		}
	}

	// on click of submit button 
	submitClick(e){
		this.setState({errMessage:null});
		e.preventDefault();
		let goodHeader = this.headerRef.current ? (this.headerRef.current.value.length > 0) : true;
		if(this.type != null && this.textRef.current.value != "" && goodHeader){
			let message = this.BuildArray();

			// localhost = dev, else = prod
			let origin = window.location.origin.includes("localhost") ? "http://localhost:8080" : window.location.origin;

			Ajax.post(`${origin}/mail`,null,{message})
				.then(xhr => {    
                    // ajax resolved (could be bad/good request, but server responded)
                    if(xhr.status === 200){
                        // good request - attempt to parse results json
                        try{
							this.setState({successMessage:"Submit Successful"});
                        }
                        catch(err){
							// json parse error (should never happen)
							this.setState({errMessage:JSON.parse(err)});
							// server responded with bad request signal
                        }
                    }
                    else{
						// bad request
						this.setState({errMessage:"Bad Request Error"});
                    }
                })
                .catch(err => {
                    // ajax request died (really bad NOT a 400 error!)
					this.setState({errMessage:"Cannot reach server"});// request died signal
                });
		}
	}
	
	//Build the JSON array that is sent over the Ajax request
	BuildArray(){
		//get the text in the the message textarea
		let text = this.textRef.current.value;
		//
        let type = "";

        if(this.state.other){
        	type = this.headerRef.current.value;
        }else{
        	type = this.type;
        }

        // MUST match API expectations! 
        return {type,text};
    }

	// on change of radio button set type
	onTypeSelect(type){
		//get the type of the radio button selected
	 	this.type = type;

		// check to see if other is selected
		this.setState({other: this.type === "other"});

	 	this.typeError = false;
	 }

	 //Check if other is selcted and load elements based on that
 	 TypeOther(){
	 	if(!this.state.other){
			 // remove element of screen
	 		return null;
	 	}else{
			 //load element onto screen
	 		return(
	 			<div>
	 				<label>Other: </label> <input type="text" placeholder="Input for other" ref={this.headerRef} required/>
	 			</div>
	 		);
	 	}
	 }
	 
	render(){
		return this.props.showModal ? (
			<form>
				<ReactModal isOpen={this.props.showModal} >
					<div className="col-lg-1">
			  			<span className="nav-link" onClick={this.props.closeModal}>&times;</span>
			  		</div>
			  		<div className="container border">
					  <form onSubmit={this.submitClick.bind(this)}>
							<div className="col-lg-12 header center">
								<h2 className="modalHeader">Contact Us</h2>
								<div>
									<span className="error">
										{this.state.errMessage}
									</span>
									<span className="success">
										{this.state.successMessage}
									</span>
								</div>
							</div>
							<div className="col-lg-12 center">
								<input type="radio" onChange={() => this.onTypeSelect("Bug Report")} name="types" value="problem" required/>Have a problem?
								&nbsp;
								<input type="radio" onChange={() => this.onTypeSelect("Feature Request")} name="types" value="idea" required/>Have an idea?
								&nbsp;
								<input type="radio" onChange={() => this.onTypeSelect("other")} name="types" value="other" required/>Other
							</div>
							<div className="col-lg-12 center">
								{this.TypeOther()}
							</div>
							<div className="col-lg-12 center">
								<textarea rows="4" cols="100" placeholder="Type message in here." ref={this.textRef} required></textarea>
							</div>
							<div className="col-lg-12 center">
								<input type="submit" />
							</div>
						</form>
					</div>
      			</ReactModal>
			</form>
		) : null;
	}
}