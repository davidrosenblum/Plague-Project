import tornado.web
import json
from . import CORSHandler
from tornado_smtpclient import client
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class MailHandler(CORSHandler):
    def post(self):
        # mail code here
        # self.finish("Mail server responding!")
        message = json.loads(self.request.body).get("message", None)
        message_subject = message.get("type",None)
        message_text = message.get("text",None)
        #self.finish("type: "+message_subject+" text: "+message_text)
        # create SMTP client
        s = client.SMTPAsync()
        yield s.connect('imap.gmail.com',993)
        yield s.starttls()
        yield s.login('plaguesim@gmail.com', 'PsSupport123#')
        # Create message container - the correct MIME type is multipart/alternative.
        email = "plaguesim@gmail.com"
        msg = MIMEMultipart('alternative')
        msg['Subject'] = message_subject
        msg['From'] = email
        msg['To'] = email

        # # Create the body of the message (a plain-text and an HTML version).
        text = message_text
        # html = """\
        # <html>
        # <head></head>
        # <body>
        # <p>Hi!<br>
        # How are you?<br>
        # Here is the <a href="http://www.python.org">link</a> you wanted.
        # </p>
        # </body>
        # </html>
        # """

        # # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text, 'plain')
        # part2 = MIMEText(html, 'html')

        # # Attach parts into message container.
        # # According to RFC 2046, the last part of a multipart message, in this case
        # # the HTML message, is best and preferred.
        msg.attach(part1)
        # msg.attach(part2)

        # # sendmail function takes 3 arguments: sender's address, recipient's address
        # # and message to send - here it is sent as one string.
        yield s.sendmail(email, email, msg.as_string())
        yield s.quit()