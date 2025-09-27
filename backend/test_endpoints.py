#!/usr/bin/env python3
"""
Simple test script to verify API endpoints are working.
"""
import requests
import json
import time

BASE_URL = "http://localhost:8000/api/v1"

def test_endpoint(method, endpoint, data=None, params=None):
    """Test an API endpoint."""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, params=params)
        elif method.upper() == "POST":
            response = requests.post(url, json=data)
        else:
            print(f"Unsupported method: {method}")
            return False
        
        print(f"{method} {endpoint}")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            try:
                result = response.json()
                print(f"Response: {json.dumps(result, indent=2)[:200]}...")
            except:
                print(f"Response: {response.text[:200]}...")
        else:
            print(f"Error: {response.text}")
        
        print("-" * 50)
        return response.status_code == 200
        
    except requests.exceptions.ConnectionError:
        print(f"Connection error: Make sure the server is running on {BASE_URL}")
        return False
    except Exception as e:
        print(f"Error testing {endpoint}: {e}")
        return False

def main():
    """Run all endpoint tests."""
    print("Testing Crypto Trade Backend API Endpoints")
    print("=" * 50)
    
    # Wait a moment for server to start
    time.sleep(2)
    
    tests = [
        ("GET", "/health"),
        ("GET", "/klines", None, {"symbol": "BTCUSDT", "interval": "1m", "limit": 10}),
        ("GET", "/signal/latest", None, {"symbol": "BTCUSDT"}),
        ("GET", "/portfolio"),
        ("GET", "/trades", None, {"user_id": "test_user", "limit": 5}),
        ("GET", "/orderbook/BTCUSDT", None, {"limit": 10}),
    ]
    
    passed = 0
    total = len(tests)
    
    for method, endpoint, data, params in tests:
        if test_endpoint(method, endpoint, data, params):
            passed += 1
    
    print(f"\nTest Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("✅ All tests passed! Backend is working correctly.")
    else:
        print("❌ Some tests failed. Check the server logs for details.")

if __name__ == "__main__":
    main()
