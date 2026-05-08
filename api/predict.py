import json
import pickle
import os
import numpy as np
from http.server import BaseHTTPRequestHandler


MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

LABEL_MAP = {1: "Low", 2: "Medium", 3: "High"}


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body)

            temperature = float(data["temperature"])
            visibility = float(data["visibility"])
            humidity = float(data["humidity"])

            features = np.array([[temperature, visibility, humidity]])
            prediction = model.predict(features)[0]
            severity = LABEL_MAP.get(int(prediction), "Unknown")

            self._respond(200, {"severity": severity})

        except (KeyError, ValueError, TypeError) as e:
            self._respond(400, {"error": f"Invalid input: {str(e)}"})
        except Exception as e:
            self._respond(500, {"error": f"Server error: {str(e)}"})

    def _respond(self, status: int, payload: dict):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, format, *args):
        pass  # silence default request logging
