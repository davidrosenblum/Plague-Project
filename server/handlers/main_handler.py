import tornado.web


class MainHandler(tornado.web.StaticFileHandler):
    def get(self):
        # send index file
        with open("./web/build/index.html") as file:
            self.finish(file.read())
