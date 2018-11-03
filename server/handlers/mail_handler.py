import tornado.web


class MailHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

    def post(self):
        # mail code here
        pass
