import json
import smtplib
import tornado.ioloop
from . import CORSHandler


class MailHandler(CORSHandler):
    email = "plaguesim@gmail.com"

    def post(self):
        # read request json
        message_data = json.loads(self.request.body)

        # extract data
        subject = message_data.get("type")
        body = message_data.get("text")

        # send the email
        try:
            # non-blocking with tornado
            tornado.ioloop.IOLoop.current().spawn_callback(lambda: self.gmail_smtp(subject, body))
        except Exception as err:
            print(str(err))

        self.finish("Message received.")

    # sends a gmail message (warning: synchronous call)
    def gmail_smtp(self, subject, message):
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(MailHandler.email, "PsSupport123#")

        msg_str = "Subject: {s}\n\n{m}".format(s=subject, m=message)

        server.sendmail(MailHandler.email, MailHandler.email, msg_str)
        server.quit()

