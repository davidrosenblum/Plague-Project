import json
import smtplib
import os
import tornado.ioloop
from . import CORSHandler


class MailHandler(CORSHandler):
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
        # extract environment variables for gmail & gmail password
        email = os.environ.get("gmail", None)
        password = os.environ.get("gmail_password", None)

        # send email if environment variables are provided
        if email is not None and password is not None:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.ehlo()
            server.starttls()
            server.login(email, password)

            msg_str = "Subject: {s}\n\n{m}".format(s=subject, m=message)

            server.sendmail(email, email, msg_str)
            server.quit()

