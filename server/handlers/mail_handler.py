import tornado.web
from . import CORSHandler

class MailHandler(CORSHandler):
    def post(self):
        # mail code here
        self.finish("Mail server responding!")
