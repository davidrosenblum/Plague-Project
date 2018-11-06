import os
import tornado.web
import tornado.ioloop
import tornado.httpserver
from server.handlers import *

# create tornado app with routes and static path
app = tornado.web.Application([
        (r"/", MainHandler),
        (r"/mail", MailHandler),
        (r"/plague", PlagueHandler),
        (r"/test", TestHandler)
    ], static_path="./web/build/static", debug=bool(os.environ.get("DEBUG", False)))

http_server = tornado.httpserver.HTTPServer(app)

# main method
if __name__ == "__main__":
    # get port and start server
    port = int(os.environ.get("PORT", 8080))
    http_server.listen(port)

    # begin tornado loop
    print("Http server listening on port {p}".format(p=port))
    tornado.ioloop.IOLoop.current().start()

