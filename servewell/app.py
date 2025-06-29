from flask import Flask, render_template, request, redirect, url_for, session, flash
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'servewell-super-secret-key-2025-change-in-production'

# File storage paths
DATA_DIR = os.path.join('..', 'data')
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
DONATIONS_FILE = os.path.join(DATA_DIR, 'donations.json')

# Create data directory if it doesn't exist
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Initialize files if they don't exist
def init_files():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(DONATIONS_FILE):
        with open(DONATIONS_FILE, 'w') as f:
            json.dump([], f)

# Helper functions for file operations
def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def load_donations():
    try:
        with open(DONATIONS_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_donations(donations):
    with open(DONATIONS_FILE, 'w') as f:
        json.dump(donations, f, indent=2)

def get_next_id(items):
    return max([item.get('id', 0) for item in items], default=0) + 1

# Initialize files
init_files()

@app.route('/')
def home():
    return render_template('index.html')

# Debug route to check session
@app.route('/debug')
def debug():
    return {
        'session': dict(session),
        'user_id': session.get('user_id'),
        'role': session.get('role'),
        'username': session.get('username')
    }

# Test route to verify Flask is working
@app.route('/test')
def test():
    return "Flask is working! This is a test route."

@app.route('/donate', methods=['GET', 'POST'])
def donate():
    # Debug info - Let's make this more permissive for testing
    print(f"Session data: {dict(session)}")  # Debug print
    
    if 'user_id' not in session:
        flash('You need to login first to access the donation page.', 'error')
        return redirect(url_for('login'))
    
    # Restore the role check now that we know the backend works
    if session.get('role') != 'donor':
        flash('Only donors can access the donation page. Please login with a donor account.', 'error')
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        donations = load_donations()
        
        donation = {
            'id': get_next_id(donations),
            'donor_id': session['user_id'],
            'donor_name': session['username'],
            'food_type': request.form['food_type'],
            'quantity': request.form['quantity'],
            'location': request.form['location'],
            'latitude': request.form.get('latitude'),
            'longitude': request.form.get('longitude'),
            'pickup_time': request.form['pickup_time'],
            'status': 'Pending',
            'created_at': datetime.now().isoformat()
        }
        
        donations.append(donation)
        save_donations(donations)
        flash('Food donation submitted successfully!', 'success')
        return redirect(url_for('home'))
    
    # Use the new donate template
    return render_template('donate_new.html')

@app.route('/ngo_dashboard')
def ngo_dashboard():
    if 'user_id' not in session or session.get('role') != 'ngo':
        flash('Please login as an NGO to access dashboard.', 'error')
        return redirect(url_for('login'))
    
    donations = load_donations()
    pending_donations = [d for d in donations if d['status'] == 'Pending']
    
    # Calculate statistics
    total_donations = len(donations)
    total_pending = len(pending_donations)
    total_completed = len([d for d in donations if d['status'] == 'Completed'])
    
    return render_template('ngo_dashboard.html', 
                         donations=pending_donations,
                         total_donations=total_donations,
                         total_pending=total_pending,
                         total_completed=total_completed)

@app.route('/accept_donation/<int:donation_id>')
def accept_donation(donation_id):
    if 'user_id' not in session or session.get('role') != 'ngo':
        return redirect(url_for('login'))
    
    donations = load_donations()
    for donation in donations:
        if donation['id'] == donation_id:
            donation['status'] = 'Accepted'
            donation['accepted_by'] = session['username']
            donation['accepted_at'] = datetime.now().isoformat()
            break
    
    save_donations(donations)
    flash('Donation accepted successfully!', 'success')
    return redirect(url_for('ngo_dashboard'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        users = load_users()
        user = next((u for u in users if u['username'] == username and u['password'] == password), None)
        
        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            session['role'] = user['role']
            flash(f'Welcome back, {username}!', 'success')
            
            if user['role'] == 'ngo':
                return redirect(url_for('ngo_dashboard'))
            else:
                return redirect(url_for('home'))
        else:
            flash('Invalid username or password.', 'error')
            return render_template('login.html')
    
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        
        users = load_users()
        
        # Check if username already exists
        if any(u['username'] == username for u in users):
            flash('Username already exists. Please choose a different one.', 'error')
            return render_template('signup.html')
        
        # Create new user
        user = {
            'id': get_next_id(users),
            'username': username,
            'password': password,  # In production, hash this!
            'role': role,
            'created_at': datetime.now().isoformat()
        }
        
        users.append(user)
        save_users(users)
        flash('Account created successfully! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    session.pop('role', None)
    flash('You have been logged out successfully.', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)