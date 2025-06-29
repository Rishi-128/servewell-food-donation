import subprocess
import sys
import os

# Change to the ServeWell directory
os.chdir(r'c:\Users\ronak\OneDrive\Desktop\ServeWell\servewell')

# Start Flask app
print("Starting Flask application...")
try:
    subprocess.run([sys.executable, 'app.py'], check=True)
except KeyboardInterrupt:
    print("Flask app stopped.")
except Exception as e:
    print(f"Error starting Flask app: {e}")
