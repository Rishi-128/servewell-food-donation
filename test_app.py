#!/usr/bin/env python3
"""
Quick test script to verify ServeWell Flask app functionality
"""
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'servewell'))

try:
    from app import app
    print("✅ Flask app imported successfully")
    print("✅ Secret key configured:", bool(app.secret_key))
    print("✅ Data directory exists:", os.path.exists(os.path.join('data')))
    print("✅ Templates directory exists:", os.path.exists(os.path.join('servewell', 'templates')))
    print("✅ Static directory exists:", os.path.exists(os.path.join('servewell', 'static')))
    print("✅ Logo file exists:", os.path.exists(os.path.join('servewell', 'static', 'images', 'logo.jpeg')))
    print("\n🚀 ServeWell is ready to run!")
    print("💡 To start the server, run: python servewell/app.py")
except Exception as e:
    print(f"❌ Error: {e}")
    print("❌ Make sure you're running this from the ServeWell root directory")
