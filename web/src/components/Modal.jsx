import React from "react";
import ReactModal from "react-modal"
import { Ajax } from "../Ajax";

export class Modal extends React.Component{

	constructor(props){
        super(props);

        // input refs
        //this.typeRef = React.createRef();
        this.textRef = React.createRef();

        this.state = { 
        	type: null,
        	error: false,
        	other: false
        };

        //Modal.setAppElement(el);

    }

	// on click of submit button 
	onClick(e){
		if(this.state.type != null && this.textRef.current.value != null){
			let message = this.BuildArray()
			Ajax.post("${window.location.origin}/mail",null,{message})
				.then(xhr => {    
                    // ajax resolved (could be bad/good request, but server responded)
                    if(xhr.status === 200){
                        // good request - attempt to parse results json
                        try{
                            console.log("Text Received")
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
			if(this.state.type == null){
				this.errorRef += "No Header Selected|"
			}
			if(this.textRef.current.value == null){
				this.errorRef += "No Teaxt Entered"
			}
			e.preventDefault();
		}
	}

	BuildArray(){
        let type = this.state.type,
        	text = this.textRef.current.value;

        // MUST match API expectations! 
        return {type,text};
    }

	// on change of radio button set type
	onTypeSelect(t){
	 	this.setState({type: t});
	 	//this.state.type = t;
	 	console.log(this.state.type);

	 	// if(this.state.type == "other"){
	 	// 	this.state.other = true;
	 	// 	this.TypeOther();
	 	// }
	 	//console.log(this.state.other);
	 }

	 TypeOther(){
	 	if(!this.state.other){
	 		
	 	}else{
	 		let input = <input type="text" placeholder="Input for other"/>;
	 		return input;
	 	}
	 	return null;
	 }

	render(){
		return (
			<div>
				<ReactModal isOpen={this.props.showModal} >
					<div className="col-lg-1">
			  			<span className="nav-link" onClick={this.props.closeModal}>&times;</span>
			  		</div>
			  		<div className="container border">
	      				<div className="col-lg-12 header center">
	  						<h2 className="modalHeader">Contact Us</h2>
	  						<span className="error"></span>
	  					</div>
						<div className="col-lg-12 center">
							<input type="radio" onChange={() => this.onTypeSelect("Bug Report")} name="types" value="problem"/>Have a problem?
							&nbsp;
							<input type="radio" onChange={() => this.onTypeSelect("Feature Request")} name="types" value="idea"/>Have an idea?
							&nbsp;
							<input type="radio" onChange={() => this.onTypeSelect("other")} name="types" value="other"/>Other
	      				</div>
	      				<div className="col-lg-12 center">
	  						{this.TypeOther()}
	      				</div>
	      				<div className="col-lg-12 center">
		      				<textarea rows="4" cols="100" placeholder="Type message in here." ref={this.textRef}></textarea>
	  					</div>
	  					<div className="col-lg-12 center">
		  					<button onClick={this.onClick.bind(this)}>Submit</button>
						</div>
					</div>
      			</ReactModal>
			</div>
		);
	}
}
