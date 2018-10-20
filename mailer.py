from flask import Flask 
from flask_mail import Mail
from flask_mail import Message  

app = Flask(__name__)

app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = 'plaguesim@gmail.com'
app.config["MAIL_PASSWORD"] = "PsSupport123#"
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True

mail = Mail(app)

#@app.route("/")
@app.route("/mail", methods=["POST"])
def mail():
	msg = Message('Hello',recipients=["plaguesim@gmail.com"])
	msg.body = "Hello this is a test from the flask mail class"
	mail.send(msg)
	return "Sent"

if __name__ == '__main__'
	app.run(debug = True)