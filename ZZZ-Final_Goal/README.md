### Front-End Structure 

```structures

civic-issue-portal-frontend/                 # Citizen + Staff + Admin web portal
│
├── src/                                     # Main React app source
│   ├── assets/                              # Static assets (logos, images, icons)
│   ├── components/                          # Shared UI components
│   │   ├── Navbar.jsx                       # Top navigation bar
│   │   ├── Footer.jsx                       # Footer with links/info
│   │   ├── ProtectedRoute.jsx               # Route wrapper for auth + role check
│   │   └── IssueCard.jsx                    # Card view for displaying an issue
│   │
│   ├── context/                             # React context providers
│   │   └── AuthContext.jsx                  # Stores auth state (user, token, role)
│   │
│   ├── hooks/                               # Custom hooks
│   │   └── useAuth.js                       # Hook to use auth context easily
│   │
│   ├── pages/                               # Page-level routes
│   │   ├── auth/                            # 🔐 All authentication pages
│   │   │   ├── Login.jsx                    # Login page
│   │   │   ├── Signup.jsx                   # Signup page
│   │   │   ├── VerifyEmail.jsx              # Page for OTP email verification
│   │   │   ├── AadhaarVerification.jsx      # Page for Aadhaar validation
│   │   │   ├── ForgotPassword.jsx           # Page to request password reset
│   │   │   └── ResetPassword.jsx            # Page to set new password
│   │   ├── citizen/                         # Citizen-facing pages
│   │   │   ├── ReportIssue.jsx              # Form to report civic issue
│   │   │   ├── MyReports.jsx                # Citizen's reported issues
│   │   │   ├── Feedback.jsx                 # Citizen feedback form
│   │   │   └── MapView.jsx                  # Interactive city map of issues
│   │   ├── staff/                           # Staff-facing pages
│   │   │   └── AssignedIssues.jsx           # Issues assigned to staff
│   │   └── admin/                           # Admin-only pages
│   │       ├── Dashboard.jsx                # Admin dashboard overview
│   │       ├── Analytics.jsx                # Analytics + reporting
│   │       └── ManageUsers.jsx              # Admin user/staff management
│   │
│   ├── services/                            # API communication layer
│   │   ├── api.js                           # Axios instance (base URL, interceptors)
│   │   ├── authService.js                   # Auth API calls (login, signup, verify)
│   │   ├── issueService.js                  # Issue API calls (CRUD)
│   │   ├── feedbackService.js               # Feedback API calls
│   │   └── notificationService.js           # For notifications (optional)
│   │
│   ├── utils/                               # Utility/helper functions
│   │   ├── roles.js                         # Role definitions (citizen, staff, admin)
│   │   └── helpers.js                       # Misc helper functions
│   │
│   ├── App.jsx                              # Main app component (renders routes)
│   ├── main.jsx                             # React entry point
│   └── router.jsx                           # Centralized route definitions
│
├── index.html                               # HTML entry template
├── vite.config.js                           # Vite config file
└── package.json                             # Dependencies + scripts

```

### Back-End Structures

```Structure
civic-issue-portal-backend/                  # Backend server + ML microservice
│
├── src/                                     # Backend source
│   ├── config/                              # Configuration files
│   │   ├── db.js                            # Database connection
│   │   ├── mailer.js                        # Email/SMTP setup for OTPs
│   │   ├── aadhaarAPI.js                    # Aadhaar API integration wrapper
│   │   └── cloudStorage.js                  # Cloud storage (AWS/GCP/Azure) for images
│   │
│   ├── controllers/                         # Handle requests/responses
│   │   ├── authController.js                # Auth flows (signup, login, verify, reset)
│   │   ├── issueController.js               # Handle issue CRUD
│   │   ├── feedbackController.js            # Handle citizen feedback
│   │   └── routingController.js             # Automated routing to departments
│   │
│   ├── models/                              # Database schemas
│   │   ├── User.js                          # User schema (includes Aadhaar + email verify)
│   │   ├── Issue.js                         # Issue schema (status, category, dept)
│   │   ├── Feedback.js                      # Feedback schema
│   │   └── OTP.js                           # OTP schema (for email/password reset)
│   │
│   ├── routes/                              # Express routes
│   │   ├── authRoutes.js                    # Endpoints for auth (login, signup, verify)
│   │   ├── issueRoutes.js                   # Endpoints for issue reporting/tracking
│   │   ├── feedbackRoutes.js                # Endpoints for feedback
│   │   └── routingRoutes.js                 # Endpoints for auto-routing logic
│   │
│   ├── services/                            # Business logic layer
│   │   ├── authService.js                   # Auth service (OTP, Aadhaar, JWT)
│   │   ├── issueService.js                  # Issue business logic
│   │   ├── feedbackService.js               # Feedback logic
│   │   ├── classificationService.js         # Calls ML model for category prediction
│   │   ├── routingService.js                # Maps category → dept emails
│   │   └── notificationService.js           # Email/Push notifications
│   │
│   ├── utils/                               # Utility scripts
│   │   ├── jwt.js                           # JWT sign/verify helpers
│   │   ├── roles.js                         # Role constants
│   │   ├── otpGenerator.js                  # Generates OTP codes
│   │   ├── errorHandler.js                  # Error handling middleware
│   │   └── logger.js                        # Logger for debugging
│   │
│   ├── uploads/                             # Temporary local uploads (before cloud push)
│   ├── app.js                               # Express app setup (middlewares, routes)
│   └── server.js                            # Server start file
│
├── ml-service/                              # Python ML microservice
│   ├── model/
│   │   ├── civic_model.pkl                  # Trained image classification model
│   │   └── labels.json                      # Label mapping (e.g. pothole=0, garbage=1)
│   ├── app.py                               # FastAPI/Flask API for classification
│   ├── requirements.txt                     # Python dependencies
│   └── utils.py                             # Helper functions for preprocessing
│
├── docker-compose.yml                       # Docker orchestration for backend + ML
└── package.json                             # Backend dependencies
 ```





---




