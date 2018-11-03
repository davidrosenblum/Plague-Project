import tornado.web


# suplerclass for Cross Origin Resource Sharing (CORS) request handling
# allows foreign origins to make requests
# so something like 'david.com' could send a request to us 
class CORSHandler(tornado.web.RequestHandler):
    # abstract requires implementation
    def data_received(self, chunk):
        pass

    # sets the default headers
    def set_default_headers(self):
        super(CORSHandler, self).set_default_headers()

        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type")

    # http options - sends the defaults (allow origins)
    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()
