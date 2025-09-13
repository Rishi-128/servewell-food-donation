# ServeWell - Donation Platform

ServeWell is a modern web application that connects generous donors with impactful NGOs, making it easy for people to contribute to causes they care about while providing NGOs with effective donation management tools.

## Features

### For Donors
- **Easy Donation Process**: Simple, secure donation forms with multiple payment options
- **Cause Discovery**: Browse and discover various NGOs and causes
- **Donation Tracking**: Track your donation history and impact
- **User-Friendly Interface**: Modern, responsive design with smooth animations

### For NGOs
- **Comprehensive Dashboard**: View donation analytics, donor information, and trends
- **Donation Management**: Track all incoming donations with detailed reporting
- **Real-time Analytics**: Visual charts and statistics of donation patterns
- **Donor Communication**: Manage donor relationships and communications

### Technical Features
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsiveness
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **Secure Backend**: Flask-based backend with SQLite database
- **Modern UI/UX**: Clean, intuitive interface design

## Project Structure

```
servewell/
│
├── app.py                   # Flask backend application
├── templates/               # HTML templates
│   ├── index.html           # Homepage
│   ├── donate.html          # Donation form page
│   ├── ngo_dashboard.html   # NGO dashboard
│   ├── login.html           # Login page
│   └── signup.html          # Signup page
├── static/                  # Static assets
│   ├── css/
│   │   └── style.css        # Custom CSS with Tailwind
│   ├── js/
│   │   └── script.js        # JavaScript with GSAP animations
│   └── images/              # Images (logos, backgrounds, etc.)
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servewell
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Access the application**
   Open your web browser and navigate to `http://localhost:5000`

## Usage

### For Donors
1. **Homepage**: Visit the homepage to learn about ServeWell and featured causes
2. **Make a Donation**: Click "Donate Now" to access the donation form
3. **Choose Amount**: Select a preset amount or enter a custom donation amount
4. **Select NGO**: Choose which NGO to support (optional)
5. **Complete Donation**: Fill in your details and submit the donation

### For NGOs
1. **Sign Up**: Create an NGO account through the signup page
2. **Login**: Access your account through the login page
3. **Dashboard**: View comprehensive analytics and donation data
4. **Manage Donations**: Track all incoming donations and donor information

## Technology Stack

### Frontend
- **HTML5 & CSS3**: Semantic markup and modern styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **JavaScript (ES6+)**: Modern JavaScript for interactivity
- **GSAP**: Professional animation library for smooth transitions

### Backend
- **Flask**: Lightweight Python web framework
- **SQLite**: File-based database for data storage
- **Jinja2**: Template engine for dynamic HTML generation

### Libraries & Dependencies
- **Flask-SQLAlchemy**: ORM for database operations
- **Werkzeug**: WSGI utility library
- **Email-Validator**: Email validation utility
- **Python-dotenv**: Environment variable management

## Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `email`: User email address
- `password`: Hashed password
- `user_type`: 'donor' or 'ngo'
- `created_at`: Account creation timestamp

### Donations Table
- `id`: Primary key
- `donor_name`: Name of the donor
- `email`: Donor's email address
- `amount`: Donation amount
- `message`: Optional message from donor
- `ngo_id`: Foreign key to users table (for NGO)
- `created_at`: Donation timestamp

## Security Features

- **Password Hashing**: Secure password storage using hashing
- **Session Management**: Flask session handling for user authentication
- **Input Validation**: Server-side validation for all form inputs
- **SQL Injection Protection**: Parameterized queries for database operations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Future Enhancements

- **Payment Integration**: Integrate with payment gateways (Stripe, PayPal)
- **Email Notifications**: Send confirmation emails for donations
- **Advanced Analytics**: More detailed reporting and insights
- **Mobile App**: React Native mobile application
- **Social Features**: Donation sharing and social proof
- **Multi-language Support**: Internationalization support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions, suggestions, or support, please contact:
- Email: support@servewell.com
- Website: www.servewell.com

## Acknowledgments

- **Tailwind CSS** for the excellent utility-first CSS framework
- **GSAP** for powerful animation capabilities
- **Flask** community for the robust web framework
- **Chart.js** for beautiful data visualization

---

**ServeWell** - *Connecting Hearts, Transforming Lives*
