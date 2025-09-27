#!/bin/bash

# Crypto Trade Backend Startup Script

echo "🚀 Starting Crypto Trade Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from env.example..."
    cp env.example .env
    echo "📝 Please edit .env file with your configuration before running again."
    exit 1
fi

# Start the server
echo "🌐 Starting FastAPI server..."
echo "📖 API Documentation: http://localhost:8000/docs"
echo "🔍 Health Check: http://localhost:8000/api/v1/health"
echo ""

python run.py
