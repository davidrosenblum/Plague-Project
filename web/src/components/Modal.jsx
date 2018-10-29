import React from "react";
import ReactModal from "react-modal"
import { Ajax } from "../Ajax";

export class Modal extends React.Component{

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
			errMessage:null
        };

        //Modal.setAppElement(el);

    }

	// on click of submit button 
	submitClick(e){
		e.preventDefault();
		if(this.type != null && this.textRef.current.value != ""){
			console.log(this.textRef.current.value);
			let message = this.BuildArray();
			Ajax.post(`${window.location.origin}/mail`,null,{message})
				.then(xhr => {    
                    // ajax resolved (could be bad/good request, but server responded)
                    if(xhr.status === 200){
                        // good request - attempt to parse results json
                        try{
                            console.log("Text Received");
                        }
                        catch(err){
                            // json parse error (should never happen)
							console.log(JSON.parse(err)); // server responded with bad request signal
                        }
                    }
                    else{
                        // bad request
                        console.log("Bad Request Error");  // server responded with bad request signal
                    }
                })
                .catch(err => {
                    // ajax request died (really bad NOT a 400 error!)
                    console.log("Really bad Error");// request died signal
                });
		}else{
			
			let textError = this.textRef.current.value;

			if(this.typeError == true && textError == ""){
				this.errorMsg = "No Header Selected|No Text Entered";
			}else if(this.typeError == true){
				this.errorMsg = "No Header Selected";
			}else if(textError == ""){
				this.errorMsg = "No Text Entered";
			}

			if(this.errorMsg != ""){
				this.setState({errMessage:this.errorMsg})
			}

			// console.log("Error Time: "+this.errorTime);
				
		}
	}

	BuildArray(){
        let text = this.textRef.current.value;
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
	 	this.type = type;

	 	if(this.type == "other"){
	 		this.setState({other: true});
	 	}else{
	 		this.setState({other: false});
	 	}

	 	this.typeError = false;
	 }

 	 TypeOther(){
	 	if(!this.state.other){
	 		return null;
	 	}else{
	 		return(
	 			<div>
	 				<label>Other: </label> <input type="text" placeholder="Input for other" ref={this.headerRef}/>
	 			</div>
	 		);
	 	}
	 }
	 
	render(){
		return (
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
								</div>
							</div>
							<div className="col-lg-12 center">
								<input type="radio" onChange={(t) => this.onTypeSelect("Bug Report")} name="types" value="problem"/>Have a problem?
								&nbsp;
								<input type="radio" onChange={(t) => this.onTypeSelect("Feature Request")} name="types" value="idea"/>Have an idea?
								&nbsp;
								<input type="radio" onChange={(t) => this.onTypeSelect("other")} name="types" value="other"/>Other
							</div>
							<div className="col-lg-12 center">
								{this.TypeOther()}
							</div>
							<div className="col-lg-12 center">
								<textarea rows="4" cols="100" placeholder="Type message in here." ref={this.textRef}></textarea>
							</div>
							<div className="col-lg-12 center">
								<input type="submit" />
							</div>
						</form>
					</div>
      			</ReactModal>
			</form>
		);
	}
}