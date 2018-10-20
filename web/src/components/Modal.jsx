import React from "react";
import ReactModal from "react-modal"
import { Ajax } from "../Ajax";

export class Modal extends React.Component{

	constructor(props){
        super(props);

        // input refs
        //this.typeRef = React.createRef();
        this.textRef = React.createRef();
        this.errorRef = React.createRef();

        this.state = { 
        	typt: null
        };

        //Modal.setAppElement(el);

    }

	// on click of submit button 
	onClick(){
		if(this.state.type != null && this.textRef.current.value != null){
			let message = this.getInputsDictionary()
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
		}
	}

	getInputsDictionary(){
        let type = this.state.type,
        	text = this.textRef.current.value;

        // MUST match API expectations! 
        return {type,text};
    }

	// on change of radio button set type
	getType(type){
	 	this.state.type = type;
	 }

	render(){
		return (
			<div>
				<ReactModal isOpen={this.props.showModal} >
					<table>
						<tbody>
							<tr>
								<td className="closeTag">
			  						<span className="nav-link" onClick={this.props.closeModal}>&times;</span>
			  					</td>
			      			</tr>
		      			</tbody>
		      		</table>
	  				<table className="reportsTable">
	  					<tbody>
		      				<tr>
		      					<td className="header">
		      						<h2 className="modalHeader">Contact Us</h2>
		      						<span className="error"></span>
		      					</td>
		      				</tr>
							<tr>
		  						<td>
		  							<input type="radio" onChange={() => this.getType("problem")} name="type" value="problem"/>Have a problem?
		  							&nbsp;
		  							<input type="radio" onChange={() => this.getType("idea")} name="type" value="idea"/>Have an idea?
		  							&nbsp;
		  							<input type="radio" onChange={() => this.getType("other")} name="type" value="other"/>Other
		      					</td>
		      				</tr>
		      				<tr>
		      					<td>
			      					<textarea rows="4" cols="100" placeholder="Type message in here." ref={this.textRef}></textarea>
		      					</td>
		      				</tr>
		      				<tr>
		      					<td>
		      						<button onClick={this.onClick.bind(this)}>Submit</button>
		      					</td>
		  					</tr>
	  					</tbody>
	  				</table>
      			</ReactModal>
			</div>
		);
	}
}
